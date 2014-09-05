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
		'qqext.Menu'
	],
	controllers: ['qqext.controller.Main'],
	launch: function() {
		// Временно для отладки. В рабочей версии убрать
		// Настраиваем глобальные переменные
		this.initQQ();
		var user = Ext.create('hawk_common.model.User'),
				userStore = qqext.userStore = Ext.create('hawk_common.store.UserLocalStorage');

		user.set('id', 'current');
		user.set('name', 'fake');
		user.set('access', 'allowall');
		userStore.add(user);
		userStore.sync();
		Ext.create('qqext.view.Viewport', {});
		return;
		//-------------------------
		Ext.Ajax.request({
			url: '/qq-web/Rules',
			success: function(response) {
				// Настраиваем глобальные переменные
				this.initQQ();
				var authRes = Ext.decode(response.responseText),
						user = Ext.create('hawk_common.model.User'),
						userStore = qqext.userStore = Ext.create('hawk_common.store.UserLocalStorage');

				user.set('id', 'current');
				user.set('name', authRes.msg);
				user.set('access', authRes.access);
				userStore.add(user);
				userStore.sync();

				Ext.create('qqext.view.Viewport', {});
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
		 * @property {Ext.container.Container} searchForm
		 * Форма поиска. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {Ext.container.Container} regForm
		 * Форма регистрации запроса. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.StyledPanel} notifyForm
		 * Форма уведомления заявителя. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {qqext.view.StyledPanel} transForm
		 * Форма передачи на исполнение. Инициализируется в {@link qqext.view.MainPage#initComponent}.
		 */
		/**
		 * @property {Ext.container.Container} execForm
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
		/*
		 * Различные кнопки, на которые нужно иметь ссылки по ходу дела. Обращаться к ним
		 * только через интерфейс getButton и addButton.
		 */
		var buttons = [];
		/**
		 * Возвращает кнопку из зарегестрированных, по заданному имени. Необходим для
		 * программного нажатия на кнопку.
		 * @param {String} name имя кнопки
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
		 * @param {String} name имя кнопки
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
		 * Вызывается когда нажали на кнопку 'Выйти'
		 * @method quitAction
		 */
		qqext.quitAction = function() {
			// молча, без выстерла событий, удаляем все данные из хранилища
			qqext.userStore.removeAll(true);
			window.location = qqext.urls.login;
		};

		// Создаем все меню
		qqext.Menu.init();
	}
});

