Ext.Loader.setConfig({
	enabled: true,
	paths: {
		qqext: 'qqext',
		over: 'overrides'
	}
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
		'qqext.store.Dict',
		'qqext.store.DictSV',
		'qqext.store.DictSCV',
		'Ext.util.Filter',
		'qqext.view.StatusPanel',
		'over.DatePicker',
		'over.ComboBox'
	],
	controllers: ['qqext.controller.Main',
		'qqext.controller.AttachedFiles'
	],
	launch: function () {
		var me = this;
		Ext.Ajax.request({
			url: 'rest/userinfo',
			success: function (response) {
				// TODO В будущем, если расщепим storage и qq удалить сохранение в локальное хранилище
				// Сейча здесь его не испльзуем, и объект user - тоже
				var authRes = Ext.decode(response.responseText),
						ns = qqext,
						user = Ext.create('hawk_common.model.User'),
						userStore = ns.userStore = Ext.create('hawk_common.store.UserLocalStorage');

				user.set('id', 'current');
				user.set('name', authRes.name);
				user.set('access', authRes.access);
				user.set('userId', authRes.userId);
				user.set('organization', authRes.organization);

				// Новые переменные в namespace qqext
				ns.fio = authRes.name;
				ns.userId = authRes.userId;
				ns.orgId = authRes.organization;
				ns.coor = authRes.coor;
				ns.exec = authRes.exec;
				ns.reg = authRes.reg;
				ns.superex = authRes.superex;
				ns.visor = authRes.supervis;
				ns.sicId = authRes.sicId;
				ns.isSIC = authRes.sic;

				userStore.add(user);
				userStore.sync();

				// загружаем справочники
				me.initStores();

				// Настраиваем глобальные переменные
				me.initQQ();

				// Создаем главный виджет
				Ext.create('Viewport', {});

				// скрываем кнопку уведомления
				if (!ns.isSIC)
					ns.getButton(ns.btns.notify).hide();

				// Настраиваем перенаправление на страницу авторизации в случае 
				// прекращения сессии сервером
				Ext.Ajax.on('requestexception', function (conn, response) {
					if (response.status === 403)
						ns.forceQuit();
				});
				Ext.Ajax.on('requestcomplete', function (c, response) {
					setTimeout(function () {
						if (~response.responseText.search(/<!DOCTYPE/i))  // Если rest вернул страницу авторизации
							ns.forceQuit();
					}, 1);
				});

				// Загружаем настройки для прикрепленных файлов
				var codes = ['QQ_ANSWER_DOC', 'QQ_APPLICANT_DOC', 'QQ_INFO_DOC', 'QQ_DOC_ROOT',
					'URL_ROOT', 'DOCUMENT_ROOT'];
				Ext.Ajax.request({
					url: 'rest/dict/coreparameter',
					method: 'GET',
					params: {code: codes},
					success: function (result) {
						var paths = ns.atpaths = {},
								applicationDir, urlRoot,
								applicantDir, sendDir, infoDir,
								root;
						Ext.decode(result.responseText).forEach(function (v) {
							switch (v.code) {
								case codes[0]:
									sendDir = v.value + "/";
									break;
								case codes[1]:
									applicantDir = v.value + "/";
									break;
								case codes[2]:
									infoDir = v.value + "/";
									break;
								case codes[3]:
									applicationDir = v.value + "/";
									break;
								case codes[4]:
									urlRoot = v.value;
									break;
								case codes[5]:
									root = v.value + "/";
							}
						});
						sendDir = applicationDir + sendDir;
						applicantDir = applicationDir + applicantDir;
						infoDir = applicationDir + infoDir;
						paths.fsend = root + sendDir;
						paths.fappl = root + applicantDir;
						paths.finfo = root + infoDir;
						paths.uinfo = urlRoot + infoDir;
						paths.usend = urlRoot + sendDir;
						paths.uappl = urlRoot + applicantDir;
					}
				});
			},
			failure: function (response) {
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
	initQQ: function () {
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
		 * - 2 - qqext.view.report.VReportForm Отчетные документы
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
		 * @property {qqext.view.report.VReportForm} reportForm
		 * Форма отчетов. Инициализируется в {@link qqext.view.MainPage#initComponent}.
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
		 * @property {Object} atpaths
		 * Параметры системы для прикрепляемых файлов(задаются в CORE_PARAMETER)
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
		 * @property {Object} model
		 * Объект с моделями текущего запроса.
		 */
		ns.creq = {
			q: null, // Модель регистрации запроса
			n: null, // Модель уведомления запроса
			t: null, // Модель передачи на исполнение запроса
			e: null // Модель исполнения запроса
		};
		/**
		 * Устанавливает модель в первоначальное состояние (обнуляет)
		 * @method resetModel
		 */
		ns.resetModel = function () {
			for (var o in ns.creq)
				ns.creq[o] = null;
		};
		/**
		 * @property {Number} msPhour
		 * кол-во миллисекунд в часу
		 */
		ns.msPhour = 1000 * 60 * 60;
		/**
		 * @property {Number} msPday
		 * кол-во миллисекунд в дне
		 */
		ns.msPday = ns.msPhour * 24;
		/*
		 * Различные кнопки, на которые нужно иметь ссылки по ходу дела. Обращаться к ним
		 * только через интерфейс {@link #getButton} и {@link #addButton}.
		 */
		var buttons = [];
		/**
		 * @property {Ext.button.Button} articles
		 * кнопки разделов, нужны для переключения активной кнопки
		 */
		var articles = ns.articles = [];
		/**
		 * Возвращает кнопку из зарегестрированных, по заданному имени. Необходим для
		 * программного нажатия на кнопку.
		 * @param {String/Number} name имя кнопки
		 * @returns {Obejct/undefined} если такая кнопка есть, то кнопку, иначе undefined
		 * @method getButton
		 */
		var getButton = ns.getButton = function (name) {
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
		 * Используется для "Регистрация", "Передача на исполнение", "Исполнение запроса"
		 * @method edit
		 */
		ns.edit = function () {
			var me = this,
					admin = ns.visor,
					model = ns.creq.q;
			if (me === ns.regForm) {
				if (admin &&
						model.get('status') !== ns.statsId[statuses.onreg]) {
					me._disableButtons(false, 1);
					me.setAdminMode();
				} else {
					me.setViewOnly(false);
					me._disableButtons(false, 1, 3, 4);
				}
			} else if (me === ns.transForm) {
				if (admin &&
						model.get('status') !== ns.statsId[statuses.reg]) {
					me._disableButtons(false, 1);
					me.setAdminMode();
				} else {
					me.setViewOnly(false);
					me._disableButtons(false, 1, 2, 3);
				}
			} else { // Исполнение запроса
				var status = model.get('status');
				if (status === ns.statsId[statuses.onexec]) {
					me.setViewOnly(false);
					me._disableButtons(false, 1, 2, 3);
				} else if (status === ns.statsId[statuses.exec]) {
					if (admin) {
						me.setAdminMode();
					}
					me.setEditMode();
					me._disableButtons(false, 1);
				}
			}
			me._disableButtons(true, 0);
			me.doLayout();
		};

		/**
		 * Добавляет кнопку в набор, если такой еще нет
		 * @param {String/Number} name имя кнопки
		 * @param {Ext.button.Button} button сама кнопка
		 * @method addButton
		 */
		ns.addButton = function (name, button) {
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
			print: "Печать",
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
			storage: "База данных о местах хранения документов по личному составу",
			asq: "АИС Запросы",
			generate: "Сформировать"
		};
		/**
		 * @property {Object} urls URLs для доступа к серверу
		 */
		var urls = ns.urls = {
			welcome: "/qq-web/",
			logout: "/qq-web/logout",
			storage: "/sic-storage/index.html",
			vypiska: "reports/vypiska",
			statexec1: "reports/statexecquery1",
			statexec2: "reports/statexecquery2",
			statexec3: "reports/statexecquery3",
			statexec4: "reports/statexecquery4",
			reqnoti: "reports/uvedomlenie"
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
			toSearch: 8, // Кнопка "Вернуться в поиск"
			report: 9 // Кнопка "Отчетные документы"
		};
		/**
		 * @property {Object} statsId
		 * соотношения кодов статуса к его идентификаторам
		 */
		/**
		 * @property {Object} statsName
		 * соотношения кодов статуса к их описаниям
		 */
		/**
		 * @property {Object} stats
		 * кодовые значения статусов запросов
		 */
		var statuses = ns.stats = {
			onreg: 'Q_VALUE_QSTAT_ONREG',
			reg: 'Q_VALUE_QSTAT_REG',
			onexec: 'Q_VALUE_QSTAT_ONEXEC',
			exec: 'Q_VALUE_QSTAT_EXEC'
		};
		/**
		 * @property {Object} notiStatsId
		 * соотношения кодов статусов уведомлений к их идентификаторам
		 */
		/**
		 * @property {Object} notiStatsName
		 * соотношения кодов статусов уведомлений к их описаниям
		 */
		/**
		 * @property {Object} notiStats
		 * кодовые значения статусов уведомления запросов
		 */
		ns.notiStats = {
			noexec: 'Q_VALUE_NOTIFY_NOEXEC',
			exec: 'Q_VALUE_NOTIFY_EXEC',
			send: 'Q_VALUE_NOTIFY_SEND',
			none: 'Q_VALUE_NOTIFY_NONE'
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
					model = ns.creq.q,
					statsId = ns.statsId,
					onreg = toa.onreg || (toa.onreg = statsId[statuses.onreg]),
					registered = toa.reg || (toa.reg = statsId[statuses.reg]),
					onexec = toa.onexec || (toa.onexec = statsId[statuses.onexec]),
					exec = toa.exec || (toa.exec = statsId[statuses.exec]),
					status,
					buttons = arguments.length > 0 ? arguments : [
						buttonNames.notify, buttonNames.trans, buttonNames.exec],
					i = 0, max = buttons.length;

			for (; i < max; ++i) {
				switch (buttons[i]) {
					case buttonNames.notify:
						if (ns.isSIC) {
							if ((ns.reg || ns.coor || ns.exec || ns.visor || ns.superex) &&
									model.get('status') !== onreg &&
									model.get('execOrg') !== ns.sicId && model.get('litera') === ns.sicId)
								ns.disableArticles(false, buttonNames.notify);
						}
						break;
					case buttonNames.trans:
						if ((ns.reg || ns.coor || ns.exec || ns.visor || ns.superex)) {
							if (model.get('status') !== onreg)
								ns.disableArticles(false, buttonNames.trans);
						}
						break;
					case buttonNames.exec:
						if ((ns.reg || ns.coor || ns.exec || ns.visor || ns.superex)) {
							var status = model.get('status');
							if (status === onexec || status === exec)
								ns.disableArticles(false, buttonNames.exec);
						}
				}
			}
		};
		/**
		 * Выключает/Включает кнопки левого меню
		 * @param {Boolean} status true - сделать неактивным
		 * @param {qqext.btns} btns Дополнительно передаются кнопки, которые необходимо выключить или включить
		 * @method disableArticles
		 */
		ns.disableArticles = function (status) {
			for (var i = 1; i < arguments.length; ++i)
				getButton(arguments[i]).setDisabled(status);
		};
		/**
		 * Вызывается в случае таймаута сессии во время работы.
		 * @method forceQuit
		 */
		ns.forceQuit = function () {
			ns.userStore.removeAll(true);
			window.location = urls.welcome;
		};
		/**
		 * Вызывается когда нажали на кнопку 'Выйти'
		 * @method quitAction
		 */
		ns.quitAction = function () {
			// молча, без выстерла событий, удаляем все данные из хранилища
			ns.userStore.removeAll(true);
			window.location = urls.logout;
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
		 * @property {String} fio
		 * Отображаемое имя пользователя (ФИО)
		 */
		/**
		 * @property {Number} userId
		 * Идентификатор  пользователя 
		 */
		/**
		 * @property {Number} orgId
		 * Идентификатор  организации пользователя 
		 */
		/**
		 * @property {Boolean} isSIC
		 * Признак того, что пользователь является сотрудником SIC
		 */
		/**
		 * @property {Boolean} reg
		 * Признак того, что пользователь имеет право регистрировать запросы
		 */
		/**
		 * @property {Boolean} coor
		 * Признак того, что пользователь имеет право назначать исполнителей
		 */
		/**
		 * @property {Boolean} exec
		 * Признак того, что пользователь имеет право исполнять запросы
		 */
		/**
		 * @property {Boolean} superex
		 * Признак того, что пользователь имеет право суперисполнителя
		 */
		/**
		 * @property {Boolean} visor
		 * Признак того, что пользователь имеет право супервизора
		 */
		/**
		 * @porperty {Ext.container.Container} statusPanel
		 * Панель для отображения статуса запроса.
		 * Инициализируется в qqext.Menu.
		 */
		/**
		 * @porperty {Boolean} infoChanged
		 * Флаг сигнализирующий о том что информация в каком-то запросе изменилась
		 * и требуется обновление данных в ЖВК и Поиск
		 */
		/**
		 * Обновляет информацию в ЖВК и поиске, после сохранения
		 * @method updateInfo
		 */
		ns.updateInfo = function () {
			if (ns.infoChanged) {
				ns.jvkForm.exec();
				ns.searchForm.exec();
				ns.infoChanged = false;
			}
		};

		/**
		 * Открывает существующий запрос. Срабатывает по двойному щелчку в поиске или ЖВК
		 * @param {Object} view сам grid компонент
		 * @param {Object} record запись, по которой щелкнули
		 * @method openRequest
		 */
		ns.openRequest = function (view, record) {
			ns.resetModel();
			ns.model.Question.load(record.get('id'), {callback: function (r, o, s) {
					if (s) {
						ns.creq.q = r;
						ns.disableArticles(true, buttonNames.notify, buttonNames.trans, buttonNames.exec);
						ns.turnOnArticles();
						ns.Menu.setArticleMenu(1);
						getButton(buttonNames.toSearch).form = ns.getCurrentForm();
						getButton(buttonNames.reg).fireEvent('click');
						ns.statusPanel.setStatus();
					} else {
						ns.showError("Ошибка загрузки данных", o.getError());
					}
				}});
		};
		/**
		 * Выставляет активную кнопку раздела, с предыдущей снимает выделение
		 * @param {Ext.button.Button} button кнопка, которую нужно сделать активной
		 */
		ns.switchArticleButton = function (button) {
			var cls = 'active-article';
			for (var i = 0, max = articles.length; i < max; ++i)
				articles[i].removeCls(cls);
			button.addCls(cls);
		};
		/**
		 * Показывает ошибки в диалоговом окне
		 * @param {String} title заголовок окна
		 * @param {String} message сообщение об ошибке
		 * @method showError
		 */
		ns.showError = function (title, message) {
			if (message instanceof Object) {
				if (message.statusText) {
					message = message.statusText;
				} else {
					console.log(message);
					return;
				}
			}
			if (~message.search(/<!DOCTYPE/i)) { // Если rest вернул страницу авторизации
				ns.forceQuit();
				return;
			}
			Ext.Msg.show({
				title: title,
				msg: message,
				buttons: Ext.Msg.OK,
				icon: Ext.Msg.ERROR,
//				cls: 'err_msg',
				maxWidth: 800
			});

		};
		/**
		 * Идентификатор СИЦ
		 * @property {Number} sicId
		 */

		/**
		 * Устанавливает звездочки для обязательных полей формы
		 * @param {Object} form объект, относительно которого искать поля
		 * @method initRequired
		 */
		ns.initRequired = function (form) {
			Ext.ComponentQuery.query('field', form).forEach(function (it) {
				if (it.initRequired)
					it.initRequired();
			});
		};
		/**
		 * Проверяет значения полей дат на допустимые.
		 * Исползуется формат 'd.m.Y'.
		 * @param {Ext.form.field.Date[]} dates компоненты дат
		 * @return {Boolean} если все хорошо, то true, иначе false
		 * @method checkDates
		 */
		ns.checkDates = function (dates) {
			var wrongDates = [];
			dates.forEach(function (v) {
				var date = v.getValue();
				if (date && !Ext.Date.format(date, 'd.m.Y'))
					wrongDates.push(v.fieldLabel + ": Неправильная дата");
			});
			if (wrongDates.length) {
				ns.showError("Ошибка", wrongDates.join("<br>"));
				return false;
			}
			return true;
		};
		// создаем все меню
		ns.Menu.init();
	},
	initStores: function () {
		var ns = qqext,
				create = Ext.create,
				ids = ns.stIds = {
					litera: 'litera', // Литеры, названия архивов
					execs: 'executors', // Исполнители определенного архива
					allexecs: 'allexecutors', // Исполнители всех архивов
					regusers: 'regusers', // регистраторы всех архивов
					stats: 'statuses', // Статусы запроса
					sendType: 'sendtypes', // Форма выдачи ответа (Способ отправки)
					notiStats: 'notistats', // Статусы уведомления
					queryType: 'querytypes', // Типы запросов
					apltype: 'applicantypes', // Типы заявителей (юрик, физик)
					aplcat: 'applicantcategory', // Категории заявителей 
					resans: 'resultanswer', // Результаты ответа
					docdeltype: 'docdeliverytype', // Способ передачи
					doctype: 'doctype', // Типы документов
					storage: 'storages', // Территория хранилица
					tematic: 'answertematic', // Тематика ответа
					difcat: 'difcategory', // Категория сложности
					stage: 'coorstage' // Этап согласования документа
				},
		dictSV = 'qqext.store.DictSV',
				dict = 'qqext.store.Dict',
				dictSCV = 'qqext.store.DictSCV';
		// нужно инициализировать хранилище для информации об организациях
		// и установить принадлежность пользователся к СИЦ
		create(dictSV, ids.litera);
		create(dictSV, ids.apltype);
		create(dict, ids.aplcat);
		create(dict, ids.execs);
		create(dict, ids.docdeltype);
		create(dict, ids.allexecs);
		create(dict, ids.regusers);
		create(dict, ids.doctype);
		create(dict, ids.storage);
		create(dict, ids.sendType);
		create(dict, ids.tematic);
		create(dict, ids.difcat);
		create(dict, ids.stage);
		create(dictSCV, ids.queryType);
		create(dictSV, ids.resans);
		create(dictSV, ids.stats, {
			listeners: {
				load: function (st, records) {
					ns.statsId = {};
					ns.statsName = {};
					records.forEach(function (r) {
						var code = r.get('shortValue');
						ns.statsId[code] = r.get('id');
						ns.statsName[code] = r.get('text');
					});
					ns.statusPanel.fill();
				}
			}
		});
		create(dictSV, ids.notiStats, {
			listeners: {
				load: function (st, records) {
					ns.notiStatsId = {};
					ns.notiStatsName = {};
					records.forEach(function (r) {
						var code = r.get('shortValue');
						ns.notiStatsId[code] = r.get('id');
						ns.notiStatsName[code] = r.get('text');
					});
				}
			}
		});
	}
});

