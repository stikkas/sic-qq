package ru.insoft.archive.qq.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;

/**
 *
 * @author С. Благодатских
 * @param <T>
 */
public abstract class AbstractFacade<T> {

	private Class<T> entityClass;

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	public AbstractFacade(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	public T create(T entity) {
		em.persist(entity);
		return entity;
	}

	public void edit(T entity) {
		em.merge(entity);
	}

	public void remove(T entity) {
		em.remove(entity);
	}

	public T find(Long id) {
		return em.find(entityClass, id);
	}

	/**
	 * Возвращает список сущностей принадлежащих запросу {@code Question}.
	 *
	 * @param id идентификатор запроса
	 * @return список найденных сущностей
	 */
	List<T> findByQuestion(Long id) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<T> cq = cb.createQuery(entityClass);
		cq.where(cb.equal(cq.from(entityClass).<Long>get("question"), id));
		return em.createQuery(cq).getResultList();
	}
}
