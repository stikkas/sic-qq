package ru.insoft.archive.qq.ejb;

/**
 * Коды различных справочников.
 *
 * @author Благодатских С.
 */
public class DictCodes {

	// Группы справочников
	/**
	 * Организационная структура
	 */
	public static final String ORG_STRUCTURE = "ORG_STRUCTURE";
	/**
	 * Категория заявителя
	 */
	public static final String Q_DICT_APP_CATEGORY = "Q_DICT_APP_CATEGORY";
	/**
	 * Тип документов
	 */
	public static final String Q_DICT_DOC_TYPES = "Q_DICT_DOC_TYPES";
	/**
	 * Способ отправки
	 */
	public static final String Q_DICT_DELIVERY_METHOD = "Q_DICT_DELIVERY_METHOD";
	/**
	 * Территория хранилища
	 */
	public static final String Q_DICT_STORAGE = "Q_DICT_STORAGE";
	/**
	 * Результат ответа
	 */
	public static final String Q_DICT_RESULT_ANSER = "Q_DICT_RESULT_ANSER";
	/**
	 * Тематика ответа
	 */
	public static final String Q_DICT_THEMATIC_ANSW = "Q_DICT_THEMATIC_ANSW";
	/**
	 * Категория сложности
	 */
	public static final String Q_DICT_DIFF_CATEGORY = "Q_DICT_DIFF_CATEGORY";
	/**
	 * Тип прикрепленного файла
	 */
	public static final String Q_DICT_FILE_TYPE = "Q_DICT_FILE_TYPE";
	/**
	 * Состояния запроса
	 */
	public static final String Q_DICT_QUESTION_STATUSES = "Q_DICT_QUESTION_STATUSES";
	/**
	 * Форма выдачи ответа
	 */
	public static final String Q_DICT_ANSWER_FORM = "Q_DICT_ANSWER_FORM";
	/**
	 * Тип запроса
	 */
	public static final String Q_DICT_QUEST_TYPE = "Q_DICT_QUEST_TYPE";
	/**
	 * Способ передачи
	 */
	public static final String QQ_TRANSMISSION_MODE = "QQ_TRANSMISSION_MODE";
	/**
	 * Статус уведомления
	 */
	public static final String Q_DICT_NOTIFY_STATUSES = "Q_DICT_NOTIFY_STATUSES";
	/**
	 * Тип заявителя
	 */
	public static final String Q_DICT_APPLICANT_TYPE = "Q_DICT_APPLICANT_TYPE";
	/**
	 * Этап согласования документа
	 */
	public static final String Q_DICT_THE_EHDORSEMENT = "Q_DICT_THE_EHDORSEMENT";

	// Архивы
	/**
	 * Справочно-информационный центр
	 */
	public static final String Q_VALUE_MEMBER_SIC = "Q_VALUE_MEMBER_SIC";
	/**
	 * Государственный архив Российской Федерации
	 */
	public static final String Q_VALUE_MEMBER_GARF = "Q_VALUE_MEMBER_GARF";
	/**
	 * Российский государственный архив научно -технической документации
	 */
	public static final String Q_VALUE_MEMBER_RGANTD = "Q_VALUE_MEMBER_RGANTD";
	/**
	 * Российский государственный архив экономики
	 */
	public static final String Q_VALUE_MEMBER_RGAE = "Q_VALUE_MEMBER_RGAE";
	/**
	 * Российский государственный архив литературы и искусства
	 */
	public static final String Q_VALUE_MEMBER_RGALI = "Q_VALUE_MEMBER_RGALI";
	/**
	 * Российский государственный архив социально-политической истории
	 */
	public static final String Q_VALUE_MEMBER_RGASPI = "Q_VALUE_MEMBER_RGASPI";
	/**
	 * Российский государственный архив новейшей истории
	 */
	public static final String Q_VALUE_MEMBER_RGANI = "Q_VALUE_MEMBER_RGANI";
	/**
	 * Российский государственный военный архив
	 */
	public static final String Q_VALUE_MEMBER_RGBA = "Q_VALUE_MEMBER_RGBA";

	// Типы документов
	/**
	 * Документ заявителя
	 */
	public static final String Q_VALUE_FILE_TYPE_APP_DOCS = "Q_VALUE_FILE_TYPE_APP_DOCS";
	/**
	 * Ответ
	 */
	public static final String Q_VALUE_FILE_TYPE_ANSWER = "Q_VALUE_FILE_TYPE_ANSWER";
	/**
	 * Подготовленный документ
	 */
	public static final String Q_VALUE_FILE_TYPE_INFO = "Q_VALUE_FILE_TYPE_INFO";
	// Статусы запроса
	/**
	 * На исполнении
	 */
	public static final String Q_VALUE_QSTAT_ONEXEC = "Q_VALUE_QSTAT_ONEXEC";
	/**
	 * Исполнен
	 */
	public static final String Q_VALUE_QSTAT_EXEC = "Q_VALUE_QSTAT_EXEC";
	/**
	 * Зарегистрирован
	 */
	public static final String Q_VALUE_QSTAT_REG = "Q_VALUE_QSTAT_REG";
	/**
	 * На регистрации
	 */
	public static final String Q_VALUE_QSTAT_ONREG = "Q_VALUE_QSTAT_ONREG";
	// Статусы уведомления
	/**
	 * Не исполнено
	 */
	public static final String Q_VALUE_NOTIFY_NOEXEC = "Q_VALUE_NOTIFY_NOEXEC";
	/**
	 * Исполнено
	 */
	public static final String Q_VALUE_NOTIFY_EXEC = "Q_VALUE_NOTIFY_EXEC";
	/**
	 * Отправлено
	 */
	public static final String Q_VALUE_NOTIFY_SEND = "Q_VALUE_NOTIFY_SEND";
	/**
	 * Без уведомления
	 */
	public static final String Q_VALUE_NOTIFY_NONE = "Q_VALUE_NOTIFY_NONE";

	// Права доступа
	/**
	 * Супервизор
	 */
	public static final String Q_RULE_SUPERVISOR = "Q_RULE_SUPERVISOR";
	/**
	 * Суперисполнитель
	 */
	public static final String Q_RULE_SEXECUTOR = "Q_RULE_SEXECUTOR";
	/**
	 * Регистратор
	 */
	public static final String Q_RULE_REGISTRATOR = "Q_RULE_REGISTRATOR";
	/**
	 * Координатор
	 */
	public static final String Q_RULE_COORDINATOR = "Q_RULE_COORDINATOR";
	/**
	 * Исполнитель
	 */
	public static final String Q_RULE_EXECUTOR = "Q_RULE_EXECUTOR";
}
