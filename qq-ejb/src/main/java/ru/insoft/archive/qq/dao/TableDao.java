package ru.insoft.archive.qq.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.entity.TableEntity;

/**
 * Общий класс для объектов доступа к табличным данным, таким как "Используемые
 * материалы" и т.п. Все таблицы находятся на вкладке "Исполнение запроса"
 *
 * @author Благодатских С.
 * @param <T> Тип сущности, с которой имеет дело реализующий класс
 */
public abstract class TableDao<T extends TableEntity> {

	@PersistenceContext(unitName = "SicEntityManager")
	protected EntityManager em;
	/**
	 * Название именованного запроса для поиска по идентификатору запроса.
	 */
	protected String searchQuery;
	/**
	 * Название именованного запроса для удаления по идентификатору запроса.
	 */
	protected String delByQuestionIdQuery;
	/**
	 * Название именованного запроса для удаления по идентификаторам сущностей.
	 */
	protected String delByIdsQuery;

	/**
	 * Возвращает сущности для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив способов отправки
	 */
	public List<T> find(Long questionId) {
		return em.createNamedQuery(searchQuery)
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет сущности для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	public void remove(Long questionId) {
		em.createNamedQuery(delByQuestionIdQuery)
				.setParameter("id", questionId)
				.executeUpdate();
	}

	/**
	 * Обновляет список сущностей для определенного запроса
	 *
	 * @param items список сущностей для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<T> update(List<T> items, Long questionId) {
		List<T> oldies = find(questionId);
		for (T item : items) {
			item.setQid(questionId);
			if (item.getId() == null) {
				em.persist(item);
			} else {
				em.merge(item);
			}
			oldies.remove(item);
		}

		if (!oldies.isEmpty()) {
			// Удаляем старые
			Set<Long> ids = new HashSet<>();

			for (T item : oldies) {
				ids.add(item.getId());
			}
			em.createNamedQuery(delByIdsQuery)
					.setParameter("ids", ids).executeUpdate();
		}
		return items;
	}
}
