/**
 * Различные велечины и виджеты, которыми приходится часто пользоваться в приложении.
 *
 * @author С. Благодатских
 */

Ext.define('qqext.Constants', {
	singleton: true,
	// идентификаторы для карточного контейнера меню редактирования
	/**
	 * идентификатор меню редактирования поиска
	 */
	EM_ID_0: 'menu-0',
	/**
	 * идентификатор меню редактировани регистрации запроса
	 */
	EM_ID_1: 'menu-1',
	/**
	 * идентификатор меню редактирования уведомления заявителя
	 */
	EM_ID_2: 'menu-2',
	// идентификаторы для карточного контейнера левого меню
	/**
	 * идентификатор меню работы с поиском, ЖВК и Отчетные документы
	 */
	LM_ID_0: 'lmenu-0',
	/**
	 * идентификатор меню работы с запросом
	 */
	LM_ID_1: 'lmenu-1',
	// Синглетоны что-то не заладились, поэтому я определяю все ссылки на глобальные, неизменяемые
	// объекты здесь.
	// иницаилизируется при создании VLeftMenu
	LEFT_MENUS: null,
	// иницализируются при создании RequestMenu
	REQ_BUTTONS: null,
	// инициализируется при создании SearchMenu
	SEARCH_BUTTONS: null,
	// иницализируются при создании VTitleBar
	EDIT_MENUS: null,
	NAV_MENU: null
});

