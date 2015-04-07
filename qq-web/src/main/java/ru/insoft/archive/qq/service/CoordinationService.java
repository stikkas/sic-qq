package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Path;
import org.codehaus.jackson.map.ObjectMapper;
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

	@Inject
	protected void setMapper(ObjectMapper om) {
		this.om = om;
	}
}
