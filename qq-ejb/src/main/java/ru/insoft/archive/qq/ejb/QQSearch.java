package ru.insoft.archive.qq.ejb;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.webmodel.FilterBy;
import ru.insoft.archive.extcommons.webmodel.OrderBy;
import ru.insoft.archive.qq.model.Applicant;
import ru.insoft.archive.qq.model.ExecutionInfo;
import ru.insoft.archive.qq.model.QuestionModel;
import ru.insoft.archive.qq.model.SearchCritery;
import ru.insoft.archive.qq.model.Transmission;
import ru.insoft.archive.qq.webmodel.JournalItem;
import ru.insoft.archive.qq.webmodel.SearchResultItem;

@Stateless
public class QQSearch extends LoggedBean {

	@PersistenceContext
	private EntityManager em;

	@EJB
	private JsonTools jsonTools;

	private Expression<Boolean> getLikeExp(String queryValue, String field,
		Join<QuestionModel, Applicant> ro) {
		queryValue = queryValue.toUpperCase();
		queryValue += "%";
		logger.info("value for like expression: " + queryValue);
		CriteriaBuilder b = em.getCriteriaBuilder();
		Expression<Boolean> exp = b.like(b.upper(ro.<String>get(field)),
			queryValue);
		return exp;
	}

	public JsonObject getJournalData(Integer start, Integer limit,
		List<FilterBy> filters, List<OrderBy> orders) throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<QuestionModel> criteriaQuery = cb.createQuery(QuestionModel.class);
		Root<QuestionModel> root = criteriaQuery.from(QuestionModel.class);
		ArrayList<Expression> expressions = new ArrayList<>();
		if (filters != null) {
			for (FilterBy fb : filters) {
				switch (fb.getProperty()) {
					case "litera":
						logger.info("Фильтр литера: значение: "
							+ fb.getValue().toString());
						Expression<Boolean> literaEqual = cb.equal(
							root.get("litera").get("id"), fb.getValue());
						expressions.add(literaEqual);
						break;
					case "inboxDocNum":
						String filterValue = fb.getValue().toString();
						logger.info("Фильтр входящий номер: значение: "
							+ filterValue);
						Expression<Boolean> numLike = cb.like(
							cb.lower(root.<String>get("inboxNum")),
							filterValue);
						expressions.add(numLike);
						break;
					case "regDate":
						logger.info("Фильтр дата регистрации: значение: "
							+ fb.getValue().toString());
						Date d1 = jsonTools.parseBadStringDate((String) fb.getValue());
						Expression<Boolean> dateEqual = cb.equal(
							root.<Date>get("regDate"), d1);
						expressions.add(dateEqual);
						break;
					case "execDate":
						Join<QuestionModel, ExecutionInfo> eiJoin = root
							.join("execInfo");
						Date d2 = jsonTools.parseBadStringDate(fb.getValue().toString());
						logger.info("Фильтр дата исполнения: " + d2);
						Expression<Boolean> exDateExp = cb.equal(
							eiJoin.get("execDate"), d2);
						expressions.add(exDateExp);
						break;
					case "fioOrg":
						String applicant = (String) fb.getValue();
						Join<QuestionModel, Applicant> aplJoin = root.join("applicant");
						Expression<String> concat = cb.concat(
							aplJoin.<String>get("surname"), " ");
						concat = cb.concat(concat, aplJoin.<String>get("name"));
						concat = cb.concat(concat, " ");
						concat = cb.concat(concat,
							aplJoin.<String>get("fatherName"));
						concat = cb.lower(concat);
						Expression<Boolean> phyzLike = cb.like(concat,
							applicant.toLowerCase());
						Expression<String> jur = cb.lower(aplJoin
							.<String>get("applicantObject"));
						Expression<Boolean> jyrLike = cb.like(jur,
							applicant.toLowerCase());
						Expression<Boolean> finalOr = cb.or(phyzLike, jyrLike);
						expressions.add(finalOr);
						break;
					case "status":
						Long status = (Long) fb.getValue();
						Expression<Boolean> eq = cb.equal(root.<Long>get("status")
							.get("id"), status);
						expressions.add(eq);
						break;
					case "executor":
						Long executor = (Long) fb.getValue();
						Join<QuestionModel, Transmission> jTr = root
							.join("transmission");
						Expression<Boolean> equalExecutor = cb.equal(
							jTr.get("executorName").get("id"), executor);
						expressions.add(equalExecutor);
						break;
					default:
						break;
				}
			}
		}
		ArrayList<Order> jpaOrders = new ArrayList<>();
		if (orders != null) {
			for (OrderBy ou : orders) {
				String orderField = ou.getField();
				Order o = null;
				switch (orderField) {
					case "litera":
						Join<QuestionModel, DescriptorValue> jj = root.join("litera", JoinType.LEFT);
						if (ou.asc()) {
							o = cb.asc(jj.get("value"));
						} else {
							o = cb.desc(jj.get("value"));
						}
						jpaOrders.add(o);
						break;
					case "inboxDocNum":
						if (ou.asc()) {
							o = cb.asc(root.get("inboxNum"));
						} else {
							o = cb.desc(root.get("inboxNum"));
						}
						jpaOrders.add(o);
						break;
					case "regDate":
						if (ou.asc()) {
							o = cb.asc(root.get("regDate"));
						} else {
							o = cb.desc(root.get("regDate"));
						}
						jpaOrders.add(o);
						break;
					case "execDate":
						Join<QuestionModel, ExecutionInfo> eiJoin = root
							.join("execInfo", JoinType.LEFT);
						if (ou.asc()) {
							o = cb.asc(eiJoin.get("execDate"));
						} else {
							o = cb.desc(eiJoin.get("execDate"));
						}
						jpaOrders.add(o);
						break;
					case "fioOrg":
						//Сортируются сначала по Юридическим лицам, потом по физическим
						Join<QuestionModel, Applicant> aplJoin = root.join("applicant");
						Expression<String> concat = cb.concat(
							aplJoin.<String>get("surname"), " ");
						concat = cb.concat(concat, aplJoin.<String>get("name"));
						concat = cb.concat(concat, " ");
						concat = cb.concat(concat,
							aplJoin.<String>get("fatherName"));
						concat = cb.lower(concat);
						Expression<String> jur = cb.lower(aplJoin
							.<String>get("applicantObject"));
						Order jurOrder = null;
						Order phyzOrder = null;
						if (ou.asc()) {
							jurOrder = cb.asc(jur);
							phyzOrder = cb.asc(concat);
						} else {
							jurOrder = cb.desc(jur);
							phyzOrder = cb.desc(concat);
						}
						jpaOrders.add(jurOrder);
						jpaOrders.add(phyzOrder);
						break;
					case "status":
						if (ou.asc()) {
							o = cb.asc(root.<Long>get("status"));
						} else {
							o = cb.desc(root.<Long>get("status"));
						}
						jpaOrders.add(o);
						break;
					case "executor":
						Join<QuestionModel, Transmission> jTr = root.join("transmission", JoinType.LEFT);
						Join<Transmission, AdmUser> admUserJoin = jTr.join("executorName", JoinType.LEFT);
						if (ou.asc()) {
							o = cb.asc(admUserJoin.get("name"));
						} else {
							o = cb.desc(admUserJoin.get("name"));
						}
						jpaOrders.add(o);
						break;
					default:
						logger.warning("unknown sort field " + orderField);
				}
			}
		}
		if (expressions.size() > 0) {
			Expression and = expressions.get(0);
			if (expressions.size() > 1) {
				for (int i = 1; i < expressions.size(); i++) {
					and = cb.and(and, expressions.get(i));
				}
			}
			criteriaQuery.where(and);
		}
		if (jpaOrders.size() > 0) {
			criteriaQuery.orderBy(jpaOrders);
		}

