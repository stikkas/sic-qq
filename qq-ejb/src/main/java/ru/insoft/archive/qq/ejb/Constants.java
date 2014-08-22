package ru.insoft.archive.qq.ejb;

/**
 * @author sorokin
 *
 */
public interface Constants {

	/**
	 * Код подсистемы
	 */
	public static String SUBSYSTEM_QQ = "SUBSYSTEM_QQ";
	/**
	 * Код значения значения в таблице CORE_PARAMETER. Наличие значения с этим
	 * кодом является индикатором того, что в бд выполнена инициализация
	 * справочников и значений, необходимых для работы подсистемы.
	 */
	public static String Q_PARAM_DB_READY_FLAG_CODE = "QQ_DATABASE_OK";

	/**
	 * Код для справочника Способ передачи
	 */
	public static String Q_DICT_TRANSMISSION_MODE = "QQ_TRANSMISSION_MODE";

	/**
	 * Справочник: способ передачи значение: "Центр".
	 */
	public static String Q_VALUE_TRANSMISSION_CENTER = "QQ_TRANSMISSION_MODE_CENTR";

	/**
	 * Справочник: способ передачи значение: "Электронная почта"
	 */
	public static String Q_VALUE_TRANSMISSION_EMAIL = "QQ_TRANSMISSION_MODE_EMAIL";

	/**
	 * Справочник: способ передачи значение: "Почта России"
	 */
	public static String Q_VALUE_TRANSMISSION_RUPOST = "QQ_TRANSMISSION_MODE_RUPOST";

	/**
	 * Справочник: способ передачи значение: "Факс"
	 */
	public static String Q_VALUE_TRANSMISSION_FAX = "QQ_TRANSMISSION_MODE_FAX";

	/**
	 * Справочник: способ передачи значение: "Интернет"
	 */
	public static String Q_VALUE_TRANSMISSION_WWW = "QQ_TRANSMISSION_MODE_WWW";

	/**
	 * Код для справочника "Исполняющая организация"
	 */
	public static String Q_DICT_EXEC_ORGANIZATION = "QQ_EXEC_ORG";

	/**
	 * Справочник "Исполняющая организация" значение "СИЦ"
	 */
	public static String Q_VALUE_EXEC_ORG_SIC = "QQ_VALUE_EX_ORG_SIC";
	/**
	 * Справочник "Исполняющая организация" значение "ГАРФ"
	 */
	public static String Q_VALUE_EXEC_ORG_GARF = "QQ_VALUE_EX_ORG_GARF";

	/**
	 * Справочник "Исполняющая организация" значение "РГАЭ"
	 */
	public static String Q_VALUE_EXEC_ORG_RGAE = "QQ_VALUE_EX_ORG_RGAE";
	/**
	 * Справочник "Исполняющая организация" значение "РГАНТД"
	 */
	public static String Q_VALUE_EXEC_ORG_RGANTD = "QQ_VALUE_EX_ORG_RGANTD";

	/**
	 * Справочник "Исполняющая организация" значение: "RGALI"
	 */
	public static String Q_VALUE_EXEC_ORG_RGALI = "QQ_VALUE_EX_ORG_RGALI";

	/**
	 * Справочник "Исполняющая организация" значение "РГАСПИ"
	 */
	public static String Q_VALUE_EXEC_ORG_RGASPI = "QQ_VALUE_EX_ORG_RGASPI";

	/**
	 * Справочник "Исполняющая организация" значение "РГАНИ"
	 */
	public static String Q_VALUE_EXEC_ORG_RGANI = "QQ_VALUE_EX_ORG_RGANI";
	/**
	 * Справочник "Исполняющая организация" значение "РГВА"
	 */
	public static String Q_VALUE_EXEC_ORG_RGVA = "QQ_VALUE_EX_ORG_RGVA";

	/**
	 * Справочник "Вид запроса"
	 *
	 */
	public static String Q_DICT_QUEST_TYPE = "Q_DICT_QUEST_TYPE";

	/**
	 * Справнчиок "Вид запроса" Значение "Социально-правовой"
	 */
	public static String Q_VALUE_QUEST_TYPE_SOC = "Q_VALUE_QUEST_TYPE_SOCIAL";
	/**
	 * Справочник "Вид запроса" Значение "Тематический"
	 */
	public static String Q_VALUE_QUEST_TYPE_TEMATIC = "Q_VALUE_QUEST_TYPE_TEMATIC";

