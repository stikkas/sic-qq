Ext.Loader.setConfig({
	enabled: true,
	paths: {qqext: 'qqext'}
});
/*
 * Стандартная точка входя для ExtJS приложения.
 * @param {Object} различные установки для приложения
 */
Ext.application({
	name: 'qqext',
	appFolder: 'qqext',
	autoCreateViewport: false,
	requires: [
		'hawk_common.model.User',
		'hawk_common.store.UserLocalStorage',
		'qqext.view.Viewport',
		'qqext.Menu',
		'qqext.store.DictValuesStore'
	],
	controllers: ['qqext.controller.Main'],
	launch: function() {
		var me = this;

		Ext.Ajax.request({
			url: '/qq-web/Rules',
			// Используется только в целях тестирования, в обход реальной аутентификации
			params: {username: 'ARCHIVE_USER'},
			success: function(response) {
				// Настраиваем глобальные переменные
				me.initQQ();
				var authRes = Ext.decode(response.responseText),
						ns = qqext,
						user = ns.user = Ext.create('hawk_common.model.User'),
						userStore = ns.userStore = Ext.create('hawk_common.store.UserLocalStorage');
				// нужно инициализировать хранилище для информации об организациях
				// и установить принадлежность пользователся к СИЦ
				Ext.create('DictValuesStore',
						'inboxDocExecOrg', 'ORG_STRUCTURE', {
							listeners: {
								load: function(st) {
									ns.isSIC =
											st.getById(authRes.organization).get('code')
											=== 'Q_VALUE_MEMBER_SIC';
								}
							}
						});

				user.set('id', 'current');
				user.set('name', authRes.msg);
				user.set('access', authRes.access);
				user.set('userId', authRes.userId);
				user.set('organization', authRes.organization);
				userStore.add(user);
				userStore.sync();

				Ext.create('Viewport', {});
			},
			failure: function(response) {
				Ext.Msg.show({
					title: 'Ошибка',
					msg: response.responseText,
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.ERROR,
					cls: 'err_msg',
					maxWidth: 1000
				});
			}
		});
	},
	initQQ: function() {
		// Глобальные переменные и константы для namespace qqext.
		// Названо классом для того, чтобы jsduck задокументировал это.
		/**
		 * @class qqext
		 */
		/**
		 * Устанавливает активную страницу (иницализируется в {@link qqext.view.Viewport#initComponent}).
		 * Страницы приложения:
		 *
		 * - 0 - qqext.view.WelcomePage, с нее можно поити либо в "АС Запросы", либо еще куда
		 * - 1 - qqext.view.MainPage, страница для работы с "АС Запросами"
		 *
		 * @param {Number} idx порядковый номер страницы (см. выше)
		 * @method 	setActivePage
		 */
		/**
		 * Переключает формы в центре экрана.
		 * Иницализируется в {@link qqext.view.MainPage#initComponent}.
		 * Возможные формы:
		 *
		 * - 0 - qqext.view.journal.VJournalForm журнал входящей корреспонденции
		 * - 1 - qqext.view.search.VSearchForm форма поиска заявок
		 * - 2 - Отчетные документы
		 * - 3 - qqext.view.reg.VRegForm форма регистрации заявки
		 * - 4 - qqext.view.notify.VNotify форма уведомления заявителю
		 * - 5 - qqext.view.transmission.VTransmission форма передачи на исполнение
		 * - 6 - qqext.view.exec.VExecForm форма исполнения запроса
		 *
		 * @param {Number} idx порядковый номер формы (см. выше)
		 * @method setCurrentForm
		 */
		/**
		 * Метод для полечения формы, которая в данный момент показана на экране.
		 * Иницализируется в {@link qqext.view.MainPage#initComponent}.
		 * @return {Ext.grid.Panel/Ext.container.Container/qqext.view.StyledPanel} форма
		 * @method getCurrentForm
		 */
		/**
		 * @property {hawk_common.model.User} user
		 * Модель активного пользователя системы
		 */
		/**
		 *
		 * @property {qqext.view.journal.VJournalForm} jvkForm
		 * Форма ЖВК. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.search.VSearchForm} searchForm
		 * Форма поиска. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.reg.VRegForm} regForm
		 * Форма регистрации запроса. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.notify.VNotify} notifyForm
		 * Форма уведомления заявителя. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.transmission.VTransmission} transForm
		 * Форма передачи на исполнение. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.exec.VExecForm} execForm
		 * Форма исполнение запроса. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.controller.Main} mainController
		 * Основной контроллер приложения. Инициализируется в {@link qqext.controller.Main#init}.
		 */
		/**
		 * @property {hawk_common.store.UserLocalStorage} userStore
		 * Хранилище с правами пользователей. Иницализируется при старте приложения.
		 */
		/**
		 * @property {Ext.data.Model} request
		 * Текущий запрос
		 */
		/**
		 * @property {String} currentRequest
		 * id выбранного запроса, в данный момент с ним ведется работа
		 */
		/*
		 * Различные кнопки, на которые нужно иметь ссылки по ходу дела. Обращаться к ним
		 * только через интерфейс {@link #getButton} и {@link #addButton}.
		 */
		var buttons = [];
		/**
		 * Возвращает кнопку из зарегестрированных, по заданному имени. Необходим для
		 * программного нажатия на кнопку.
		 * @param {String/Number} name имя кнопки
		 * @returns {Obejct/undefined} если такая кнопка есть, то кнопку, иначе undefined
		 * @method getButton
		 */
		qqext.getButton = function(name) {
			var max = buttons.length,
					i = 0,
					btn;
			for (; i < max; ++i) {
				btn = buttons[i];
				if (name === btn.name)
					return btn.body;
			}
		};
		/**
		 * Добавляет кнопку в набор, если такой еще нет
		 * @param {String/Number} name имя кнопки
		 * @param {Ext.button.Button} button сама кнопка
		 * @method addButton
		 */
		qqext.addButton = function(name, button) {
			if (!qqext.getButton(name))
				buttons.push({name: name, body: button});
		};
		/**
		 * @property {Object} labels
		 * Текстовые надписи приложения (на кнопках, заголовки и т.д.)
		 */
		qqext.labels = {
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
		};
		/**
		 * @property {Object} urls URLs для доступа к серверу
		 */
		qqext.urls = {
			welcome: "/qq-web/",
			login: "/qq-web/Auth?action=logout&redirect=1",
			app1: "#",
			app2: "#"
		};
		/**
		 * @property {Object} btns
		 * Условные обозначения для кнопок, которые могут использоваться
		 * из разных частей программы. Доступ получать {@link #getButton}.
		 */
		qqext.btns = {
			add: 0, // Кнопка "Добавить" новый запрос
			jvk: 1, // Кнопка "ЖВК"
			search: 2, // Кнопка "Поиск"
			reg: 3, // Кнопка "Регистрация запроса"
			notify: 4, // Кнопка "Уведомление заявителю"
			trans: 5, // Кнопка "Передача на исполнение"
			exec: 6 // Кнопка "Исполнение запроса"
		};
		/**
		 * Вызывается когда нажали на кнопку 'Выйти'
		 * @method quitAction
		 */
		qqext.quitAction = function() {
			// молча, без выстерла событий, удаляем все данные из хранилища
			qqext.userStore.removeAll(true);
			window.location = qqext.urls.login;
		};
		/**
		 * @property {Obejct} applicants
		 * Поля для модели и формы Заявителя. Каждое свойство объекта
		 * представляет собой массив из двуз значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.Applicant.
		 */
		/**
		 * @property {Boolean} isSIC
		 * Признак того, что пользователь является сотрудником SIC
		 */
		/**
		 * Создает меню с горизонтально расположенными кнопками
		 * @param {Array} buttons набор кнопок
		 * @returns {qqext.view.menu.HButtonMenu} меню
		 */
		qqext.createHButtonMenu = function(buttons) {
			return Ext.create('qqext.view.menu.HButtonMenu', buttons,
					'qqext.button.ToolButton');
		};

		// создаем все меню
		qqext.Menu.init();
	}
});

