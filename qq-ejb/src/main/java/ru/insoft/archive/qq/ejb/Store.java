package ru.insoft.archive.qq.ejb;

import java.util.HashMap;
import java.util.Map;
import javax.annotation.PostConstruct;
import javax.ejb.Lock;
import javax.ejb.LockType;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Класс для хранения часто используемых значений справочников. Используется
 * Singleton вместо SessionScoped из соображений что если добавили новый код
 * справочника, то мы его все равно использовать не можем, пока не изменим
 * исходный код приложения.
 *
 * @author Благодатских С.
 */
@Singleton
public class Store {

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	private Map<String, Long> codeToId;

	@PostConstruct
	private void init() {
		codeToId = new HashMap<>();
		fillGroupIds();
		fillDescriptorIds();
	}

	private void fillGroupIds() {
		for (String code : new String[]{DictCodes.ORG_STRUCTURE,
			DictCodes.Q_DICT_APP_CATEGORY, DictCodes.Q_DICT_DOC_TYPES,
			DictCodes.Q_DICT_DELIVERY_METHOD, DictCodes.Q_DICT_STORAGE,
			DictCodes.Q_DICT_RESULT_ANSER, DictCodes.Q_DICT_THEMATIC_ANSW,
			DictCodes.Q_DICT_DIFF_CATEGORY, DictCodes.Q_DICT_FILE_TYPE,
			DictCodes.Q_DICT_QUESTION_STATUSES, DictCodes.Q_DICT_ANSWER_FORM,
			DictCodes.Q_DICT_QUEST_TYPE, DictCodes.QQ_TRANSMISSION_MODE,
			DictCodes.Q_DICT_NOTIFY_STATUSES, DictCodes.Q_DICT_APPLICANT_TYPE}) {
			codeToId.put(code, getGroupIdByCode(code));
		}
	}

	private void fillDescriptorIds() {
		for (String code : new String[]{DictCodes.Q_VALUE_MEMBER_SIC,
			DictCodes.Q_VALUE_MEMBER_GARF, DictCodes.Q_VALUE_MEMBER_RGANTD,
			DictCodes.Q_VALUE_MEMBER_RGAE, DictCodes.Q_VALUE_MEMBER_RGALI,
			DictCodes.Q_VALUE_MEMBER_RGASPI, DictCodes.Q_VALUE_MEMBER_RGANI,
			DictCodes.Q_VALUE_MEMBER_RGBA, DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS,
			DictCodes.Q_VALUE_FILE_TYPE_ANSWER, DictCodes.Q_VALUE_FILE_TYPE_INFO,
			DictCodes.Q_VALUE_QSTAT_ONEXEC, DictCodes.Q_VALUE_QSTAT_EXEC,
			DictCodes.Q_VALUE_QSTAT_REG, DictCodes.Q_VALUE_QSTAT_ONREG,
			DictCodes.Q_VALUE_NOTIFY_NOEXEC, DictCodes.Q_VALUE_NOTIFY_EXEC,
			DictCodes.Q_VALUE_NOTIFY_SEND, DictCodes.Q_VALUE_NOTIFY_NONE}) {
			codeToId.put(code, getDescriptorIdByCode(code));
		}
	}

	private Long getGroupIdByCode(String code) {
		return em.createNamedQuery("DescriptorGroup.idByCode", Long.class)
				.setParameter("code", code).getSingleResult();
	}

	private Long getDescriptorIdByCode(String code) {
		return em.createNamedQuery("DescriptorValue.idByCode", Long.class)
				.setParameter("code", code).getSingleResult();
	}

	@Lock(LockType.READ)
	public Long getIdByCode(String code) {
		return codeToId.get(code);
	}
}
