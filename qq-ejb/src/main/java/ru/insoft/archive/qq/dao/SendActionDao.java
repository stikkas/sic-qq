package ru.insoft.archive.qq.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.SendAction;

/**
 *
 * @author Благодатских С.
 */
@ru.insoft.archive.qq.qualifier.SendAction
@Stateless
public class SendActionDao extends AbstractDao implements TableDao<SendAction> {

	/**
	 * Возвращает способы отправки для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив способов отправки
	 */
	@Override
	public List<SendAction> find(Long questionId) {
		return em.createNamedQuery("SendAction.actionByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет способы отправки для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	@Override
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
	@Override
	public List<SendAction> update(List<SendAction> actions, Long questionId) {
		List<SendAction> oldies = find(questionId);
		for (SendAction action : actions) {
			action.setQid(questionId);
			if (action.getId() == null) {
				em.persist(action);
			} else {
				em.merge(action);
			}
			oldies.remove(action);
		}

		if (!oldies.isEmpty()) {
			// Удаляем старые
			Set<Long> ids = new HashSet<>();

			for (SendAction ac : oldies) {
				ids.add(ac.getId());
			}
			em.createNamedQuery("SendAction.delActionByIds")
					.setParameter("ids", ids).executeUpdate();
		}
		return actions;
	}

}
