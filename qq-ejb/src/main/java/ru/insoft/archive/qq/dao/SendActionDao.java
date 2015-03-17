package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.SendAction;

/**
 *
 * @author Благодатских С.
 */
@Stateless
public class SendActionDao extends AbstractDao {

	/**
	 * Возвращает способы отправки для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив способов отправки
	 */
	public List<SendAction> find(Long questionId) {
		return em.createNamedQuery("SendAction.actionByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет способы отправки для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	public void remove(Long questionId) {
		em.createNamedQuery("SendAction.delActionByQid")
				.setParameter("id", questionId)
				.executeUpdate();
	}

	/**
	 * Обновляет список способов для определенного запроса
	 *
	 * @param actions список способов для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<SendAction> update(List<SendAction> actions, Long questionId) {
		remove(questionId);
		return create(actions, questionId);
	}

	/**
	 * Создает список способов для определенного запроса
	 *
	 * @param actions список способов для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<SendAction> create(List<SendAction> actions, Long questionId) {
		for (SendAction action : actions) {
			action.setQid(questionId);
			em.persist(action);
		}
		return actions;
	}

}
