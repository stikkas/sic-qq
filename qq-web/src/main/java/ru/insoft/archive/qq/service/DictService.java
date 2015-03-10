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
	 * Возвращает список пользователей определенного архива с правом исполнителя
	 *
	 * @return справочник
	 */
	@GET
	@Path("executors")
	public List<DictDto> getExecutors() {
		return dvd.getUsersWithRule(DictCodes.Q_RULE_EXECUTOR, up.getOrganization());
	}

	/**
	 * Возвращает список пользователей всех архивов с правом исполнителя
	 *
	 * @return справочник
	 */
	@GET
	@Path("allexecutors")
	public List<DictDto> getAllExecutors() {
		return dvd.getUsersWithRule(DictCodes.Q_RULE_EXECUTOR);
	}

	/**
	 * Возвращает список пользователей всех архивов с правом регистратора
	 *
	 * @return справочник
	 */
	@GET
	@Path("regusers")
	public List<DictDto> getRegistrators() {
		return dvd.getUsersWithRule(DictCodes.Q_RULE_REGISTRATOR);
	}

	/**
	 * Возвращает список типов запросов и их сокращения
	 *
	 * @return справочник
	 */
	@GET
	@Path("querytypes")
	public List<DictSVDto> getQuestionTypes() {
		return dvd.getFullShortValues(DictCodes.Q_DICT_QUEST_TYPE);
	}

	/**
	 * Возвращает список форм выдачи ответов
	 *
	 * @return справочник
	 */
	@GET
	@Path("sendtypes")
	public List<DictDto> getSendTypes() {
		return dvd.getFullValues(DictCodes.Q_DICT_ANSWER_FORM);
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
	 * Возвращает список типов заявителей (юридическое, физическое лицо)
	 *
	 * @return справочник
	 */
	@GET
	@Path("applicantypes")
	public List<DictSVDto> getApplicants() {
		return dvd.getFullCodeValues(DictCodes.Q_DICT_APPLICANT_TYPE);
	}

	/**
	 * Возвращает список результатов ответа
	 *
	 * @return справочник
	 */
	@GET
	@Path("resultanswer")
	public List<DictSVDto> getResultAnswer() {
		return dvd.getFullCodeValues(DictCodes.Q_DICT_RESULT_ANSER);
	}

	/**
	 * Возвращает список категорий заявителей
	 *
	 * @return справочник
	 */
	@GET
	@Path("applicantcategory")
	public List<DictDto> getAppCategories() {
		return dvd.getFullValues(DictCodes.Q_DICT_APP_CATEGORY);
	}

	/**
	 * Возвращает список способов передачи
	 *
	 * @return справочник
	 */
	@GET
	@Path("docdeliverytype")
	public List<DictDto> getDocDeliveryType() {
		return dvd.getFullValues(DictCodes.QQ_TRANSMISSION_MODE);
	}

	/**
	 * Возвращает список типов документов
	 *
	 * @return справочник
	 */
	@GET
	@Path("doctype")
	public List<DictDto> getDocType() {
		return dvd.getFullValues(DictCodes.Q_DICT_DOC_TYPES);
	}

	/**
	 * Возвращает список хранилищ документов
	 *
	 * @return справочник
	 */
	@GET
	@Path("storages")
	public List<DictDto> getStorageTerritory() {
		return dvd.getFullValues(DictCodes.Q_DICT_STORAGE);
	}

	/**
	 * Возвращает список хранилищ документов
	 *
	 * @return справочник
	 */
	@GET
	@Path("answertematic")
	public List<DictDto> getAnswerTematic() {
		return dvd.getFullValues(DictCodes.Q_DICT_THEMATIC_ANSW);
	}
	/**
	 * Возвращает список категорий сложности
	 *
	 * @return справочник
	 */
	@GET
	@Path("difcategory")
	public List<DictDto> getDifCategory() {
		return dvd.getFullValues(DictCodes.Q_DICT_DIFF_CATEGORY);
	}
	/**
	 * Возвращает список этапов соглосования документа
	 *
	 * @return справочник
	 */
	@GET
	@Path("coorstage")
	public List<DictDto> getCoordinationStage() {
		return dvd.getFullValues(DictCodes.Q_DICT_THE_EHDORSEMENT);
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
