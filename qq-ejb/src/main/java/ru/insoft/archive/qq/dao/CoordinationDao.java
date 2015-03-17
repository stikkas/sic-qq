package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.Coordination;

@Stateless
public class CoordinationDao extends AbstractDao {

	/**
	 * Возвращает согласование документа для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив согласований
	 */
	public List<Coordination> find(Long questionId) {
		return em.createNamedQuery("Coordination.coorByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет согласование документа для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	public void remove(Long questionId) {
		em.createNamedQuery("Coordination.delCoorByQid")
				.setParameter("id", questionId)
				.executeUpdate();
	}

	/**
	 * Обновляет согласования документа для определенного запроса
	 *
	 * @param actions список согласований для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<Coordination> update(List<Coordination> actions, Long questionId) {
		remove(questionId);
		return create(actions, questionId);
	}

	/**
	 * Создает список согласований для определенного запроса
	 *
	 * @param actions список согласований для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<Coordination> create(List<Coordination> actions, Long questionId) {
		for (Coordination action : actions) {
			action.setQid(questionId);
			em.persist(action);
		}
		return actions;
	}
}
