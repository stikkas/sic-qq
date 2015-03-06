package ru.insoft.archive.qq.service;

import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import ru.insoft.archive.qq.dao.DictDao;
import ru.insoft.archive.qq.dto.DictDto;
import ru.insoft.archive.qq.dto.DictSVDto;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.CoreParameter;

/**
 * Точка доступа для справочников.
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("dict")
public class DictService {

	@Inject
	DictDao dvd;

	@Inject
	UserProfile up;

	/**
	 * Возвращает список состояний запроса
	 *
	 * @return справочник
	 */
	@GET
	@Path("statuses")
	public List<DictSVDto> getQuestionStatuses() {
		return dvd.getFullCodeValues(DictCodes.Q_DICT_QUESTION_STATUSES);
	}

	/**
	 * Возвращает список организаций (архивов) и их сокращений (литер). Для СИЦ
	 * возвращается полный справочник, для архива - СИЦ и этот архив.
	 *
	 * @return справочник
	 */
	@GET
	@Path("litera")
	public List<DictSVDto> getOrganizations() {
		return up.isSic() ? dvd.getFullShortValues(DictCodes.ORG_STRUCTURE)
				: dvd.getLiterasArchive(up.getOrganization());
	}

	/**
	 * Возвращает список пользователей с правом исполнителя
	 *
	 * @return справочник
	 */
	@GET
	@Path("executors")
	public List<DictDto> getExecutors() {
		return dvd.getUsersWithRule("Q_RULE_EXECUTOR");
	}

	/**
	 * Возвращает список типов запросов и их сокращения
	 *
	 * @return справочник
	 */
	@GET
	@Path("questiontypes")
	public List<DictSVDto> getQuestionTypes() {
		return dvd.getFullShortValues(DictCodes.Q_DICT_QUEST_TYPE);
	}

	/**
	 * Возвращает список значений статусов уведомления
	 *
	 * @return справочник
	 */
	@GET
	@Path("notistats")
	public List<DictSVDto> getNotiStats() {
		return dvd.getFullCodeValues(DictCodes.Q_DICT_NOTIFY_STATUSES);
	}

	/**
	 * Возвращает список параметров настройки системы. В частности где лежат
	 * статические файлы.
	 *
	 * @param codes список интересующих параметров
	 * @return справочник
	 */
	@GET
	@Path("coreparameter")
	public List<CoreParameter> getCoreParams(@QueryParam("code") List<String> codes) {
		return dvd.getCoreParams(codes);
	}

}
