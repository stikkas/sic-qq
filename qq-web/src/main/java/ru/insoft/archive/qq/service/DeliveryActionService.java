package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Path;
import ru.insoft.archive.qq.dao.TableDao;
import ru.insoft.archive.qq.entity.DeliveryAction;

/**
 * Класс для работы с таблицей "Выдача документов"
 *
 * @author Благодатских С.
 */
@Path("delaction")
public class DeliveryActionService extends TableService<DeliveryAction>{

	@Inject
	@ru.insoft.archive.qq.qualifier.DeliveryAction
	private TableDao<DeliveryAction> da;

	@Override
	protected TableDao<DeliveryAction> getDao() {
		return da;
	}

	@Override
	protected Class<DeliveryAction[]> getArrayClass() {
		return DeliveryAction[].class;
	}

}
