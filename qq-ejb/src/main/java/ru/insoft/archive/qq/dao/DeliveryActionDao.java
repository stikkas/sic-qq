package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.DeliveryAction;

@Stateless
public class DeliveryActionDao extends AbstractDao {

	/**
	 * Возвращает способы выдачи документов для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив способов отправки
	 */
	public List<DeliveryAction> find(Long questionId) {
		return em.createNamedQuery("DeliveryAction.actionByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет способы выдачи документов для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	public void remove(Long questionId) {
		em.createNamedQuery("DeliveryAction.delActionByQid")
				.setParameter("id", questionId)
				.executeUpdate();
	}

	/**
	 * Обновляет список выдачи документов для определенного запроса
	 *
	 * @param actions список способов для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<DeliveryAction> update(List<DeliveryAction> actions, Long questionId) {
		remove(questionId);
		return create(actions, questionId);
	}

	/**
	 * Создает список выдачи документов для определенного запроса
	 *
	 * @param actions список способов для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<DeliveryAction> create(List<DeliveryAction> actions, Long questionId) {
		for (DeliveryAction action : actions) {
			action.setQid(questionId);
			em.persist(action);
		}
		return actions;
	}
}