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
//			params: {username: 'ARCHIVE_USER'},
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
								load: function(st, records) {
									var record, max = records.length, i = 0;
									for (; i < max; ++i) {
										record = records[i];
										if (record.get('code') === 'Q_VALUE_MEMBER_SIC')
											ns.sicId = record.get('id');
									}
									ns.isSIC = ns.sicId === authRes.organization;
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
		var ns = qqext;
		// Глобальные переменные и константы для namespace qqext.
		// Названо классом для того, чтобы jsduck задокументировал это.
		/**
		 * @class qqext
		 */
		/**
		 * @property {Ext.container.Viewport} viewport основной экран приложения
		 * инициалзируется в qqext.view.Viewport
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
		 * @property {hawk_common.store.UserLocalStorage} userStore
		 * Хранилище с правами пользователей. Иницализируется при старте приложения.
		 */
		/**
		 * @property {Ext.data.Model} request
		 * Текущий запрос (модель Question)
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
		var getButton = ns.getButton = function(name) {
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
		 * Работа кнопки "Редактировать" одинакова на всех формах:
		 * отключить себя, включить все другие кнопки, сделать форму доступной
		 * для редактирования.
		 * @method edit
		 */
		ns.edit = function() {
			var me = this;
			me.setViewOnly(false);
			me._disableButtons(false, 1, 2, 3);
			me._disableButtons(true, 0);
			me.doLayout();
		};

		/**
		 * Добавляет кнопку в набор, если такой еще нет
		 * @param {String/Number} name имя кнопки
		 * @param {Ext.button.Button} button сама кнопка
		 * @method addButton
		 */
		ns.addButton = function(name, button) {
			if (!getButton(name))
				buttons.push({name: name, body: button});
		};
		/**
		 * @property {Object} labels
		 * Текстовые надписи приложения (на кнопках, заголовки и т.д.)
		 */
		ns.labels = {
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
		var urls = ns.urls = {
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
		var buttonNames = ns.btns = {
			add: 1, // Кнопка "Добавить" новый запрос
			jvk: 2, // Кнопка "ЖВК"
			search: 3, // Кнопка "Поиск"
			reg: 4, // Кнопка "Регистрация запроса"
			notify: 5, // Кнопка "Уведомление заявителю"
			trans: 6, // Кнопка "Передача на исполнение"
			exec: 7, // Кнопка "Исполнение запроса"
			toSearch: 8 // Кнопка "Вернуться в поиск"
		};
		/**
		 * @property {Object} rules
		 * кодовые значения для ролей пользователей.
		 */
		var rules = ns.rules = {
			reg: 'Q_RULE_REGISTRATOR',
			crd: 'Q_RULE_COORDINATOR',
			exec: 'Q_RULE_EXECUTOR'
		};
		/**
		 * @property {Object} stats
		 * кодовые значения статусов заросов
		 */
		var statuses = ns.stats = {
			onreg: 'Q_VALUE_QSTAT_ONREG',
			reg: 'Q_VALUE_QSTAT_REG',
			onexec: 'Q_VALUE_QSTAT_ONEXEC',
			exec: 'Q_VALUE_QSTAT_EXEC',
			trans: 'Q_VALUE_QSTAT_TRANS',
			notify: 'Q_VALUE_QSTAT_NOTIFY'
		};
		/**
		 * Делает доступной кнопку раздела для работы с ним. Проверяет правоправность действия, если
		 * у пользователя соответствующей роли нет, то ничего не происходит. Этот метод
		 * не включает раздел на редактирование.
		 * Схема работы такая: сначала выключаем все кнопки с помощью функции qqext.disableArticles,
		 * затем включаем все кнопки с помощью qqext.turnOnArticles.
		 * Кнопку регистрации никогда не включаем и не выключаем. Право переключение на вкладку работы с
		 * запросами проверяем перед переключением.
		 * (одноименная кнопка в меню регистрации запроса)
		 * @param {qqext.btns.btn} button кнопка или кнопки которые необходимо включить, если не передается
		 * то включает все кнопки
		 * @method turnOnArticles
		 */
		ns.turnOnArticles = function toa() {
			var
					user = ns.user,
					request = ns.request,
					// TODO: сделать что-то чтобы проверять по кодам статуса а не по ID из таблицы
					onreg = toa.onreg || (toa.onreg = ns.getStatusId(statuses.onreg)),
					registered = toa.reg || (toa.reg = ns.getStatusId(statuses.reg)),
					onexec = toa.onexec || (toa.onexec = ns.getStatusId(statuses.onexec)),
					exec = toa.exec || (toa.exec = ns.getStatusId(statuses.exec)),
					trans = toa.trans || (toa.trans = ns.getStatusId(statuses.trans)),
					notify = toa.notify || (toa.notify = ns.getStatusId(statuses.notify)),
					status,
					buttons = arguments.length > 0 ? arguments : [
						buttonNames.notify, buttonNames.trans, buttonNames.exec],
					i = 0, max = buttons.length;

			for (; i < max; ++i) {
				switch (buttons[i]) {
					case buttonNames.notify:
						if (ns.isSIC) {
							if (user.isAllowed([rules.reg, rules.crd, rules.exec]) &&
									(request.get('status') === trans || request.get('status') === notify))
								ns.disableArticles(false, buttonNames.notify);
						}
						break;
					case buttonNames.trans:
						if (user.isAllowed([rules.crd, rules.exec])) {
							var status = request.get('status');
							if (status === registered || status === onexec || status === exec)
								ns.disableArticles(false, buttonNames.trans);
						}
						break;
					case buttonNames.exec:
						if (user.isAllowed(rules.exec)) {
							var status = request.get('status');
							if (status === onexec || status === exec)
								ns.disableArticles(false, buttonNames.exec);
						}
				}
			}
		};
		/**
		 * Выключает/Включает кнопки левого меню
		 * @param {Boolean} status true - сделать неактивным
		 * @param {qqext.btns} Дополнительно передаются кнопки, которые необходимо выключить или включить
		 * @method disableArticles
		 */
		ns.disableArticles = function(status) {
			for (var i = 1; i < arguments.length; ++i)
				getButton(arguments[i]).setDisabled(status);
		};
		/**
		 * Вызывается когда нажали на кнопку 'Выйти'
		 * @method quitAction
		 */
		ns.quitAction = function() {
			// молча, без выстерла событий, удаляем все данные из хранилища
			qqext.userStore.removeAll(true);
			window.location = urls.login;
		};
		/**
		 * @property {Obejct} applicant
		 * Поля для модели и формы "Заявителя". Каждое свойство объекта
		 * представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.Applicant.
		 */
		/**
		 * @property {Obejct} transmission
		 * Поля для модели и формы "Передача на исполнение". Каждое свойство объекта
		 * представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.Transmission.
		 */
		/**
		 * @property {Obejct} notification
		 * Поля для модели и формы "Уведомление заявителю". Каждое свойство объекта
		 * представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.Notification.
		 */
		/**
		 * @property {Obejct} execInfo
		 * Поля для модели и формы "Исполнение запроса"->"Сведения об исполнении".
		 * Каждое свойство объекта представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.ExecutionInfo.
		 */
		/**
		 * @property {Obejct} delAction
		 * Поля для модели и формы "Исполнение запроса"->"Выдача документов".
		 * Каждое свойство объекта представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.DeliveryAction.
		 */
		/**
		 * @property {Obejct} usedMaterial
		 * Поля для модели и формы "Исполнение запроса"->"Выдача документов"->
		 * "Используемые материалы".
		 * Каждое свойство объекта представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.UsedMaterial.
		 */
		/**
		 * @property {Obejct} coordination
		 * Поля для модели и формы "Исполнение запроса"->"Согласование документа".
		 * Каждое свойство объекта представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.Coordination.
		 */
		/**
		 * @property {Obejct} sendAction
		 * Поля для модели и формы "Исполнение запроса"->"Способ отправки"->"Способы отправки".
		 * Каждое свойство объекта представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.SendAction.
		 */
		/**
		 * @property {Obejct} wayToSend
		 * Поля для модели и формы "Исполнение запроса"->"Способ отправки".
		 * Каждое свойство объекта представляет собой массив из двух значений:
		 *
		 *  - 0 - наименование поля формы (оно же и поля модели, и поля сущности)
		 *  - 1 - метка для поля формы
		 *
		 *  Иницализируется в qqext.model.qq.WayToSend.
		 */
		/**
		 * @property {Boolean} isSIC
		 * Признак того, что пользователь является сотрудником SIC
		 */
		/**
		 * @porperty {Ext.container.Container} statusPanel
		 * Панель для отображения статуса запроса.
		 * Инициализируется в qqext.Menu.
		 */

		/**
		 * Открывает существующий запрос. Срабатывает по двойному щелчку в поиске или ЖВК
		 * @param {Object} view сам grid компонент
		 * @param {Object} record запись, по которой щелкнули
		 * @method openRequest
		 */
		ns.openRequest = function(view, record) {
			ns.model.Question.load(record.get('id'), {callback: function(r, o, s) {
					if (s) {
						ns.request = r;
						ns.disableArticles(true, buttonNames.notify, buttonNames.trans, buttonNames.exec);
						ns.turnOnArticles();
						ns.Menu.setArticleMenu(1);
						getButton(buttonNames.reg).fireEvent('click');
						ns.statusPanel.setStatus();
					} else {
						ns.showError("Ошибка загрузки данных", o.getError());
					}
				}});
		};
		/**
		 * Показывает ошибки в диалоговом окне
		 * @param {String} title заголовок окна
		 * @param {String} message сообщение об ошибке
		 * @method showError
		 */
		ns.showError = function(title, message) {
			if (message instanceof Object) {
				if (message.statusText) {
					message = message.statusText;
				} else {
					console.log(message);
					return;
				}
			}
			Ext.Msg.show({
				title: title,
				msg: message,
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.ERROR,
				cls: 'err_msg',
				maxWidth: 800
			});

		};
		// Пока так, в будущем, когда буду дорабатывать программу, надо обязательно переделать
		/**
		 * Возвращает id статуса запроса для заданного кодового значения
		 * @param {String} code код для статуса
		 * @returns {Number/undefined} номер id соответстующего коду
		 */
		ns.getStatusId = function(code) {
			var statusId;
			Ext.getStore('Q_DICT_QUESTION_STATUSES').
					findBy(function(record, id) {
						if (record.get('code') === code) {
							statusId = id;
							return true;
						}
						return false;
					});
			return statusId;
		};
		/**
		 * Идентификатор СИЦ
		 * @property {Number} sicId
		 */

		// создаем все меню
		ns.Menu.init();
	}
});

