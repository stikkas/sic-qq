package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.UsedMaterial;

@Stateless
public class UsedMaterialDao extends AbstractDao {

	/**
	 * Возвращает используемые материалы для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 * @return массив используемых материалов
	 */
	public List<UsedMaterial> find(Long questionId) {
		return em.createNamedQuery("UsedMaterial.materialByQid")
				.setParameter("id", questionId).getResultList();
	}

	/**
	 * Удаляет используемые материалы для определенного запроса
	 *
	 * @param questionId идентификатор запроса
	 */
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
	public List<UsedMaterial> update(List<UsedMaterial> materials, Long questionId) {
		remove(questionId);
		return create(materials, questionId);
	}

	/**
	 * Создает список материалов для определенного запроса
	 *
	 * @param materials список материалов для вставки
	 * @param questionId идентификатор запроса
	 * @return Обновленный список
	 */
	public List<UsedMaterial> create(List<UsedMaterial> materials, Long questionId) {
		for (UsedMaterial material : materials) {
			material.setQid(questionId);
			em.persist(material);
		}
		return materials;
	}
}
