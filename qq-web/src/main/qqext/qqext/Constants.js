/**
 * Различные величины, компоненты, функции, которыми приходится часто пользоваться в приложении.
 *
 * @author С. Благодатских
 */

Ext.define('qqext.Constants', {
	singleton: true,
	/**
	 * Метод для установки активной страницы:
	 * Иницализируется в {@link qqext.view.Viewport#initComponent}.
	 * 0 - WelcomePage, страница с которой можно поити либо в АС Запросы, либо еще куда
	 * 1 - MainPage, страница для работы с АС Запросами
	 * @param {Number} idx порядковый номер страницы (см. выше)
	 */
	setActivePage: null,
	/**
	 * Основной вьюпорт, пока нигде не используется, кандидат на удаление отсюда
	 */
	viewport: null,
	/**
	 * Метод для установки формы в центре экрана
	 * Иницализируется в {@link qqext.view.MainPage#initComponent}.
	 * Порядок элементов:
	 * 0 - view.journal.VJournalForm
	 * 1 - view.search.VSearchForm
	 * 2 - Отчетные документы
	 * 3 - qqext.view.reg.VRegForm
	 * 4 - qqext.view.notify.VNotify
	 * 5 - qqext.view.transmission.VTransmission
	 * 6 - qqext.view.exec.VExecForm
	 * @param {Number} idx порядковый номер формы (см. выше)
	 */
	setCurrentForm: null,
	/**
	 * Метод для полечения формы, которая в данный момент показана на экране.
	 * @return {Object} активную форму
	 */
	getCurrentForm: null,
	/**
	 * Форма поиска. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	searchForm: null,
	/**
	 * Форма регистрации запроса. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	regForm: null,
	/**
	 * Форма уведомления заявителя. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	notifyForm: null,
	/**
	 * Форма передачи на исполнение. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	transForm: null,
	/**
	 * Форма исполнение запроса. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	execForm: null,
	/**
	 * Основной контроллер приложения. Инициализируется в {@link qqext.controller.Main#init}.
	 */
	mainController: null,
	/**
	 * Хранилище с правами пользователей
	 */
	userStore: null,
	/**
	 * Различные кнопки, на которые нужно иметь ссылки по ходу дела. Обращаться к ним
	 * только через интерфейс getButton и addButton.
	 */
	_buttons: [],
	/**
	 * Возвращает кнопку из зарегестрированных, по заданному имени.
	 * @param {String} name имя кнопки
	 * @returns {Obejct/undefined} если такая кнопка есть, то кнопку, иначе undefined
	 */
	getButton: function(name) {
		var btns = this._buttons,
				max = btns.length;
		for (var i = 0; i < max; ++i) {
			var btn = btns[i];
			if (name === btn.name)
				return btn.body;
		}
	},
	/**
	 * Добавляет кнопку в набор, если такой еще нет
	 * @param {String} name имя кнопки
	 * @param {Ext.button.Button} body сама кнопка
	 */
	addButton: function(name, body) {
		if (!this.getButton(name)) {
			this._buttons.push({name: name, body: body});
		}
	},
	/**
	 * Различные надписи приложения (на кнопках, заголовки и т.д.)
	 */
	labels: {
		save: "Сохранить",
		edit: "Редактировать",
		toSearch: "Вернуться в поиск",
		remove: "Удалить",
		register: "Регистрировать",
		add: "Добавить",
		search: "Поиск",
		clean: "Очистить",
		jvk: "ЖВК",
		reports: "Отчетные документы",
		reqRegister: "Регистрация запроса",
		reqNotify: "Уведомление заявителю",
		transToComplete: "Передача на исполнение",
		complete: "Исполнение запроса",
		toBegin: "В начало",
		quit: "Выйти",
		app1: "Подсистема 1",
		app2: "Подсистема 2",
		asq: "АС Запросы"
	},
	/**
	 * Различные url
	 */
	urls: {
		welcome: "/qq-web/",
		login: "/qq-web/Auth?action=logout&redirect=1",
		app1: "#",
		app2: "#"
	},
	/**
	 * Вызывается когда нажали на кнопку 'Выйти'
	 * TODO: может быть следуте очистить локальное хранилище, в котором
	 * сохранены данные пользователя
	 */
	quitAction: function() {
		window.location = qqext.Constants.urls.login;
	}
});

