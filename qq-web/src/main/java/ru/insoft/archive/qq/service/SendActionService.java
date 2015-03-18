package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Path;
import ru.insoft.archive.qq.dao.TableDao;
import ru.insoft.archive.qq.entity.SendAction;

/**
 * Класс для работы с таблицей "Способы отправки"
 *
 * @author Благодатских С.
 */
@Path("sendaction")
public class SendActionService extends TableService<SendAction> {

	@Inject
	@ru.insoft.archive.qq.qualifier.SendAction
	private TableDao<SendAction> sa;

	@Override
	protected TableDao<SendAction> getDao() {
		return sa;
	}

	@Override
	protected Class<SendAction[]> getArrayClass() {
		return SendAction[].class;
	}
}
