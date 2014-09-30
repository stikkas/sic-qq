package ru.insoft.archive.qq.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.qq.entity.AttachedFile;

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

	public void remove(Long id) {
		T entity = find(id);
		if (entity != null) {
			remove(entity);
		}
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
			cqdv.where(cb.equal(cqdv.from(DescriptorValue.class).<String>get("code"), cl.getFieldValue()));
			DescriptorValue value = em.createQuery(cqdv).getSingleResult();

			// Используем в нашем условии
			expr = cb.and(expr, cb.equal(root.<Long>get(cl.getFieldName()), value.getId()));
		}
		cq.where(expr);
		return em.createQuery(cq).getResultList();
	}

	/**
	 * Находит сущность с заданными параметрами. Искать нужно только по
	 * уникальным ключам, т.е. предполагается, что если есть сущность с
	 * заданными параметрами, то она одна.
	 *
	 * @param clauses условия поиска
	 * @return cущность либо null
	 */
	T findEntityWhereAnd(Clause[] clauses) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<T> cq = cb.createQuery(entityClass);
		Root<T> root = cq.from(entityClass);

		if (clauses.length > 0) {
			Predicate expr = cb.equal(root.<String>get(clauses[0].getFieldName()),
				clauses[0].getFieldValue());
			for (int i = 0; i < clauses.length; ++i) {
				expr = cb.and(expr, cb.equal(root.get(clauses[i].getFieldName()),
					clauses[i].getFieldValue()));
			}
			cq.where(expr);
			return em.createQuery(cq).getSingleResult();
		} else { // без условий не работаем
			return null;
		}
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

	/**
	 * Удаляет все файлы принадлежащие ответу, когда удаляем {@code Execution}
	 *
	 * @param id идентификатор запроса
	 */
	void removeAttachedFiles(Long id) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AttachedFile> cq = cb.createQuery(AttachedFile.class);

		CriteriaQuery<DescriptorValue> cqdv = cb.createQuery(DescriptorValue.class);
		cqdv.where(cb.equal(cqdv.from(DescriptorValue.class).<String>get("code"), "Q_VALUE_FILE_TYPE_ANSWER"));
		Long typeId = em.createQuery(cqdv).getSingleResult().getId();

		Root<AttachedFile> root = cq.from(AttachedFile.class);
		cq.where(cb.and(cb.equal(root.<Long>get("type"), typeId), cb.equal(root.<Long>get("question"), id)));
		for (AttachedFile file : em.createQuery(cq).getResultList()) {
			em.remove(file);
		}
	}
}
