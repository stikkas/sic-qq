package ru.insoft.archive.qq.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.Coordination;

@ru.insoft.archive.qq.qualifier.Coordination
@Stateless
public class CoordinationDao extends AbstractDao implements TableDao<Coordination> {

	/**
	 * Возвращает согласование документа для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив согласований
	 */
	@Override
	public List<Coordination> find(Long questionId) {
		return em.createNamedQuery("Coordination.coorByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет согласование документа для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	@Override
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
	@Override
	public List<Coordination> update(List<Coordination> actions, Long questionId) {
		List<Coordination> oldies = find(questionId);
		for (Coordination action : actions) {
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

			for (Coordination coor : oldies) {
				ids.add(coor.getId());
			}
			em.createNamedQuery("Coordination.delCoorByIds")
					.setParameter("ids", ids).executeUpdate();
		}
		return actions;
	}

}
