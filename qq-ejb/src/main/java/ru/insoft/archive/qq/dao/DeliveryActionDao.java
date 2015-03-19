package ru.insoft.archive.qq.dao;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.DeliveryAction;
/**
 * Обрабатывает запросы создания, обновления и удаления выдачи документов.
 *
 * @author Благодатских С.
 */
@ru.insoft.archive.qq.qualifier.DeliveryAction
@Stateless
public class DeliveryActionDao extends  TableDao<DeliveryAction> {

	@PostConstruct
	private void init() {
		searchQuery = "DeliveryAction.actionByQid";
		delByQuestionIdQuery = "DeliveryAction.delActionByQid";
		delByIdsQuery = "DeliveryAction.delActionByIds";
	}

}
