package ru.insoft.archive.qq.service;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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

	private static final String SIC_MEMBER = "Q_VALUE_MEMBER_SIC";

	@PersistenceContext(unitName = "SicEntityManager")
	EntityManager em;

	private static Long sicId;

	private void setSicId() {
		try {
			sicId = (Long) em.createQuery("SELECT v.id from DescriptorValue v where "
				+ "v.code=:mem").setParameter("mem", SIC_MEMBER).getSingleResult();
		} catch (NonUniqueResultException | NoResultException e) {
// TODO что делать?
		}
	}

	@PostConstruct
	void init() {
		setSicId();
	}

	@GET
	@Path("litera")
	@Produces({"application/json"})
	public List<Dict> getLiteras(@QueryParam("organization") Long organization) {
		try {
			return em.createQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(v.id, a.value, v.code)"
				+ " from DescriptorValueAttr a, DescriptorGroupAttr g, DescriptorValue v"
				+ " where a.attrId = g.id and a.valueId = v.id and g.code = 'MEMBER_LETTER'"
				+ " and v.id in (:sicId,:org)")
				.setParameter("sicId", sicId)
				.setParameter("org", organization)
				.getResultList();
		} catch (RuntimeException e) {
			return new ArrayList<>();
		}
	}

	@GET
	@Path("users")
	@Produces({"application/json"})
	public List<Dict> getUsers(@QueryParam("organization") Long organization) {
		try {
			return em.createQuery("SELECT NEW ru.insoft.archive.qq.service.Dict(u.id, u.name) from AdmUser u, "
				+ " AdmEmployee e where u.id = e.userId and e.departmentId = :org")
				.setParameter("org", organization).getResultList();
		} catch (RuntimeException e) {
			return new ArrayList<>();
		}
	}
}
