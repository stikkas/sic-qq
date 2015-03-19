package ru.insoft.archive.qq.dao;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.UsedMaterial;

/**
 * Обрабатывает запросы создания, обновления и удаления используемых материалов.
 *
 * @author Благодатских С.
 */
@ru.insoft.archive.qq.qualifier.UsedMaterial
@Stateless
public class UsedMaterialDao extends TableDao<UsedMaterial> {

	@PostConstruct
	private void init() {
		searchQuery = "UsedMaterial.materialByQid";
		delByQuestionIdQuery = "UsedMaterial.delMaterialByQid";
		delByIdsQuery = "UsedMaterial.delMaterialByIds";
	}
}
