package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Path;
import ru.insoft.archive.qq.dao.TableDao;
import ru.insoft.archive.qq.entity.UsedMaterial;

/**
 * Класс для работы с таблицей "Используемые материалы"
 * @author Благодатских С.
 */
@Path("usedmaterial")
public class UsedMaterialService extends TableService<UsedMaterial>{

	@Inject
	@ru.insoft.archive.qq.qualifier.UsedMaterial
	private TableDao<UsedMaterial> um;

	@Override
	protected TableDao<UsedMaterial> getDao() {
		return um;
	}

	@Override
	protected Class<UsedMaterial[]> getArrayClass() {
		return UsedMaterial[].class;
	}


}
