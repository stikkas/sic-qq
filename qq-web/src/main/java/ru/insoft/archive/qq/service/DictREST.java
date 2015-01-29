package ru.insoft.archive.qq.service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Selection;
import javax.ws.rs.DefaultValue;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.insoft.archive.core_model.table.desc.DescriptorGroup;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("dict")
public class DictREST {

	@PersistenceContext(unitName = "SicEntityManager")
	EntityManager em;

	/**
	 * код для обозначения СИЦ
	 */
	private static final String SIC_MEMBER = "Q_VALUE_MEMBER_SIC";

	/**
	 * Идентификатор СИЦ
	 */
	private static Long sicId;

	/**
	 * Находит в базе идентификатор СИЦ и записывает, чтобы потом к базе не
	 * обращаться
	 */
	@PostConstruct
	private void setSicId() {
		try {
			sicId = (Long) em.createQuery("SELECT v.id from DescriptorValue v where "
					+ "v.code=:mem").setParameter("mem", SIC_MEMBER).getSingleResult();
		} catch (NonUniqueResultException | NoResultException e) {
// TODO что делать?
		}
	}
	/**
	 * Возвращает список литер. Для СИЦ - все, для архива СИЦ + аббревиатура
	 * архива
	 *
	 * @param organization идентификатор организации для кого нужен список
	 * @return список литер
	 */
	@GET
	@Path("litera")
	@Produces({"application/json"})
	public List<Dict> getLiteras(@QueryParam("organization") Long organization) {
		String query = "SELECT NEW ru.insoft.archive.qq.service.Dict(v.id, a.value, v.code)"
				+ " from DescriptorValueAttr a, DescriptorGroupAttr g, DescriptorValue v"
				+ " where a.attrId = g.id and a.valueId = v.id and g.code = 'MEMBER_LETTER'";

		if (organization != null && !organization.equals(sicId)) {
			query += " and v.id in (" + sicId + "," + organization + ")";
		}
		return execQuery(query);
	}

	/**
	 * Возвращает список пользователей определенной организации
	 *
	 * @param organization идентификатор огранизации, которой принадлежат
	 * пользователи
	 * @param role роль интересующих пользователей
	 * @return список пользователей
	 */
	@GET
	@Path("users")
	@Produces({"application/json"})
	public List<Dict> getExecUsers(@DefaultValue("-1") @QueryParam("organization") Long organization,
			@DefaultValue("Q_RULE_EXECUTOR") @QueryParam("role") String role) {
		String query = "SELECT DISTINCT new ru.insoft.archive.qq.service.Dict(a.id, a.name) from "
				+ "AdmUser a, AdmEmployee e, AdmUserGroup g, AdmGroupRule r, AdmAccessRule x "
				+ "where a.id = e.userId and a.id = g.userId "
				+ "and r.groupId = g.groupId and x.accessRuleId = r.accessRuleId "
				+ "and x.code = '" + role + "'";
//				+ "and x.code in ('Q_RULE_REGISTRATOR', 'Q_RULE_COORDINATOR', 'Q_RULE_EXECUTOR')";
		if (!organization.equals(-1L)) {
			query += " and e.departmentId = '" + organization + "'";
		}
		return execQuery(query);
	}

	/**
	 * Возвращает список возможных статусов запроса
	 *
	 * @return список статусов
	 */
	@GET
	@Path("statuses")
	@Produces({"application/json"})
	public List<Dict> getStatuses() {
		return getGeneralDict("Q_DICT_QUESTION_STATUSES");
		/*
		 return execQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(d.id, d.value, d.code) "
		 + "from DescriptorValue d, DescriptorGroup g where d.groupId = g.id "
		 + "and g.code='Q_DICT_QUESTION_STATUSES'");
		 */
	}

	/**
	 * Возвращает список возможных статусов уведомления запроса
	 *
	 * @return список статусов уведомления
	 */
	@GET
	@Path("notifystatuses")
	@Produces({"application/json"})
	public List<Dict> getNotifyStatuses() {
		return getGeneralDict("Q_DICT_NOTIFY_STATUSES");
		/*
		 return execQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(d.id, d.value, d.code) "
		 + "from DescriptorValue d, DescriptorGroup g where d.groupId = g.id "
		 + "and g.code='Q_DICT_NOTIFY_STATUSES'");
		 */
	}