		TypedQuery<QuestionModel> q = em.createQuery(criteriaQuery);

		Integer total = q.getResultList().size();
		q.setFirstResult(start);
		q.setMaxResults(start + limit);

		QuestionModel[] array = new QuestionModel[q.getResultList().size()];
		q.getResultList().toArray(array);

		ArrayList<JournalItem> items = new ArrayList<>();
		for (QuestionModel qq : array) {
			items.add(new JournalItem(qq));
		}
		JsonObjectBuilder resultBuilde = Json.createObjectBuilder();
		resultBuilde.add("items", jsonTools.getJsonEntitiesList(items));
		resultBuilde.add("total", total);
		JsonObject result = resultBuilde.build();
		return result;
	}

	public JsonObject getSearchResult(SearchCritery query) throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<QuestionModel> searchQuery = cb.createQuery(QuestionModel.class);

		Root<QuestionModel> root = searchQuery.from(QuestionModel.class);

		ArrayList<Expression<Boolean>> expressions = new ArrayList<>();

		if (query.isApplicantJoinNeeds()) {
			Join<QuestionModel, Applicant> join = root.join("applicant");

			Long applType = query.getApplicantTypeId();
			if (applType != null) {
				Expression<Boolean> applTypeExp = cb.equal(
					join.<Long>get("applicantType"), applType);
				expressions.add(applTypeExp);
			}

			Long applCat = query.getApplicantCategoryId();
			if (applCat != null) {
				Expression<Boolean> applCatExp = cb.equal(
					join.<Long>get("applicantCategory"), applCat);
				expressions.add(applCatExp);
			}

			String applName = query.getApplName();
			if (applName != null) {
				expressions.add(getLikeExp(applName, "name", join));
			}

			String applSurname = query.getApplSurname();
			if (applSurname != null) {
				expressions.add(getLikeExp(applSurname, "surname", join));
			}

			String applFather = query.getApplFatherName();
			if (applFather != null) {
				expressions.add(getLikeExp(applFather, "fatherName", join));
			}
		}

		Long execArchId = query.getArchiveId();
		if (execArchId != null) {
			Expression<Boolean> archExecutor = cb.equal(root.get("execOrg")
				.get("id"), execArchId);
			expressions.add(archExecutor);
		}

		Long queryTypeId = query.getQueryTypeId();
		if (queryTypeId != null) {
			Expression<Boolean> queryType = cb.equal(root.get("questionType"),
				queryTypeId);
			expressions.add(queryType);
		}

		String content = query.getQueryContent();
		if (content != null) {
			content = content.toUpperCase();
			content += "%";
			Expression<Boolean> contentExp = cb.like(
				cb.upper(root.<String>get("content")), content);
			expressions.add(contentExp);
		}

		Date regDate = query.getRegDate();
		if (regDate != null) {
			Expression<Boolean> regDateExp = cb.equal(
				root.<Date>get("regDate"), regDate);
			expressions.add(regDateExp);
		}

		String reqObjSurname = query.getReqObjSurname();
		if (reqObjSurname != null) {
			reqObjSurname = reqObjSurname.toUpperCase();
			reqObjSurname += "%";
			Expression<Boolean> objSurname = cb.equal(
				cb.upper(root.<String>get("requestObjectSurname")),
				reqObjSurname);
			expressions.add(objSurname);
		}

		String rqObjName = query.getReqObjName();
		if (rqObjName != null) {
			rqObjName = rqObjName.toUpperCase();
			rqObjName += "%";
			Expression<Boolean> requestObjectName = cb
				.equal(cb.upper(root.<String>get("requestObjectName")),
					rqObjName);
			expressions.add(requestObjectName);
		}

		String rqObjFather = query.getReqObjFatherName();
		if (rqObjFather != null) {
			rqObjFather = rqObjFather.toUpperCase();
			rqObjFather += "%";
			Expression<Boolean> rqFather = cb.equal(
				cb.upper(root.<String>get("requestFatherName")),
				rqObjFather);
			expressions.add(rqFather);
		}

		Expression<Boolean> finalExpression = null;
		logger.info("Количество критериев поиска: " + expressions.size());
		if (expressions.size() > 0) {
			finalExpression = expressions.get(0);
			for (int i = 1; i < expressions.size(); i++) {
				finalExpression = cb.and(finalExpression, expressions.get(i));
			}
		}
		if (finalExpression != null) {
			searchQuery.where(finalExpression);
		}
		TypedQuery<QuestionModel> q = em.createQuery(searchQuery);
		@SuppressWarnings("unchecked")
		List<QuestionModel> result = q.getResultList();
		ArrayList<SearchResultItem> resultItems = new ArrayList<>();
		for (QuestionModel qq : result) {
			SearchResultItem item = new SearchResultItem(qq);
			resultItems.add(item);
		}
		JsonArray a = jsonTools.getJsonEntitiesList(resultItems);
		JsonObjectBuilder bdr = Json.createObjectBuilder();
		bdr.add("items", a);
		bdr.add("totalCount", result.size());
		return bdr.build();
	}

}
