package ru.insoft.archive.qq.ejb;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.json.Json;
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
import ru.insoft.archive.qq.entity.Applicant;
import ru.insoft.archive.qq.entity.Execution;
import ru.insoft.archive.qq.entity.Question;
import ru.insoft.archive.qq.model.SearchCritery;
import ru.insoft.archive.qq.entity.Transmission;
import ru.insoft.archive.qq.webmodel.JournalItem;
import ru.insoft.archive.qq.webmodel.SearchResultItem;

@Stateless
public class QQSearch extends LoggedBean {

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	@EJB
	private JsonTools jsonTools;

	private Expression<Boolean> getLikeExp(String queryValue, String field,
		Join<Question, Applicant> ro) {
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
		CriteriaQuery<Question> criteriaQuery = cb.createQuery(Question.class);
		Root<Question> root = criteriaQuery.from(Question.class);
		ArrayList<Expression> expressions = new ArrayList<>();
		if (filters != null) {
			for (FilterBy fb : filters) {
				switch (fb.getProperty()) {
					case "litera":
						logger.info("Фильтр литера: значение: "
							+ fb.getValue().toString());
						Expression<Boolean> literaEqual = cb.equal(
							root.get("litera"), fb.getValue());
						expressions.add(literaEqual);
						break;
					case "inboxDocNum":
						String filterValue = fb.getValue().toString();
						logger.info("Фильтр входящий номер: значение: "
							+ filterValue);
						String[] number = filterValue.split("/");
						Long prefix,
						 sufix;
						try {
							prefix = Long.parseLong(number[0]);
							sufix = Long.parseLong(number[1]);
						} catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
							prefix = sufix = -1L;
						}
						expressions.add(cb.and(
							cb.equal(root.<Long>get("prefixNum"), prefix),
							cb.equal(root.<Long>get("sufixNum"), sufix)));
						break;
					case "regDate":
						Date d1 = jsonTools.parseBadStringDate((String) fb.getValue());
						Expression<Boolean> dateEqual = cb.equal(
							cb.function("trunc", Date.class, root.<Date>get("regDate")), d1);
						expressions.add(dateEqual);
						break;
					case "execDate":
						Join<Question, Execution> eiJoin = root.join("execution");
						Date d2 = jsonTools.parseBadStringDate(fb.getValue().toString());
						Expression<Boolean> exDateExp = cb.equal(
							cb.function("trunc", Date.class, eiJoin.get("execDate")), d2);
						expressions.add(exDateExp);
						break;
					case "fioOrg":
						String applicant = (String) fb.getValue();
						Join<Question, Applicant> aplJoin = root.join("applicant");
						Expression<String> fio = cb.concat(cb.concat(cb.concat(
							aplJoin.<String>get("lastName"), " "),
							cb.concat(aplJoin.<String>get("firstName"), " ")),
							aplJoin.<String>get("middleName"));
						Expression<Boolean> phyzLike = cb.like(cb.lower(fio), applicant.toLowerCase());
						Expression<String> jur = cb.lower(aplJoin
							.<String>get("organization"));
						Expression<Boolean> jyrLike = cb.like(jur,
							applicant.toLowerCase());
						Expression<Boolean> finalOr = cb.or(phyzLike, jyrLike);
						expressions.add(finalOr);
						break;
					case "status":
						Long status = (Long) fb.getValue();
						Expression<Boolean> eq = cb.equal(root.<Long>get("status"), status);
						expressions.add(eq);
						break;
					case "executor":
						Long executor = (Long) fb.getValue();
						Join<Question, Transmission> jTr = root
							.join("transmission");
						Expression<Boolean> equalExecutor = cb.equal(
							jTr.get("executor"), executor);
						expressions.add(equalExecutor);
						break;
					case "organization":
						Long organization = (Long) fb.getValue();
						expressions.add(cb.equal(root.<Long>get("execOrg"), organization));
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
						Join<Question, DescriptorValue> jj = root.join("litera", JoinType.LEFT);
						if (ou.asc()) {
							o = cb.asc(jj.get("value"));
						} else {
							o = cb.desc(jj.get("value"));
						}
						jpaOrders.add(o);
						break;
					case "inboxDocNum":
						if (ou.asc()) {
							jpaOrders.add(cb.asc(root.<Long>get("sufixNum")));
							o = cb.asc(root.<Long>get("prefixNum"));
						} else {
							jpaOrders.add(cb.desc(root.<Long>get("sufixNum")));
							o = cb.desc(root.<Long>get("prefixNum"));
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
						Join<Question, Execution> eiJoin = root
							.join("execution", JoinType.LEFT);
						if (ou.asc()) {
							o = cb.asc(eiJoin.get("execDate"));
						} else {
							o = cb.desc(eiJoin.get("execDate"));
						}
						jpaOrders.add(o);
						break;
					case "fioOrg":
						//Сортируются сначала по Юридическим лицам, потом по физическим
						Join<Question, Applicant> aplJoin = root.join("applicant");
						Expression<String> concat = cb.concat(
							aplJoin.<String>get("lastName"), " ");
						concat = cb.concat(concat, aplJoin.<String>get("firstName"));
						concat = cb.concat(concat, " ");
						concat = cb.concat(concat,
							aplJoin.<String>get("middleName"));
						concat = cb.lower(concat);
						Expression<String> jur = cb.lower(aplJoin
							.<String>get("organization"));
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
						Join<Question, Transmission> jTr = root.join("transmission", JoinType.LEFT);
						Join<Transmission, AdmUser> admUserJoin = jTr.join("executorValue", JoinType.LEFT);
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

		TypedQuery<Question> q = em.createQuery(criteriaQuery);

		Integer total = q.getResultList().size();
		q.setFirstResult(start);
		q.setMaxResults(limit);

		Question[] array = new Question[q.getResultList().size()];
		q.getResultList().toArray(array);

		ArrayList<JournalItem> items = new ArrayList<>();
		for (Question qq : array) {
			items.add(new JournalItem(qq));
		}
		JsonObjectBuilder resultBuilde = Json.createObjectBuilder();
		resultBuilde.add("items", jsonTools.getJsonEntitiesList(items));
		resultBuilde.add("total", total);
		JsonObject result = resultBuilde.build();
		return result;
	}

	public JsonObject getSearchResult(Integer start, Integer limit, SearchCritery query)
		throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Question> searchQuery = cb.createQuery(Question.class);

		Root<Question> root = searchQuery.from(Question.class);

		ArrayList<Expression<Boolean>> expressions = new ArrayList<>();

		if (query.isApplicantJoinNeeds()) {
			Join<Question, Applicant> join = root.join("applicant");

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

			String applName = query.getApplFirstName();
			if (applName != null) {
				expressions.add(getLikeExp(applName, "firstName", join));
			}

			String applSurname = query.getApplLastName();
			if (applSurname != null) {
				expressions.add(getLikeExp(applSurname, "lastName", join));
			}

			String applFather = query.getApplMiddleName();
			if (applFather != null) {
				expressions.add(getLikeExp(applFather, "middleName", join));
			}
		}

		Long execArchId = query.getArchiveId();
		if (execArchId != null) {
			Expression<Boolean> archExecutor = cb.equal(root.get("execOrg"), execArchId);
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
			expressions.add(cb.equal(
				cb.function("trunc", Date.class, root.<Date>get("regDate")),
				regDate));
		}

		String name = query.getReqLastName();
		if (name != null) {
			expressions.add(cb.like(cb.upper(root.<String>get("objectLName")),
				name.toUpperCase() + "%"));
		}

		name = query.getReqFirstName();
		if (name != null) {
			expressions.add(cb.like(cb.upper(root.<String>get("objectFName")),
				name.toUpperCase() + "%"));
		}

		name = query.getReqMiddleName();
		if (name != null) {
			expressions.add(cb.like(cb.upper(root.<String>get("objectMName")),
				name.toUpperCase() + "%"));
		}

		Long litera = query.getLitera();
		if (litera != null) {
			expressions.add(cb.equal(root.<Long>get("litera"), litera));
		}

		Expression<Boolean> finalExpression = null;
		if (expressions.size() > 0) {
			finalExpression = expressions.get(0);
			for (int i = 1; i < expressions.size(); i++) {
				finalExpression = cb.and(finalExpression, expressions.get(i));
			}
		}
		if (finalExpression != null) {
			searchQuery.where(finalExpression);
		}

		@SuppressWarnings("unchecked")
		Integer total = em.createQuery(searchQuery).getResultList().size();

		TypedQuery<Question> q = em.createQuery(searchQuery);
		q.setFirstResult(start);
		q.setMaxResults(limit);

		List<Question> result = q.getResultList();

		ArrayList<SearchResultItem> resultItems = new ArrayList<>();
		for (Question qq : result) {
			resultItems.add(new SearchResultItem(qq));
		}
		JsonObjectBuilder bdr = Json.createObjectBuilder();
		bdr.add("items", jsonTools.getJsonEntitiesList(resultItems));
		bdr.add("total", total);

		return bdr.build();
	}

}
