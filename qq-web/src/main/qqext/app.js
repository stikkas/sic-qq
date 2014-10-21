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
		'qqext.store.DictValuesStore',
		'qqext.store.DictStore',
		'Ext.util.Filter',
		'qqext.view.StatusPanel'
	],
	controllers: ['qqext.controller.Main',
		'qqext.controller.AttachedFiles'
	],
	launch: function () {
		var me = this;
		Ext.Ajax.request({
			url: '/qq-web/Rules',
			success: function (response) {
				var authRes = Ext.decode(response.responseText),
						ns = qqext,
						user = ns.user = Ext.create('hawk_common.model.User'),
						userStore = ns.userStore = Ext.create('hawk_common.store.UserLocalStorage');
				// нужно инициализировать хранилище для информации об организациях
				// и установить принадлежность пользователся к СИЦ
				Ext.create('DictValuesStore',
						'inboxDocExecOrg', 'ORG_STRUCTURE', {
							listeners: {
								load: function (st, records) {
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
				// загружаем справочники
				me.initStores(authRes.organization, user);
				// Настраиваем глобальные переменные
				me.initQQ();
				Ext.create('Viewport', {});

				Ext.Ajax.on('requestexception', function (conn, response) {
					if (response.status === 403)
						ns.quitAction();
				});

				// Загружаем настройки для прикрепленных файлов
				var codes = ['QQ_ANSWER_DOC', 'QQ_APPLICANT_DOC', 'QQ_DOC_ROOT',
					'URL_ROOT', 'DOCUMENT_ROOT'];
				Ext.Ajax.request({
					url: '/qq-web/rest/coreparameter',
					method: 'GET',
					params: {code: codes},
					success: function (result) {
						var paths = ns.atpaths = {},
								applicationDir, urlRoot,
								applicantDir, sendDir,
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
									applicationDir = v.value + "/";
									break;
								case codes[3]:
									urlRoot = v.value;
									break;
								case codes[4]:
									root = v.value + "/";
							}
						});
						sendDir = applicationDir + sendDir;
						applicantDir = applicationDir + applicantDir;
						paths.fsend = root + sendDir;
						paths.fappl = root + applicantDir;
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
		 * @property {Ext.data.Model} request
		 * Текущий запрос (модель Question)
		 */
		/**
		 * @property {Number} msPday
		 * кол-во миллисекунд в дне
		 */
		ns.msPday = 1000 * 60 * 60 * 24;
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
		 * @method edit
		 */
		ns.edit = function () {
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
			admin: "АРМ-Администратор",
			asq: "АИС Запросы"
		};
		/**
		 * @property {Object} urls URLs для доступа к серверу
		 */
		var urls = ns.urls = {
			welcome: "/qq-web/",
			login: "/qq-web/Auth?action=logout&redirect=1",
			storage: "/sic-storage/index.html",
			admin: "/arm-admin/login.jsf"
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
		 * @property {Object} rules
		 * кодовые значения для ролей пользователей.
		 */
		var rules = ns.rules = {
			reg: 'Q_RULE_REGISTRATOR',
			crd: 'Q_RULE_COORDINATOR',
			exec: 'Q_RULE_EXECUTOR'
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
					rules = ns.rules,
					user = ns.user,
					request = ns.request,
					statsId = ns.statsId,
					// TODO: сделать что-то чтобы проверять по кодам статуса а не по ID из таблицы
					onreg = toa.onreg || (toa.onreg = statsId[statuses.onreg]),
					registered = toa.reg || (toa.reg = statsId[statuses.reg]),
					onexec = toa.onexec || (toa.onexec = statsId[statuses.onexec]),
					exec = toa.exec || (toa.exec = statsId[statuses.exec]),
					trans = toa.trans || (toa.trans = statsId[statuses.trans]),
					notify = toa.notify || (toa.notify = statsId[statuses.notify]),
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
						if (user.isAllowed([rules.crd, rules.exec, rules.reg])) {
							if (request.get('status') !== onreg)
								ns.disableArticles(false, buttonNames.trans);
						}
						break;
					case buttonNames.exec:
						if (user.isAllowed([rules.exec, rules.crd, rules.reg])) {
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
		 * @param {qqext.btns} btns Дополнительно передаются кнопки, которые необходимо выключить или включить
		 * @method disableArticles
		 */
		ns.disableArticles = function (status) {
			for (var i = 1; i < arguments.length; ++i)
				getButton(arguments[i]).setDisabled(status);
		};
		/**
		 * Вызывается когда нажали на кнопку 'Выйти'
		 * @method quitAction
		 */
		ns.quitAction = function () {
			// молча, без выстерла событий, удаляем все данные из хранилища
			ns.userStore.removeAll(true);
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
		ns.openRequest = function (view, record) {
			ns.model.Question.load(record.get('id'), {callback: function (r, o, s) {
					if (s) {
						ns.request = r;
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
			articles.forEach(function (b) {
				b.removeCls(cls);
				console.log("removed from " + b.text);
			});
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
	initStores: function (organization) {
		var ns = qqext,
				create = Ext.create,
				ids = ns.stIds = {
					litera: 'litera',
					users: 'users',
					allusers: 'allusers',
					stats: 'statuses'
				};
		create('DictStore', ids.litera, ids.litera, organization);
		create('DictStore', ids.users, ids.users, organization);
		create('DictStore', ids.allusers, ids.users);
		create('DictStore', ids.stats, ids.stats, {
			listeners: {
				load: function (st, records) {
					ns.statsId = {};
					ns.statsName = {};
					records.forEach(function (r) {
						var code = r.get('code');
						ns.statsId[code] = r.get('id');
						ns.statsName[code] = r.get('name');
					});
					ns.statusPanel.fill();
				}
			}
		});
	}
});

