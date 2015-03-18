package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Path;
import ru.insoft.archive.qq.dao.TableDao;
import ru.insoft.archive.qq.entity.Coordination;

/**
 * класс для работы с таблицей "Согласование документа"
 *
 * @author Благодатских С.
 */
@Path("coordination")
public class CoordinationService extends TableService<Coordination> {

	@Inject
	@ru.insoft.archive.qq.qualifier.Coordination
	private TableDao<Coordination> cd;

	@Override
	protected TableDao<Coordination> getDao() {
		return cd;
	}

	@Override
	protected Class<Coordination[]> getArrayClass() {
		return Coordination[].class;
	}

}
