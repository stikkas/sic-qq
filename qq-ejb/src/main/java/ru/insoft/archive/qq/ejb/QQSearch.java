package ru.insoft.archive.qq.ejb;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

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
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.webmodel.FilterBy;
import ru.insoft.archive.extcommons.webmodel.OrderBy;
import ru.insoft.archive.qq.entity.Applicant;
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
	private static JsonTools jsonTools;
	/*
	 private Expression<Boolean> getLikeExp(String queryValue, String field,
	 Join<Question, Applicant> ro) {
	 queryValue = queryValue.toUpperCase();
	 queryValue += "%";
	 CriteriaBuilder b = em.getCriteriaBuilder();
	 Expression<Boolean> exp = b.like(b.upper(ro.<String>get(field)),
	 queryValue);
	 return exp;
	 }
	 */

	public JsonObject getJournalData(Integer start, Integer limit,
			List<FilterBy> filters, List<OrderBy> orders) throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Question> criteriaQuery = cb.createQuery(Question.class);
		Root<Question> root = criteriaQuery.from(Question.class);

		if (filters != null) {
			new Filter(filters).createCriteriaQuery(criteriaQuery, root, cb);
		}

		ArrayList<Order> jpaOrders = new ArrayList<>();
		if (orders != null) {
			for (OrderBy ou : orders) {
				String orderField = ou.getField();
				Order o = null;
				switch (orderField) {
					case "litera":
						Path<String> jj = root.join("literaValue", JoinType.LEFT).get("value");
						jpaOrders.add(ou.asc() ? cb.asc(jj) : cb.desc(jj));
						break;
					case "queryType":
						Path<String> qt = root.join("questionTypeValue", JoinType.LEFT).get("shortValue");
						jpaOrders.add(ou.asc() ? cb.asc(qt) : cb.desc(qt));
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
						Path<Date> pd = root.get("regDate");
						jpaOrders.add(ou.asc() ? cb.asc(pd) : cb.desc(pd));
						break;
					case "plannedDate":
						Path<Date> pld = root.get("plannedFinishDate");
						jpaOrders.add(ou.asc() ? cb.asc(pld) : cb.desc(pld));
						break;
					case "execDate":
						Path<Date> ed = root.join("execution", JoinType.LEFT).get("execDate");
						jpaOrders.add(ou.asc() ? cb.asc(ed) : cb.desc(ed));
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
					case "execOrg":
						Path<String> eoo = root.join("execOrgValue", JoinType.LEFT).get("shortValue");
						jpaOrders.add(ou.asc() ? cb.asc(eoo) : cb.desc(eoo));
						break;
					case "notifyStatus":
						Path<Long> qns = root.<Long>get("notifyStatus");
						jpaOrders.add(ou.asc() ? cb.asc(qns) : cb.desc(qns));
					default:
						logger.warning("unknown sort field " + orderField);
				}
			}
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

	public JsonObject getSearchResult(Integer start, Integer limit,
			SearchCritery query, List<OrderBy> orders) throws Exception {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Question> searchQuery = cb.createQuery(Question.class);

		Root<Question> root = searchQuery.from(Question.class);

		ArrayList<Expression<Boolean>> expressions = new ArrayList<>();

		if (query.isApplicantJoinNeeds()) {
			Join<Question, Applicant> join = root.join("applicant");

			Long applType = query.getApplicantTypeId();
			if (applType != null) {
				expressions.add(cb.equal(join.<Long>get("applicantType"), applType));
			}

			Long applCat = query.getApplicantCategoryId();
			if (applCat != null) {
				expressions.add(cb.equal(join.<Long>get("applicantCategory"), applCat));
			}

			String applName = query.getApplFirstName();
			if (applName != null) {
				expressions.add(cb.like(cb.upper(join.<String>get("firstName")),
						(applName + "%").toUpperCase()));
			}

			applName = query.getApplLastName();
			if (applName != null) {
				expressions.add(cb.like(cb.upper(join.<String>get("lastName")),
						(applName + "%").toUpperCase()));
			}

			applName = query.getApplMiddleName();
			if (applName != null) {
				expressions.add(cb.like(cb.upper(join.<String>get("middleName")),
						(applName + "%").toUpperCase()));
			}

			String organization = query.getOrganization();
			if (organization != null) {
				expressions.add(cb.like(cb.upper(join.<String>get("organization")),
						("%" + organization + "%").toUpperCase()));
			}

			String issueDocNum = query.getIssueDocNum();
			if (issueDocNum != null) {
				expressions.add(cb.like(cb.upper(join.<String>get("issueDocNum")),
						("%" + issueDocNum + "%").toUpperCase()));
			}
		}

		Long execArchId = query.getArchiveId();
		if (execArchId != null) {
			expressions.add(cb.equal(root.get("execOrg"), execArchId));
		}

		Long queryTypeId = query.getQueryTypeId();
		if (queryTypeId != null) {
			expressions.add(cb.equal(root.get("questionType"), queryTypeId));
		}

		String content = query.getQueryContent();
		if (content != null) {
			expressions.add(cb.like(cb.upper(root.<String>get("content")),
					("%" + content + "%").toUpperCase()));
		}

		Date startRegDate = query.getRegDateStart();
		Date endRegDate = query.getRegDateEnd();
		if (startRegDate != null && endRegDate != null) {
			expressions.add(cb.between(cb.function("trunc", Date.class, root.<Date>get("regDate")),
					startRegDate, endRegDate));
		} else if (startRegDate != null) {
			expressions.add(cb.greaterThan(
					cb.function("trunc", Date.class, root.<Date>get("regDate")),
					startRegDate));
		} else if (endRegDate != null) {
			expressions.add(cb.lessThan(
					cb.function("trunc", Date.class, root.<Date>get("regDate")),
					endRegDate));
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

		Long executor = query.getExecutor();
		if (executor != null) {
			expressions.add(cb.equal(root.join("transmission")
					.<Long>get("executor"), executor));
		}
		ArrayList<Order> jpaOrders = new ArrayList<>();
		if (orders != null) {
			for (OrderBy ou : orders) {
				String orderField = ou.getField();
				Order o = null;
				switch (orderField) {
					case "litera":
						Path<String> p = root.join("literaValue", JoinType.LEFT).get("value");
						jpaOrders.add(ou.asc() ? cb.asc(p) : cb.desc(p));
						break;
					case "inboxDocNum":
						Path<Long> p1 = root.get("sufixNum");
						Path<Long> p2 = root.get("prefixNum");
						if (ou.asc()) {
							jpaOrders.add(cb.asc(p1));
							jpaOrders.add(cb.asc(p2));
						} else {
							jpaOrders.add(cb.desc(p1));
							jpaOrders.add(cb.desc(p2));
						}
						break;
					case "regDate":
						Path<Date> d = root.get("regDate");
						jpaOrders.add(ou.asc() ? cb.asc(d) : cb.desc(d));
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
					case "content":
						Path<String> ei = root.get("content");
						jpaOrders.add(ou.asc() ? cb.asc(ei) : cb.desc(ei));
						break;
					case "answerResult":
						Path<String> ra = root.join("execution", JoinType.LEFT).get("answerResult");
						jpaOrders.add(ou.asc() ? cb.asc(ra) : cb.desc(ra));
						break;
					case "requestType":
						Path<String> rt = root.join("questionTypeValue", JoinType.LEFT).get("shortValue");
						jpaOrders.add(ou.asc() ? cb.asc(rt) : cb.desc(rt));
						break;
					default:
						logger.warning("unknown sort field " + orderField);
				}
			}
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
		if (jpaOrders.size() > 0) {
			searchQuery.orderBy(jpaOrders);
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

	private static class Filter {

		/**
		 * Литера
		 */
		Long litera;
		/**
		 * Тип запроса (социально-правовой и т.д.)
		 */
		Long queryType;
		/**
		 * Префикс номера запроса
		 */
		Long prefixNum;
		/**
		 * Суфикс номера запроса
		 */
		Long suffixNum;
		/**
		 * Статус запроса
		 */
		Long status;
		/**
		 * Назначеный исполнитель запроса
		 */
		Long executor;
		/**
		 * Исполняющая организация запроса
		 */
		Long execOrg;
		/**
		 * Запросщик информации, используется для СИЦ. Иными словами requestor
		 * всегда отображает ID для CИЦ.
		 */
		Long requestor;
		/**
		 * Статус, с которым запросы не нужны. Присутствует всегда. На данный
		 * момент это статус на регистрации.
		 */
		Long nostatus;
		/**
		 * Организация, чьи запросы с определенным статусом не нужны,
		 * используется совместно с nostatus. Используется в запросах от
		 * архивов, а noorganization == СИЦ.
		 */
		Long noorganization;
		/**
		 * Дата регистарации запроса
		 */
		Date regDate;
		/**
		 * Плановая дата выполнения запроса
		 */
		Date plannedDate;
		/**
		 * Дата выполнения запроса
		 */
		Date execDate;
		/**
		 * От кого поступил запрос
		 */
		String fioOrg;

		/**
		 * Статус уведомления
		 */
		Long notifyStatus;

		public Filter(List<FilterBy> filters) {
			for (FilterBy fb : filters) {
				switch (fb.getProperty()) {
					case "litera":
						litera = (Long) fb.getValue();
						break;
					case "queryType":
						queryType = (Long) fb.getValue();
						break;
					case "inboxDocNum":
						String filterValue = fb.getValue().toString();
						String[] number = filterValue.split("/");
						try {
							prefixNum = Long.parseLong(number[0]);
							suffixNum = Long.parseLong(number[1]);
						} catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
							prefixNum = suffixNum = null;
						}
						break;
					case "regDate": {
						try {
							regDate = jsonTools.parseBadStringDate((String) fb.getValue());
						} catch (Exception ex) {
							Logger.getLogger(QQSearch.class.getName()).log(Level.SEVERE, null, ex);
						}
					}
					break;
					case "plannedDate": {
						try {
							plannedDate = jsonTools.parseBadStringDate((String) fb.getValue());
						} catch (Exception ex) {
							Logger.getLogger(QQSearch.class.getName()).log(Level.SEVERE, null, ex);
						}
					}
					break;
					case "execDate": {
						try {
							execDate = jsonTools.parseBadStringDate((String) fb.getValue());
						} catch (Exception ex) {
							Logger.getLogger(QQSearch.class.getName()).log(Level.SEVERE, null, ex);
						}
					}
					break;
					case "fioOrg":
						fioOrg = (String) fb.getValue();
						break;
					case "status":
						status = (Long) fb.getValue();
						break;
					case "executor":
						executor = (Long) fb.getValue();
						break;
					case "execOrg":
						execOrg = (Long) fb.getValue();
						break;
					case "nostatus":
						nostatus = (Long) fb.getValue();
						break;
					case "noorganization":
						noorganization = (Long) fb.getValue();
						break;
					case "requestor":
						requestor = (Long) fb.getValue();
						break;
					case "notifyStatus":
						notifyStatus = (Long) fb.getValue();
				}
			}
		}

		<T> CriteriaQuery<T> createCriteriaQuery(CriteriaQuery<T> criteriaQuery,
				Root<T> root, CriteriaBuilder cb) {
			ArrayList<Expression> expressions = new ArrayList<>();
			if (noorganization != null) {
				expressions.add(cb.or(cb.and(cb.notEqual(root.get("status"), nostatus),
						cb.equal(root.get("litera"), noorganization)),
						cb.equal(root.get("litera"), execOrg)));
			} else {
				expressions.add(cb.or(cb.and(cb.notEqual(root.get("status"), nostatus),
						cb.notEqual(root.get("litera"), requestor)),
						cb.equal(root.get("litera"), requestor)));
			}
			if (litera != null) {
				expressions.add(cb.equal(root.get("litera"), litera));
			}
			if (queryType != null) {
				expressions.add(cb.equal(root.get("questionType"), queryType));
			}
			if (regDate != null) {
				expressions.add(cb.equal(
						cb.function("trunc", Date.class, root.<Date>get("regDate")), regDate));
			}
			if (plannedDate != null) {
				expressions.add(cb.equal(
						cb.function("trunc", Date.class, root.<Date>get("plannedFinishDate")), plannedDate));
			}

			if (execDate != null) {
				expressions.add(cb.equal(
						cb.function("trunc", Date.class, root.join("execution").get("execDate")), execDate));
			}

			if (status != null) {
				expressions.add(cb.equal(
						root.<Long>get("status"), status));
			}
			if (execOrg != null) {
				expressions.add(cb.equal(
						root.<Long>get("execOrg"), execOrg));
			}
			if (executor != null) {
				expressions.add(cb.equal(
						root.join("transmission").get("executor"), executor));
			}
			if (prefixNum != null) {
				expressions.add(cb.and(
						cb.equal(root.<Long>get("prefixNum"), prefixNum),
						cb.equal(root.<Long>get("sufixNum"), suffixNum)));

			}
			if (fioOrg != null) {
				Join<Question, Applicant> aplJoin = root.join("applicant");
				Expression<Boolean> phyzLike = cb.like(cb.lower(aplJoin.<String>get("lastName")),
						"%" + fioOrg.toLowerCase() + "%");
				Expression<Boolean> jyrLike = cb.like(cb.lower(aplJoin.<String>get("organization")),
						"%" + fioOrg.toLowerCase() + "%");
				expressions.add(cb.or(phyzLike, jyrLike));
			}
			if (notifyStatus != null) {
				expressions.add(cb.equal(root.<Long>get("notifyStatus"), notifyStatus));
			}

			if (!expressions.isEmpty()) {
				Expression and = expressions.get(0);
				int size = expressions.size();
				for (int i = 1; i < size; ++i) {
					and = cb.and(and, expressions.get(i));
				}
				criteriaQuery.where(and);
			}
			return criteriaQuery;
		}

	}
}