	/**
	 * Справочник "Вид запроса" Значение "Генеалогический"
	 */
	public static String Q_VALUE_QUEST_TYPE_GENEALOGICAL = "Q_VALUE_QUEST_TYPE_GENEA";
	/**
	 * Справочник "Вид запроса" Значение "Биографический"
	 */
	public static String Q_VALUE_QUEST_TYPE_BIO = "Q_VALUE_QUEST_TYPE_BIO";

	/**
	 * Справочник "Форма ответа"
	 */
	public static String Q_DICT_ANSWER_FORM = "Q_DICT_ANSWER_FORM";

	/**
	 * Справочник "Форма ответа" Значение "На руки"
	 */
	public static String Q_VALUE_ANSWER_FORM_HAND = "Q_VALUE_ANSWER_FORM_HAND";

	/**
	 * Справочник "Форма ответа" Значение "Почтой"
	 */
	public static String Q_VALUE_ANSWER_FORM_POST = "Q_VALUE_ANSWER_FORM_POST";

	/**
	 * Справочинк "Тип заявителя"
	 */
	public static String Q_DICT_APPLICANT_TYPE = "Q_DICT_APPLICANT_TYPE";
	/**
	 * Справочник "Тип заявителя" Значение "Физическое лицо"
	 */
	public static String Q_VALUE_APPLICANT_TYPE_FFACE = "Q_VALUE_APP_TYPE_FFACE";
	/**
	 * Справочник "Тип заявителя" Значение "Юридическое лицо"
	 */
	public static String Q_VALUE_APPLICANT_TYPE_JURFACE = "Q_VALUE_APP_TYPE_JURFACE";

	/**
	 * Справочник "Категория заявителя"
	 */
	public static String Q_DICT_APPLICANT_CAT = "Q_DICT_APP_CATEGORY";

	/**
	 * Справочник "Категория заявителя" Значение "Росархив"
	 */
	public static String Q_VALUE_APP_CAT_RUSARCH = "Q_VALUE_APP_CAT_RUSARCH";

	/**
	 * Справочник "Категория заявителя" Значение "УСЗН"
	 */
	public static String Q_VALUE_APP_CAT_USZN = "Q_VALUE_APP_CAT_USZN";
	/**
	 * Справочник "Категория заявителя" Значение "ПФ"
	 */
	public static String Q_VALUE_APP_CAT_PF = "Q_VALUE_APP_CAT_PF";

	/**
	 * Справочник "Категория заявителя" Значение "Органы гос. власти"
	 */
	public static String Q_VALUE_APP_CAT_ORGAN = "Q_VALUE_APP_CAT_ORGAN";

	/**
	 * Справочник "Категория заявителя" Значение "Органы местного
	 * самоуправления"
	 */
	public static String Q_VALUE_APP_CAT_SELF_GOV = "Q_VALUE_APP_CAT_SELF_GOV";

	/**
	 * Справочник "Категория заявителя" Значение "Правоохранительные органы
	 */
	public static String Q_VALUE_APP_CAT_LAW_ENF = "Q_VALUE_APP_CAT_LAW_ENF";
	/**
	 * Справочник "Категория заявителя" Значение "Судебные органы"
	 */
	public static String Q_VALUE_APP_CAT_JUDICIARY = "Q_VALUE_APP_CAT_JUDICIARY";

	/**
	 * Справочник "Категория заявителя" Значение "МФЦ"
	 */
	public static String Q_VALUE_APP_CAT_MFC = "Q_VALUE_APP_CAT_MFC";
	/**
	 * Справочник "Категория заявителя" Значение "Архивы"
	 */
	public static String Q_VALUE_APP_CAT_ARCHIVES = "Q_VALUE_APP_CAT_ARCHIVES";

	/**
	 * Справочник "Тип документов"
	 */
	public static String Q_DICT_DOC_TYPE = "Q_DICT_DOC_TYPES";

	/**
	 * Справочник "Тип документов" Значение "Архивные копии"
	 */
	public static String Q_VALUE_DOC_TYPE_ARCH_COPY = "Q_VALUE_DOC_TYPE_ARCH_COPY";

