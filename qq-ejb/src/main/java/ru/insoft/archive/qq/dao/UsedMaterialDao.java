package ru.insoft.archive.qq.dao;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.UsedMaterial;

@ru.insoft.archive.qq.qualifier.UsedMaterial
@Stateless
public class UsedMaterialDao extends AbstractDao implements TableDao<UsedMaterial> {

	/**
	 * Возвращает используемые материалы для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив используемых материалов
	 */
	@Override
	public List<UsedMaterial> find(Long questionId) {
		return em.createNamedQuery("UsedMaterial.materialByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет используемые материалы для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
	@Override
	public void remove(Long questionId) {
		em.createNamedQuery("UsedMaterial.delMaterialByQid")
				.setParameter("id", questionId)
				.executeUpdate();
	}

	/**
	 * Обновляет список материалов для определенного запроса
	 *
	 * @param materials список материалов для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	@Override
	public List<UsedMaterial> update(List<UsedMaterial> materials, Long questionId) {
		List<UsedMaterial> oldies = find(questionId);
		for (UsedMaterial material : materials) {
			material.setQid(questionId);
			if (material.getId() == null) {
				em.persist(material);
			} else {
				em.merge(material);
			}
			oldies.remove(material);
		}

		if (!oldies.isEmpty()) {
			// Удаляем старые
			Set<Long> ids = new HashSet<>();

			for (UsedMaterial mat : oldies) {
				ids.add(mat.getId());
			}
			em.createNamedQuery("UsedMaterial.delActionByIds")
					.setParameter("ids", ids).executeUpdate();
		}
		return materials;
	}

}
