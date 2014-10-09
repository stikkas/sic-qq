package ru.insoft.archive.qq.ejb;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import ru.insoft.archive.core_model.table.adm.AdmAccessRule;
import ru.insoft.archive.core_model.table.core.CoreParameter;
import ru.insoft.archive.core_model.table.core.CoreSubsystem;
import ru.insoft.archive.core_model.table.desc.DescriptorGroup;
import ru.insoft.archive.core_model.table.desc.DescriptorGroupAttr;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.core_model.table.desc.DescriptorValueAttr;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;

@Singleton
@Startup
@TransactionManagement(TransactionManagementType.CONTAINER)
public class Placeholder implements Constants {

	/**
	 * Роли, которые должны присутсвовать в системе
	 */
	private static final String[][] requiredRules = {
		// Пользователем не имеющим данную роль запрещен вход в систему
		{"Q_RULE_USER", "Пользователь подсистемы"},
		{"Q_RULE_REGISTRATOR", "Регистратор"},
		{"Q_RULE_COORDINATOR", "Координатор"},
		{"Q_RULE_EXECUTOR", "Исполнитель"}
	};

	@EJB
	private CommonDBHandler cdbh;

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;

	private Logger logger;

	public Placeholder() {
		logger = Logger.getLogger(this.getClass().getName());
	}

	@PreDestroy
	public void preDestroy() {
		logger.fine("pre destroy()");
	}

	/**
	 * Этот мегаметод выполняет работу по инициализации справочников и их
	 * значений
	 */
	@PostConstruct
	public void init() {
		logger.fine("Инициализация справочников подсистемы QQ..");
		if (!isWorkNeeded()) {
			logger.fine("Инициализация не требуется, справочники и значения созданы ранее");
			return;
		}
		// try{
		initSubsystemNumb();
		logger.fine("Инициализация справочника: Способ передачи");
		initModeOfTransmission();

		logger.fine("Инициализация справочника: Вид запроса");
		initQuestionType();
		logger.fine("Инициализация справочника: Форма выдачи ответа");
		initAnswerForm();
		logger.fine("Инициализация справочника: Тип заявителя");
		initApplicantType();
		logger.fine("Инициализация справочника: Категория заявителя");
		initApplicantCategory();
		logger.fine("Инициализация справочника: Тип документов");
		initDocTypes();
		logger.fine("Инициализация справочника: Этап согласования документа");
		initTheEndorsement();
		logger.fine("Инициализация справочника: Способ отправки");
		initDeliveryMethod();
		logger.fine("Инициализация справочника: Территория хранилища");
		initStorage();
		logger.fine("Инициализация справочника: Результат ответа");
		initAnswerResult();
		logger.fine("Инициализация справочника: Тематика ответа");
		initThematicAnswer();
		logger.fine("Инициализация справочника: Категория сложности");
		initDifficultCategory();
		logger.fine("Инициализация справочника: Тип элемента организационной структуры");
		initOrgStrucureType();
		logger.fine("Инициализация справочника: Организационная структура");
		initMembers();
		logger.fine("Инициализация справочника: Тип прикрепленного файла");
		initAttachedFileTypes();
		logger.fine("Инициализация справочника: состояния запроса");
		initQuestionStatuses();
		logger.fine("Создание справочников и значений успешно завершено");
		logger.fine("Инициализация ролей подсистемы");
		initRoles();
		fixEnd();
	}

