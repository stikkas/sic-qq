package ru.insoft.archive.qq.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.DeliveryAction;

@ru.insoft.archive.qq.qualifier.DeliveryAction
@Stateless
public class DeliveryActionDao extends AbstractDao implements TableDao<DeliveryAction> {

	/**
	 * Возвращает способы выдачи документов для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив способов отправки
	 */
	@Override
	public List<DeliveryAction> find(Long questionId) {
		return em.createNamedQuery("DeliveryAction.actionByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет способы выдачи документов для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	@Override
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
	@Override
	public List<DeliveryAction> update(List<DeliveryAction> actions, Long questionId) {
		List<DeliveryAction> oldies = find(questionId);
		for (DeliveryAction action : actions) {
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

			for (DeliveryAction ac : oldies) {
				ids.add(ac.getId());
			}
			em.createNamedQuery("DeliveryAction.delActionByIds")
					.setParameter("ids", ids).executeUpdate();
		}
		return actions;
	}

}
