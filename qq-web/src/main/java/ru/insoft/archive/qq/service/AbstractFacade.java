package ru.insoft.archive.qq.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;

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

	/**
	 * Возвращает список сущностей, которые принадлежат запросу и выполняются
	 * все допoлнительные условия. Каждое дополнительное условие представляет
	 * собой сравнение на значение из таблицы DESCRIPTOR_VALUE по полю
	 * VALUE_CODE.
	 *
	 * @param id идентификатор запроса
	 * @param clause дополнительные условия будут склеиваться через AND
	 * @return список искомых сущностей
	 */
	List<T> findByQuestionWhereAnd(Long id, Clause[] clauses) {
		CriteriaBuilder cb = em.getCriteriaBuilder();

		CriteriaQuery<T> cq = cb.createQuery(entityClass);
		Root<T> root = cq.from(entityClass);
		Predicate expr = cb.equal(root.<Long>get("question"), id);

		for (Clause cl : clauses) {
			// Находим id для заданного когда в таблице DESCRIPTOR_VALUE
			CriteriaQuery<DescriptorValue> cqdv = cb.createQuery(DescriptorValue.class);
			cqdv.where(cb.equal(cqdv.from(DescriptorValue.class).<Long>get("code"), cl.getFieldValue()));
			DescriptorValue value = em.createQuery(cqdv).getSingleResult();

			// Используем в нашем условии
			expr = cb.and(expr, cb.equal(root.<Long>get(cl.getFieldName()), value.getId()));
		}
		cq.where(expr);
		return em.createQuery(cq).getResultList();
	}

	/**
	 * Возвращает список параметров системы с заданными кодами
	 *
	 * @param clauses коды параметров
	 * @return список параметров
	 */
	List<T> coreParametersByCode(Clause[] clauses) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<T> cq = cb.createQuery(entityClass);

		Root<T> root = cq.from(entityClass);
		Clause cl = clauses[0];
		Predicate expr = cb.equal(root.<String>get(cl.getFieldName()),
			cl.getFieldValue());

		for (int i = 1; i < clauses.length; ++i) {
			cl = clauses[i];
			expr = cb.or(expr, cb.equal(root.<String>get(cl.getFieldName()),
				cl.getFieldValue()));
		}
		cq.where(expr);
		return em.createQuery(cq).getResultList();
	}
}
