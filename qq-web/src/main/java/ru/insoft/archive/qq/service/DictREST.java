package ru.insoft.archive.qq.service;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.ws.rs.DefaultValue;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

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

		if (!organization.equals(sicId)) {
			query += " and v.id in (" + sicId + "," + organization + ")";
		}
		return execQuery(query);
	}

	/**
	 * Возвращает список пользователей определенной организации
	 *
	 * @param organization идентификатор огранизации, которой принадлежат
	 * пользователи
	 * @return список пользователей
	 */
	@GET
	@Path("users")
	@Produces({"application/json"})
	public List<Dict> getUsers(@DefaultValue("-1") @QueryParam("organization") Long organization) {
		String query = "SELECT DISTINCT new ru.insoft.archive.qq.service.Dict(a.id, a.name) from "
			+ "AdmUser a, AdmEmployee e, AdmUserGroup g, AdmGroupRule r, AdmAccessRule x "
			+ "where a.id = e.userId and a.id = g.userId "
			+ "and r.groupId = g.groupId and x.accessRuleId = r.accessRuleId "
			+ "and x.code in ('Q_RULE_REGISTRATOR', 'Q_RULE_COORDINATOR', 'Q_RULE_EXECUTOR')";
		if (!organization.equals(-1L)) {
			query += " and e.departmentId = '" + organization + "'";
		}
		return execQuery(query);
//			return em.createQuery(query).getResultList();
//			return em.createQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(u.id, u.name) from AdmUser u, "
//				+ " AdmEmployee e where u.id = e.userId and e.departmentId = :org")
//				.setParameter("org", organization).getResultList();
//		} catch (RuntimeException e) {
//			return new ArrayList<>();
//		}
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
		return execQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(d.id, d.value, d.code) "
			+ "from DescriptorValue d, DescriptorGroup g where d.groupId = g.id "
			+ "and g.code='Q_DICT_QUESTION_STATUSES'");
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
			+ "and g.code='ORG_STRUCTURE'");
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
}