	/**
	 * Справочник "Тип документов" Значение "Архивные выписки"
	 */
	public static String Q_VALUE_DOC_TYPE_ARCH_EXTRACT = "Q_VALUE_DOC_TYPE_ARCH_EXTRACT";

	/**
	 * Справочник "Тип документов" Значение "Информационное письмо
	 * положительное"
	 */
	public static String Q_VALUE_DOC_TYPE_LETTER_PLUS = "Q_VALUE_DOC_TYPE_LETTER_PLUS";

	/**
	 * Справочник "Тип документов" Значение "Информационное письмо
	 * отрицательное"
	 */
	public static String Q_VALUE_DOC_TYPE_LETTER_MINUS = "Q_VALUE_DOC_TYPE_LETTER_MINUS";

	/**
	 * Справочник "Тип документов" Значение "Информационное письо рекомендация"
	 */
	public static String Q_VALUE_DOC_TYPE_LETTER_RECOM = "Q_VALUE_DOC_TYPE_LETTER_RECOM";

	/**
	 * Справочник "Тип документов" Значение "Перечень документов"
	 */
	public static String Q_VALUE_DOC_TYPE_LIST = "Q_VALUE_DOC_TYPE_LIST";

	/**
	 * Справочник "Этап согласования документа"
	 */
	public static String Q_DICT_THE_ENDORSEMENT = "Q_DICT_THE_EHDORSEMENT";

	/**
	 * Справочник "Этап согласования документа" Значение "Сдано на подпись"
	 */
	public static String Q_VALUE_ENDORSEMENT_SIGNATURE = "Q_VALUE_ENDORSEMENT_SIGNATURE";

	/**
	 * Справочник "Этап согласования документа" Значение "Возврат на доработку"
	 */
	public static String Q_VALUE_ENDORSEMENT_RETURN = "Q_VALUE_ENDORSEMENT_RETURN";

	/**
	 * Справочник "Этап согласования документа" Значение "Повторно сдано на
	 * подпись"
	 */
	public static String Q_VALUE_ENDORSEMENT_REPEAT_SIGN = "Q_VALUE_ENDORSEMENT_REPSIGN";

	/**
	 * Справочник "Способ отправки"
	 */
	public static String Q_DICT_DELIVERY_METHOD = "Q_DICT_DELIVERY_METHOD";

	/**
	 * Справочник "Способ отправки" Значение "Выдано на руки"
	 */
	public static String Q_VALUE_DEL_METHOD_HAND = "Q_VALUE_DEL_METHOD_HAND";
	/**
	 * Справочник "Способ отправки" Значение "Отправлен почтой"
	 */
	public static String Q_VALUE_DEL_METHOD_POST = "Q_VALUE_DEL_METHOD_POST";
	/**
	 * Справочник "Способ отправки" Значение "Отправлен факсом"
	 */
	public static String Q_VALUE_DEL_METHOD_FAX = "Q_VALUE_DEL_METHOD_FAX";
	/**
	 * Справочник "Территория хранилища"
	 */
	public static String Q_DICT_STORAGE = "Q_DICT_STORAGE";
	/**
	 * Справочник "Территория хранилища" Значение "ул. Б.Пироговская"
	 */
	public static String Q_VALUE_STORAGE_PIROG = "Q_VALUE_STORAGE_PIROG";
	/**
	 * Справочник "Територия хранилища" Знаение "ул. Профсоюзная"
	 */
	public static String Q_VALUE_STORAGE_PROFS = "Q_VALUE_STORAGE_PROFS";
	/**
	 * Справочник "Территория хранилища" Значение "Бережковская наб."
	 */
	public static String Q_VALUE_STORAGE_BEREZH = "Q_VALUE_STORAGE_BEREZH";
	/**
	 * Справочник "Территория хранилища" Значение "пос. Вороново"
	 */
	public static String Q_VALUE_STORAGE_VORONO = "Q_VALUE_STORAGE_VORON";

