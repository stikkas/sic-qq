package ru.insoft.archive.qq.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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
}
