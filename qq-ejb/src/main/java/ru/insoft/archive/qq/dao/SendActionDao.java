package ru.insoft.archive.qq.dao;

import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.SendAction;

/**
 * Обрабатывает запросы создания, обновления и удаления способов отправки ответа.
 *
 * @author Благодатских С.
 */
@ru.insoft.archive.qq.qualifier.SendAction
@Stateless
public class SendActionDao extends TableDao<SendAction> {

	@PostConstruct
	private void init() {
		searchQuery = "SendAction.actionByQid";
		delByQuestionIdQuery = "SendAction.delActionByQid";
		delByIdsQuery = "SendAction.delActionByIds";
	}

}