	/**
	 * Справочник "Результат ответа"
	 */
	public static String Q_DICT_RESULT_ANSWER = "Q_DICT_RESULT_ANSER";
	/**
	 * Справочник "Результат ответа" Значение "Положительный"
	 */
	public static String Q_VALUE_RESULT_PLUS = "Q_VALUE_RESULT_PLUS";
	/**
	 * Справочник "Результат ответа" Значение "Положительный платный"
	 */
	public static String Q_VALUE_RESULT_PLUS_PAID = "Q_VALUE_RESULT_PLUS_PAID";
	/**
	 * Справочник "Результат ответа" Значение "Отрицательный платный"
	 */
	public static String Q_VALUE_RESULT_MINUS_PAID = "Q_VALUE_RESULT_MINUS_PAID";
	/**
	 * Справочник "Результат ответа" Значение "Отрицательный непрофильный"
	 */
	public static String Q_VALUE_RESULT_MINUS_NEPROF = "Q_VALUE_RESULT_MINUS_NEPROF";
	/**
	 * Справочник "Результат ответа" Значение "Отрицательный с просмотром"
	 */
	public static String Q_VALUE_RESULT_MINUS_WVIEV = "Q_VALUE_RESULT_MINUS_WVIEW";
	/**
	 * Справочник "Результат ответа" Значение "Переадресовка"
	 */
	public static String Q_VALUE_RESULT_REDIRECT = "Q_VALUE_RESULT_REDIRECT";
	/**
	 * Справочник "Результат ответа" Значение "Дополнительный сведения"
	 */
	public static String Q_VALUE_RESULT_DOP_INFO = "Q_VALUE_RESULT_DOP_INFO";
	/**
	 * Справочник "Результат ответа" Значение "Снят с исполнения"
	 */
	public static String Q_VALUE_RESULT_REJECTED = "Q_VALUE_RESULT_REJECTED";

	/**
	 * Справочник "Тематика ответа"
	 */
	public static String Q_DICT_THEMATIC_ANSW = "Q_DICT_THEMATIC_ANSW";
	/**
	 * Справочник "Тематика ответа" Значение "Зарплата"
	 */
	public static String Q_VALUE_THEM_ZP = "Q_VALUE_THEM_ZP";
	/**
	 * Справочник "Тематика ответа" Значение "Стаж"
	 */
	public static String Q_VALUE_THEM_EXPERIENCE = "Q_VALUE_THEM_EXPERIENCE";
	/**
	 * Справочник "Тематика ответа" Значение "Награда"
	 */
	public static String Q_VALUE_THEM_AWARD = "Q_VALUE_THEM_AWARD";
	/**
	 * Справочник "Тематика ответа" Значение "Переименование (реорганизация)"
	 */
	public static String Q_VALUE_THEM_RENAME = "Q_VALUE_THEM_RENAME";
	/**
	 * Справочник "Тематика ответа" Значение "Эвакуация"
	 */
	public static String Q_VALUe_THEM_EVACUATION = "Q_VALUE_THEM_EVACUATION";
	/**
	 * Справочник "Тематика ответа" Значение "Пребывание в лагерях"
	 */
	public static String Q_VALUE_THEM_CAMP = "Q_VALUE_THEM_CAMP";
	/**
	 * Справочник "Тематика ответа" Значение "Военная служба"
	 */
	public static String Q_VALUE_THEM_ARMY = "Q_VALUE_THEM_ARMY";
	/**
	 * Справочник "Тематика ответа" Значение "Административное деление"
	 */
	public static String Q_VALUE_THEM_ADM_DIV = "Q_VALUE_THEM_ADM_DIV";
	/**
	 * Справочинк "Тематика ответа" Значение "Разное"
	 */
	public static String Q_VALUE_THEM_SUNDRY = "Q_VALUE_THEM_SUNDRY";

	/**
	 * Справочник "Категория сложности"
	 */
	public static String Q_DICT_DIFF_CATEGORY = "Q_DICT_DIFF_CATEGORY";

	/**
	 * Справочинк "Категория сложности" Значение "I"
	 */
	public static String Q_VALUE_DIFF_CAT_I = "Q_DICT_DIFF_CAT_I";
	/**
	 * Справочник "Категория сложности" Значение "II"
	 */
	public static String Q_VALUE_DIFF_CAT_II = "Q_DICT_DIFF_CAT_II";
	/**
	 * Справочник "Категория сложности" Значение "III"
	 */
	public static String Q_VALUE_DIFF_CAT_III = "Q_DICT_DIFF_CAT_III";
	/**
	 * Справочник "Категория сложности" Значение "IV"
	 */
	public static String Q_VALUE_DIFF_CAT_IV = "Q_DICT_DIFF_CAT_IV";