	/**
	 * Возвращает список организаций
	 *
	 * @return список организаций
	 */
	@GET
	@Path("organizations")
	@Produces({"application/json"})
	public List<Dict> getOrganizations() {
		return execQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(d.id, d.value, d.code) "
				+ "from DescriptorValue d, DescriptorGroup g where d.groupId = g.id "
				+ "and g.code='ORG_STRUCTURE' "
				+ "and (DESCRIPTOR_PACK.GET_ORG_STRUCTURE_TYPE(d.id) = 'ARCHIVE' "
				+ "or d.code = 'Q_VALUE_MEMBER_SIC')");
	}

	/**
	 * Возвращает список форм выдачи ответа
	 *
	 * @return возможные формы выдачи ответа
	 */
	@GET
	@Path("sendtypes")
	@Produces({"application/json"})
	public List<Dict> getSendTypes() {
		return getGeneralDict("Q_DICT_ANSWER_FORM");
		/*
		 return execQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(d.id, d.value, d.code) "
		 + "from DescriptorValue d, DescriptorGroup g where d.groupId = g.id "
		 + "and g.code=''");
		 */
	}

	/**
	 * Возвращает список типов запросов
	 *
	 * @return возможные формы выдачи ответа
	 */
	@GET
	@Path("querytypes")
	@Produces({"application/json"})
	public List<ExtDict> getQuerytTypes() {
		return getExtendedDict("Q_DICT_QUEST_TYPE");
		/*		return execQuery("SELECT NEW ru.insoft.archive.qq.service.ExtDict(d.id, d.value, d.code, d.shortValue) "
		 + "from DescriptorValue d, DescriptorGroup g where d.groupId = g.id "
		 + "and g.code='Q_DICT_QUEST_TYPE'");*/
	}

	/**
	 * Выполняет запрос к базе
	 */
	private List<Dict> execQuery(String query) {
		try {
			return em.createQuery(query).getResultList();
		} catch (RuntimeException e) {
			return new ArrayList<>();
		}
	}

	/**
	 * Получение простого справочника
	 *
	 * @param groupCode код справочника
	 * @return список значений справочника
	 */
	private List<Dict> getGeneralDict(String groupCode) {
		return getDict(groupCode, Dict.class, "id", "value", "code");
	}

	/**
	 * Получение расширенного справочника
	 *
	 * @param groupCode код справочника
	 * @return список значений справочника
	 */
	private List<ExtDict> getExtendedDict(String groupCode) {
		return getDict(groupCode, ExtDict.class, "id", "value", "code", "shortValue");
	}

	/**
	 * Выполняет всю работу по получению справочника из базы.
	 *
	 * @param <T> тип значений возвращаемого массива
	 * @param groupCode код справочника
	 * @param type класс значений возвращаемого массива
	 * @param select набор полей для элементов справочника
	 * @return список элементов справочника
	 */
	private <T extends Dict> List<T> getDict(String groupCode, Class<T> type, String... select) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		// Получаем группу справочника
		CriteriaQuery<DescriptorGroup> groupQuery = cb.createQuery(DescriptorGroup.class);
		groupQuery.where(cb.equal(groupQuery.from(DescriptorGroup.class).get("code"), groupCode));
		try {
			DescriptorGroup descriptorGroup = em.createQuery(groupQuery).getSingleResult();

			CriteriaQuery<T> dictQuery = cb.createQuery(type);
			Root<DescriptorValue> root = dictQuery.from(DescriptorValue.class);
			Selection[] selections = new Selection[select.length];
			for (int i = 0; i < select.length; ++i) {
				selections[i] = root.get(select[i]);
			}
			dictQuery.select(cb.construct(type, selections));
			dictQuery.where(cb.equal(root.get("groupId"), descriptorGroup.getId()));

			if (descriptorGroup.isAlphabeticSort()) {
				dictQuery.orderBy(cb.asc(root.get("value")));
			}
			return em.createQuery(dictQuery).getResultList();
		} catch (RuntimeException e) {
			Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, e.getMessage(), e);
			return new ArrayList<>();
		}
	}
}