	/**
	 * Создает роль в системе, если ее еще нет. Используется при иницализации
	 * системы.
	 *
	 * @param code код роли
	 * @param name описание роли
	 */
	private void createRuleIfNotExists(String code, String name) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmAccessRule> cq = cb.createQuery(AdmAccessRule.class);
		Root from = cq.from(AdmAccessRule.class);
		cq.where(cb.and(cb.equal(from.get("subsystem"), subsystemNumb),
			cb.equal(from.get("code"), code)));
		if (em.createQuery(cq).getResultList().isEmpty()) {
			logger.log(Level.FINE, "Роль {0} не существует", code);
			Long id = getMaxId(AdmAccessRule.class);
			++id;
			AdmAccessRule r = new AdmAccessRule();
			r.setAccessRuleId(id);
			r.setCode(code);
			r.setName(name);
			r.setSubsystem(subsystemNumb);
			em.merge(r);
			logger.log(Level.FINE, "Создана роль {0}", code);
		} else {
			logger.log(Level.FINE, "Роль {0} уже существует в бд", code);
		}
	}

	/**
	 * Создает минимальный набор ролей, без которого работа не возможна
	 */
	private void initRoles() {
		for (String[] role : requiredRules) {
			createRuleIfNotExists(role[0], role[1]);
		}
	}

	/**
	 * Инициализация номера подсистемы
	 */
	private void initSubsystemNumb() {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<CoreSubsystem> cq = cb.createQuery(CoreSubsystem.class);
		Root<CoreSubsystem> root = cq.from(CoreSubsystem.class);
		cq.where(cb.equal(root.get("code"), SUBSYSTEM_QQ));
		Query q = em.createQuery(cq);
		if (!q.getResultList().isEmpty()) {
			subsystemNumb = ((CoreSubsystem) q.getResultList().get(0)).getId();
			logger.fine("Запись найдена в таблице подсистем");
		} else {
			logger.fine("Запись в таблице подсистем не найдена. Создаю запись");
			CriteriaQuery<Object> criteriaQuery = cb.createQuery();
			Root from = criteriaQuery.from(CoreSubsystem.class);
			criteriaQuery.select(cb.max(from.get("id"))).from(
				CoreSubsystem.class);
			Query qq = em.createQuery(criteriaQuery);
			Integer maxId = (Integer) qq.getSingleResult();
			Integer curId = maxId + 1;
			curId += 1;
			CoreSubsystem cs = new CoreSubsystem();
			cs.setCode(SUBSYSTEM_QQ);
			cs.setId(curId);
			cs.setName("АС \"Запросы\"");
			em.merge(cs);
			subsystemNumb = cs.getId();
		}
	}

	private void fixEnd() {
		CoreParameter cp = new CoreParameter();
		cp.setCode(Q_PARAM_DB_READY_FLAG_CODE);
		cp.setDescription("Флаг корректной инициализации схемы");
		cp.setSubsystem(subsystemNumb);
		cp.setValue(new Date().toString());
		cp.setName("Флаг успешной инициализации справочников");
		em.merge(cp);
		logger.fine("Установка флага успешной инициализации справочников выполнена успешно");
	}

	/**
	 * Проверка необходимости выполнения операции по созданию справочников и их
	 * значений. (По флагу в CORE_PARAMETER).
	 *
	 * @return
	 */
	public boolean isWorkNeeded() {
		String flagParamValue = cdbh
			.getCoreParameterValue(Constants.Q_PARAM_DB_READY_FLAG_CODE);
		return flagParamValue == null;
	}

	private Integer subsystemNumb;
	private Integer groupSortOrder = 0;

	private Long getMaxId(Class cl) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Object> cq = cb.createQuery();
		Root from = cq.from(cl);

		String idColumn = "id";
		if (cl == AdmAccessRule.class) {
			idColumn = "accessRuleId";
		}
		cq.select(cb.max(from.get(idColumn)));
		Query q = em.createQuery(cq);
		Long l = (Long) q.getSingleResult();
		return l;
	}

	private DescriptorGroup getDescriptorGroup(String code, String name,
		Boolean shortValueSupported) {
		Long groupId;
		DescriptorGroup dg;
		try {
			groupId = cdbh.getDescGroupIdByCode(code);
		} catch (Exception e) {
			groupId = null;
		}
		if (groupId != null) {
			dg = em.find(DescriptorGroup.class, groupId);
		} else {
			dg = new DescriptorGroup();
			Long id = getMaxId(DescriptorGroup.class);
			id += 1;
			dg.setId(id);
			dg.setCode(code);
			dg.setAlphabeticSort(false);
			dg.setHierarchical(false);
			dg.setName(name);
			dg.setShortValueSupported(shortValueSupported);
			dg.setSortIndex(groupSortOrder);
			dg.setSubsystem(subsystemNumb);
			dg.setSystem(true);
			groupSortOrder++;
			em.merge(dg);
		}
		return dg;
	}

	private void makeDescriptorValues(LinkedHashMap<String, String> codeNames,
		DescriptorGroup group) {
		int sortIndex = 0;
		for (String key : codeNames.keySet()) {
			DescriptorValue v;
			v = cdbh.getDescValueByCodes(group.getCode(), key);
			if (v == null) {
				v = new DescriptorValue();
				v.setCode(key);
				v.setGroup(group);
				v.setGroupId(group.getId());
				v.setSortIndex(sortIndex);
				sortIndex++;
				v.setValue(codeNames.get(key));
				em.merge(v);
				logger.fine("Создание значения " + codeNames.get(key)
					+ " с кодом " + key + " в справочнике "
					+ group.getCode());
			}
		}
	}

	/**
	 * Инициализация справочника и значений: "Тип прикрепленного файла"
	 */
	private void initAttachedFileTypes() {
		DescriptorGroup dg2 = getDescriptorGroup(Q_DICT_FILE_TYPE,
			"Тип прикрепленного файла", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_FILE_TYPE_ANSWER, "Ответ");
		k.put(Q_VALUE_FILE_TYPE_APP_DOCS, "Документ заявителя");
		makeDescriptorValues(k, dg2);
	}

	/**
	 * Инициализация справочника и значений "Состояния запроса"
	 *
	 * @throws Exception
	 */
	private void initQuestionStatuses() {
		DescriptorGroup g = getDescriptorGroup(Q_DICT_QUESTION_STATUSES, "Состояния запроса", false);
		LinkedHashMap<String, String> kput = new LinkedHashMap<>();
		kput.put(Q_VALUE_QSTAT_REG, "Регистрация");
		kput.put(Q_VALUE_QSTAT_REGSEND, "Регистрация (отправлено)");
		kput.put(Q_VALUE_QSTAT_ONEXEC, "На исполнении");
		kput.put(Q_VALUE_QSTAT_EXECUTED, "Исполнено");
		kput.put(Q_VALUE_QSTAT_SENDED, "Отправлено");
		makeDescriptorValues(kput, g);
	}

	/**
	 * Создание и наполнение справочника "Способ передачи"
	 *
	 * @throws Exception
	 */
	private void initModeOfTransmission() {
		DescriptorGroup dg1 = getDescriptorGroup(Q_DICT_TRANSMISSION_MODE,
			"Способ передачи", false);
		LinkedHashMap<String, String> codeNameMap = new LinkedHashMap<>();
		codeNameMap.put(Constants.Q_VALUE_TRANSMISSION_CENTER, "Центр");
		codeNameMap.put(Constants.Q_VALUE_TRANSMISSION_EMAIL,
			"Электронная почта");
		codeNameMap.put(Constants.Q_VALUE_TRANSMISSION_FAX, "Факс");
		codeNameMap.put(Constants.Q_VALUE_TRANSMISSION_RUPOST, "Почта России");
		codeNameMap.put(Constants.Q_VALUE_TRANSMISSION_WWW, "Интернет");
		makeDescriptorValues(codeNameMap, dg1);
	}

	/**
	 * Создание и наполнение значениями справочника "вид запроса"
	 *
	 * @throws Exception
	 */
	private void initQuestionType() {
		DescriptorGroup group = getDescriptorGroup(Q_DICT_QUEST_TYPE,
			"Тип запроса", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_QUEST_TYPE_SOC, "Социально-правовой");
		k.put(Q_VALUE_QUEST_TYPE_TEMATIC, "Тематический");
		k.put(Q_VALUE_QUEST_TYPE_GENEALOGICAL, "Генеалогический");
		k.put(Q_VALUE_QUEST_TYPE_BIO, "Биографический");
		int sortIndex = 0;
		makeDescriptorValues(k, group);
	}

	/**
	 * Создание и заполнение справочника "Форма выдачи ответа"
	 *
	 * @throws Exception
	 */
	private void initAnswerForm() {
		DescriptorGroup group = getDescriptorGroup(Q_DICT_ANSWER_FORM,
			"Форма выдачи ответа", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_ANSWER_FORM_HAND, "На руки");
		k.put(Q_VALUE_ANSWER_FORM_POST, "Почтой");
		makeDescriptorValues(k, group);
	}

	/**
	 * Инициализация и заполнение значениями справочника "Тип заявителя"
	 *
	 * @throws Exception
	 */
	private void initApplicantType() {
		DescriptorGroup group = getDescriptorGroup(Q_DICT_APPLICANT_TYPE,
			"Тип заявителя", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<String, String>();
		k.put(Q_VALUE_APPLICANT_TYPE_FFACE, "Физическое лицо");
		k.put(Q_VALUE_APPLICANT_TYPE_JURFACE, "Юридическое лицо");
		makeDescriptorValues(k, group);
	}

	private void initApplicantCategory() {
		DescriptorGroup dg = getDescriptorGroup(Q_DICT_APPLICANT_CAT,
			"Категория заявителя", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_APP_CAT_RUSARCH, "Росархив");
		k.put(Q_VALUE_APP_CAT_USZN, "УСЗН");
		k.put(Q_VALUE_APP_CAT_PF, "ПФ");
		k.put(Q_VALUE_APP_CAT_ORGAN, "Органы гос. власти");
		k.put(Q_VALUE_APP_CAT_SELF_GOV, "Органы местного самоуправления");
		k.put(Q_VALUE_APP_CAT_LAW_ENF, "Правоохранительные органы");
		k.put(Q_VALUE_APP_CAT_JUDICIARY, "Судебные органы");
		k.put(Q_VALUE_APP_CAT_MFC, "МФЦ");
		k.put(Q_VALUE_APP_CAT_ARCHIVES, "Архивы");
		makeDescriptorValues(k, dg);
	}

	private void initDocTypes() {
		DescriptorGroup d = getDescriptorGroup(Q_DICT_DOC_TYPE,
			"Тип документов", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_DOC_TYPE_ARCH_COPY, "Архивные копии");
		k.put(Q_VALUE_DOC_TYPE_ARCH_EXTRACT, "Архивные выписки");
		k.put(Q_VALUE_DOC_TYPE_LETTER_PLUS,
			"Информационное письмо положительное");
		k.put(Q_VALUE_DOC_TYPE_LETTER_MINUS,
			"Информационное письмо отрицательное");
		k.put(Q_VALUE_DOC_TYPE_LETTER_RECOM,
			"Информационное письмо рекомендация");
		k.put(Q_VALUE_DOC_TYPE_LIST, "Перечень документов");
		makeDescriptorValues(k, d);
	}

	private void initTheEndorsement() {
		DescriptorGroup g = getDescriptorGroup(Q_DICT_THE_ENDORSEMENT,
			"Этап согласования документа", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_ENDORSEMENT_SIGNATURE, "Сдано на подпись");
		k.put(Q_VALUE_ENDORSEMENT_RETURN, "Возврат на доработку");
		k.put(Q_VALUE_ENDORSEMENT_REPEAT_SIGN, "Повторно сдано на подпись");
		makeDescriptorValues(k, g);
	}

	/**
	 * Создание справочника "Способ отправки" и его значений
	 *
	 * @throws Exception
	 */
	private void initDeliveryMethod() {
		DescriptorGroup g = getDescriptorGroup(Q_DICT_DELIVERY_METHOD,
			"Способ отправки", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_DEL_METHOD_HAND, "Выдан на руки");
		k.put(Q_VALUE_DEL_METHOD_POST, "Отправлен почтой");
		k.put(Q_VALUE_DEL_METHOD_FAX, "Отправлен факсом");
		makeDescriptorValues(k, g);
	}

	/**
	 * Сздание справочника "Территория хранилища" и его значений
	 *
	 * @throws Exception
	 */
	private void initStorage() {
		DescriptorGroup dg = getDescriptorGroup(Q_DICT_STORAGE,
			"Территория хранилища", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_STORAGE_PIROG, "ул. Б. Пироговская");
		k.put(Q_VALUE_STORAGE_PROFS, "ул. Профсоюзная");
		k.put(Q_VALUE_STORAGE_BEREZH, "Бережковская наб.");
		k.put(Q_VALUE_STORAGE_VORONO, "пос. Вороново");
		makeDescriptorValues(k, dg);
	}

	/**
	 * Инициализация справочника "Результат ответа"
	 *
	 * @throws Exception
	 */
	private void initAnswerResult() {
		DescriptorGroup g = getDescriptorGroup(Q_DICT_RESULT_ANSWER,
			"Результат ответа", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_RESULT_PLUS, "Положительный");
		k.put(Q_VALUE_RESULT_PLUS_PAID, "Положительный платный");
		k.put(Q_VALUE_RESULT_MINUS_PAID, "Отрицательный платный");
		k.put(Q_VALUE_RESULT_MINUS_NEPROF, "Отрицательный непрофильный");
		k.put(Q_VALUE_RESULT_MINUS_WVIEV, "Отрицательный с просмотром");
		k.put(Q_VALUE_RESULT_REDIRECT, "Переадресовка");
		k.put(Q_VALUE_RESULT_DOP_INFO, "Дополнительный сведения");
		k.put(Q_VALUE_RESULT_REJECTED, "Снят с исполнения");
		makeDescriptorValues(k, g);
	}

	/**
	 * Инициализация справочника "Тематика ответа" и его значений
	 *
	 * @throws Exception
	 */
	private void initThematicAnswer() {
		DescriptorGroup g = getDescriptorGroup(Q_DICT_THEMATIC_ANSW,
			"Тематика ответа", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_THEM_ZP, "Зарплата");
		k.put(Q_VALUE_THEM_EXPERIENCE, "Стаж");
		k.put(Q_VALUE_THEM_AWARD, "Награда");
		k.put(Q_VALUE_THEM_RENAME, "Переименование (реорганизация)");
		k.put(Q_VALUe_THEM_EVACUATION, "Эвакуация");
		k.put(Q_VALUE_THEM_CAMP, "Пребывание в лагерях");
		k.put(Q_VALUE_THEM_ARMY, "Военная служба");
		k.put(Q_VALUE_THEM_ADM_DIV, "Административное деление");
		k.put(Q_VALUE_THEM_SUNDRY, "Разное");
		makeDescriptorValues(k, g);
	}

	/**
	 * Инициализация справочника "Категория сложности" и его значений
	 *
	 * @throws Exception
	 */
	private void initDifficultCategory() {
		logger.fine("Инициализация справочника Категория сложности");
		DescriptorGroup g = getDescriptorGroup(Q_DICT_DIFF_CATEGORY,
			"Категория сложности", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_DIFF_CAT_I, "I");
		k.put(Q_VALUE_DIFF_CAT_II, "II");
		k.put(Q_VALUE_DIFF_CAT_III, "III");
		k.put(Q_VALUE_DIFF_CAT_IV, "IV");
		makeDescriptorValues(k, g);
	}

	private void initOrgStrucureType() {
		logger.fine("Инициализация справочника Тип элемента организационной структуры");
		DescriptorGroup g = getDescriptorGroup(Q_DICT_ORG_STRUCT_TYPE,
			"Тип элемента организационной структуры", false);
		LinkedHashMap<String, String> k = new LinkedHashMap<>();
		k.put(Q_VALUE_ORG_STRUCT_ARCHIVE, "Архив");
		k.put(Q_VALUE_ORG_STRUCT_DEP, "Структурное подразделение");
		k.put(Q_VALUE_ORG_STRUCT_MASTORG, "Вышестоящая организация");
		makeDescriptorValues(k, g);
	}

	private DescriptorGroupAttr createOrGetDescriptorGroupAttr(String code,
		String dataType, Long groupId, String name, Boolean required,
		Integer sortIndex) {
		CriteriaQuery<DescriptorGroupAttr> cq = em.getCriteriaBuilder()
			.createQuery(DescriptorGroupAttr.class);
		Root<DescriptorGroupAttr> from = cq.from(DescriptorGroupAttr.class);
		Predicate p1 = em.getCriteriaBuilder().equal(from.get("code"), code);
		Predicate p2 = em.getCriteriaBuilder().equal(from.get("groupId"),
			groupId);
		Predicate and = em.getCriteriaBuilder().and(p1, p2);
		cq.where(and);
		Query q = em.createQuery(cq);
		DescriptorGroupAttr typeAttr;
		if (q.getResultList().isEmpty()) {
			typeAttr = new DescriptorGroupAttr();
			Long id = getMaxId(DescriptorGroupAttr.class);
			id += 1;
			typeAttr.setId(id);
			typeAttr.setCode(code);
			typeAttr.setDatatype(dataType);
			typeAttr.setGroupId(groupId);
			typeAttr.setName(name);
			typeAttr.setRequired(required);
			typeAttr.setSortIndex(sortIndex);
			em.merge(typeAttr);
		} else {
			typeAttr = (DescriptorGroupAttr) q.getResultList().get(0);
		}
		return typeAttr;
	}

	/**
	 * Создание и инициализация значений справочника "Участник проекта"
	 *
	 */
	public void initMembers() {
		Long groupId;
		DescriptorGroup group;
		DescriptorGroupAttr letterAttr;
		DescriptorGroupAttr typeAttr;

		try {
			groupId = cdbh.getDescGroupIdByCode(Q_DICT_MEMBERS);
		} catch (Exception ex) {
			groupId = null;
		}
		if (groupId != null) {
			group = em.find(DescriptorGroup.class, groupId);
			letterAttr = createOrGetDescriptorGroupAttr("MEMBER_LETTER",
				"TEXT", group.getId(), "Литера", false, 0);
			typeAttr = createOrGetDescriptorGroupAttr("ORG_STRUCTURE_TYPE",
				"DESCRIPTOR", group.getId(),
				"Тип элемента организационной структуры", true, 1);
		} else {
			Long id = getMaxId(DescriptorGroup.class);
			id += 1;
			group = new DescriptorGroup();
			group.setId(id);
			group.setAlphabeticSort(false);
			group.setCode(Q_DICT_MEMBERS);
			group.setHierarchical(true);
			group.setName("Организационная структура");
			group.setShortValueSupported(true);
			group.setSortIndex(groupSortOrder);
			groupSortOrder++;
			// Системный справочник, относится к подсистеме
			// "Управление доступом", которая уже должна быть в бд.
			group.setSubsystem(1);
			group.setSystem(true);
			em.merge(group);
			letterAttr = createOrGetDescriptorGroupAttr("MEMBER_LETTER",
				"TEXT", group.getId(), "Литера", false, 0);
			typeAttr = createOrGetDescriptorGroupAttr("ORG_STRUCTURE_TYPE",
				"DESCRIPTOR", group.getId(),
				"Тип элемента организационной структуры", true, 1);
		}
		int sortIndex = 0;
		DescriptorValue sic = createMemberValue(group, Q_VALUE_MEMBER_SIC,
			"СИЦ", "СИЦ", "Справочно-информационный центр", sortIndex,
			letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_MASTORG, null);
		sortIndex++;

		createMemberValue(group, Q_VALUE_MEMBER_GARF, "ГАРФ", "ГАРФ",
			"Государственный Архив Российской Федерации", sortIndex,
			letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);
		sortIndex++;
		createMemberValue(group, Q_VALUE_MEMBER_RGAE, "РГАЭ", "РГАЭ",
			"Российский Государственный Архив Экономики", sortIndex,
			letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);
		sortIndex++;
		createMemberValue(
			group,
			Q_VALUE_MEMBER_RGANTD,
			"РГАНТД",
			"РГАНТД",
			"Российский Государственный Архив научно-технической Документации",
			sortIndex, letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);
		sortIndex++;
		createMemberValue(group, Q_VALUE_MEMBER_RGALI, "РГАЛИ", "РГАЛИ",
			"Российский Государственный Архив Литературы и Искусства",
			sortIndex, letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);
		sortIndex++;
		createMemberValue(
			group,
			Q_VALUE_MEMBER_RGASPI,
			"РГАСПИ",
			"РГАСПИ",
			"Российский Государственный Архив Социально-Политической Истории",
			sortIndex, letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);
		sortIndex++;
		createMemberValue(group, Q_VALUE_MEMBER_RGANI, "РГАНИ", "РГАНИ",
			"Российский Государственный Архив Новейшей Истории", sortIndex,
			letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);
		sortIndex++;
		createMemberValue(group, Q_VALUE_MEMBER_RGBA, "РГВА", "РГВА",
			"Российский Государственный Военный Архив", sortIndex,
			letterAttr.getId(), typeAttr.getId(),
			Q_VALUE_ORG_STRUCT_ARCHIVE, sic);

	}

	/**
	 * Создание значения справочника для справочника "Участник проекта"
	 *
	 * @param group справочник
	 * @param code код значения
	 * @param literaName код значения атрибута литера
	 * @param shortName аббревиатура архива
	 * @param fullName полное наименование архива
	 * @param sortIndex порядок при сортировке
	 * @param attrId айди атрибута "Литера"
	 * @throws Exception
	 */
	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	private DescriptorValue createMemberValue(DescriptorGroup group,
		String code, String literaName, String shortName, String fullName,
		int sortIndex, Long attrId, Long attrOrgTypeId,
		String orgStructType, DescriptorValue parent) {
		DescriptorValue v;
		v = cdbh.getDescValueByCodes(group.getCode(), code);
		if (v == null) {
			// ищу по shortValue
			logger.fine("Значение не найдено по коду. Ищу по полю shortValue");
			CriteriaBuilder cb = em.getCriteriaBuilder();
			CriteriaQuery<DescriptorValue> cq = cb
				.createQuery(DescriptorValue.class);
			Root<DescriptorValue> from = cq.from(DescriptorValue.class);

			Predicate p1 = cb.equal(from.get("groupId"), group.getId());
			Predicate p2 = cb.equal(from.get("shortValue"), shortName);
			Predicate and = cb.and(p1, p2);
			cq.where(and);
			Query q = em.createQuery(cq);
			if (!q.getResultList().isEmpty()) {
				logger.fine("Найдено соответствующее значение по полю shortValue");
				v = (DescriptorValue) q.getResultList().get(0);
				if (v.getCode() == null) {
					logger.fine("Установка кода и полного наименования найденному значению справочника");
					v.setCode(code);
					v.setValue(fullName);
				}
				createMemberValueLetter(v, attrId, literaName);
				createOrgStructType(v, attrOrgTypeId, orgStructType);
			} else {
				v = null;
			}
		}

		if (v == null) {
			v = new DescriptorValue();
			v.setCode(code);
			v.setGroupId(group.getId());
			v.setShortValue(shortName);
			v.setValue(fullName);
			v.setSortIndex(sortIndex);
			if (parent != null) {
				v.setParentId(parent.getId());
			}
			em.persist(v);
			logger.fine("Создание значения справочника " + fullName
				+ " c кодом " + code + " в справочнике " + group.getCode());
			createMemberValueLetter(v, attrId, literaName);
			createOrgStructType(v, attrOrgTypeId, orgStructType);
		}
		return v;
	}

	private boolean isDescValueAttrExist(DescriptorValue valueId, Long attrId) {
		logger.fine("Поиск значения атрибута значения справочника значения "
			+ valueId.getCode());
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<DescriptorValueAttr> cq = cb
			.createQuery(DescriptorValueAttr.class);
		Root from = cq.from(DescriptorValueAttr.class);
		Predicate p1 = cb.equal(from.get("valueId"), valueId.getId());
		Predicate p2 = cb.equal(from.get("attrId"), attrId);
		Predicate and = cb.and(p1, p2);
		cq.where(and);
		Query q = em.createQuery(cq);
		boolean result = q.getResultList().isEmpty();
		if (result) {
			logger.fine("Значение найдено");
		} else {
			logger.fine("Значение не найдено");
		}
		return result;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	private void createOrgStructType(DescriptorValue valueId, Long attrId,
		String orgStructCode) {
		if (!isDescValueAttrExist(valueId, attrId)) {
			logger.fine("Создание значения атрибута Тип элемента организационной структуры для значения справочника "
				+ valueId.getCode());
			DescriptorValueAttr a = new DescriptorValueAttr();
			a.setAttrId(attrId);
			a.setValueId(valueId.getId());
			try {
				// FIXME: что-то надо делать
				a.setRefValueId(cdbh.getDescValueIdByCode(orgStructCode));
			} catch (Exception ex) {
				Logger.getLogger(Placeholder.class.getName()).log(Level.SEVERE, null, ex);
			}
			em.merge(a);
		}
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	private void createMemberValueLetter(DescriptorValue valueId, Long attrId,
		String litera) {
		if (!isDescValueAttrExist(valueId, attrId)) {
			logger.fine("Создание значения атрибута Литера для значения справочника "
				+ valueId.getCode());
			DescriptorValueAttr a = new DescriptorValueAttr();
			a.setAttrId(attrId);
			a.setValueId(valueId.getId());
			a.setValue(litera);
			em.merge(a);
		}
	}

}
