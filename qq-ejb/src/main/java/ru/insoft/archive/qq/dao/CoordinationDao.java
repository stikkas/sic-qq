package ru.insoft.archive.qq.dao;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.Coordination;

/**
 * Обрабатывает запросы создания, обновления и удаления согласования документов.
 *
 * @author Благодатских С.
 */
@ru.insoft.archive.qq.qualifier.Coordination
@Stateless
public class CoordinationDao extends TableDao<Coordination> {

	@PostConstruct
	private void init() {
		searchQuery = "Coordination.coorByQid";
		delByQuestionIdQuery = "Coordination.delCoorByQid";
		delByIdsQuery = "Coordination.delCoorByIds";
	}

}