	/**
	 * Справочник "Участники проекта"
	 */
	public static String Q_DICT_MEMBERS = "ORG_STRUCTURE";

	/**
	 * Справочник "Участники проекта" Значение "СИЦ"
	 */
	public static String Q_VALUE_MEMBER_SIC = "Q_VALUE_MEMBER_SIC";
	/**
	 * Справочник "Участники проекта" Значение "ГАРФ"
	 */
	public static String Q_VALUE_MEMBER_GARF = "Q_VALUE_MEMBER_GARF";
	/**
	 * Справочник "Участники проекта" Значение "РГАЭ"
	 */
	public static String Q_VALUE_MEMBER_RGAE = "Q_VALUE_MEMBER_RGAE";
	/**
	 * Справочник "Участники проекта" Значение "RGANTD"
	 */
	public static String Q_VALUE_MEMBER_RGANTD = "Q_VALUE_MEMBER_RGANTD";
	/**
	 * Справочник "Участники проекта" Значение "РГАЛИ"
	 */
	public static String Q_VALUE_MEMBER_RGALI = "Q_VALUE_MEMBER_RGALI";
	/**
	 * Справочник "Участники проекта" Значение "РГАСПИ"
	 */
	public static String Q_VALUE_MEMBER_RGASPI = "Q_VALUE_MEMBER_RGASPI";
	/**
	 * Справочник "Участники проекта" Значение "РГАНИ"
	 */
	public static String Q_VALUE_MEMBER_RGANI = "Q_VALUE_MEMBER_RGANI";
	/**
	 * Справочник "Участники проекта" Значение "РГВА"
	 */
	public static String Q_VALUE_MEMBER_RGBA = "Q_VALUE_MEMBER_RGBA";

	/**
	 * Справочник "Тип элемента организационной структуры"
	 */
	public static String Q_DICT_ORG_STRUCT_TYPE = "ORG_STRUCTURE_TYPE";
	/**
	 * Справочник "Тип элемента организационной структуры" Значение "Архив"
	 */
	public static String Q_VALUE_ORG_STRUCT_ARCHIVE = "ARCHIVE";
	/**
	 * Справочник "Тип элемента организационной структуры" Значение "Структурное
	 * подразделение"
	 */
	public static String Q_VALUE_ORG_STRUCT_DEP = "DEPARTMENT";
	/**
	 * Справочник "Тип элемента организационной структуры" Значение "Вышестоящая
	 * организация"
	 */
	public static String Q_VALUE_ORG_STRUCT_MASTORG = "MASTER_ORG";

	/**
	 * Справочник: "Тип прикрепленного файла"
	 */
	String Q_DICT_FILE_TYPE = "Q_DICT_FILE_TYPE";

	/**
	 * Справочник: "Тип прикрепленного файла" Значение "Ответ"
	 */
	String Q_VALUE_FILE_TYPE_ANSWER = "Q_VALUE_FILE_TYPE_ANSWER";

	/**
	 * Справочник: "Тип прикрепленного файла" Значение: "Документы заявителя"
	 */
	String Q_VALUE_FILE_TYPE_APP_DOCS = "Q_VALUE_FILE_TYPE_APP_DOCS";

	/**
	 * Справочник "Статусы запроса"
	 */
	String Q_DICT_QUESTION_STATUSES = "Q_DICT_QUESTION_STATUSES";

	/**
	 * Регистрация
	 */
	String Q_VALUE_QSTAT_REG = "Q_VALUE_QSTAT_REG";
	/**
	 * Регистрация (отправлено)
	 */
	String Q_VALUE_QSTAT_REGSEND = "Q_VALUE_QSTAT_REGSEND";
	/**
	 * На исполнении
	 */
	String Q_VALUE_QSTAT_ONEXEC = "Q_VALUE_QSTAT_ONEXEC";
	/**
	 * Исполнено
	 */
	String Q_VALUE_QSTAT_EXECUTED = "Q_VALUE_QSTAT_EXECUTED";
	/**
	 * Отправлено
	 */
	String Q_VALUE_QSTAT_SENDED = "Q_VALUE_QSTAT_SENDED";
}
