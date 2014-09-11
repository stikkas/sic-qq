/**
 * Пакет для различных меню системы
 * @author С. Благодатских
 */


Ext.define('qqext.Menu', {
	requires: [
		'qqext.view.menu.HButtonMenu',
		'qqext.view.menu.VButtonMenu',
		'Ext.panel.Panel',
		'qqext.button.ToolButton',
		'qqext.button.ArticleButton',
		'qqext.model.qq.Notification',
		'qqext.model.qq.Applicant',
		'qqext.model.qq.Transmission',
		'qqext.model.qq.ExecutionInfo',
		'qqext.model.qq.WayToSend',
		'qqext.model.qq.SearchCritery'
	],
	statics: {
		/**
		 * @property {Object} navigation
		 * Меню для перехода между подсистемами и завершения сеанса.
		 */
		navigation: null,
		/*
		 * Горизонтальные верхние меню представляют из себя панель следующего вида:
		 * -------------------------
		 * | editMenu | navigation |
		 * -------------------------
		 * где editMenu в свою очеред представляет из себя панель со слоем 'card'.
		 * т.е. в один момент времени может отображаться только один элемент панели.
		 * Элементами этой панели являются:
		 * --------------
		 * | searchEdit | - панель с горизонтальным расположением кнопок для меню поиск и жвк. Закрытая
		 * --------------   доступа из вне нет, т.к. не представляет пока интереса.
		 * -----------
		 * | reqEdit | - панель для работы в режиме работы с запросом, тоже закрыта для доступа напрямую.
		 * -----------
		 * regEdit представляет собой простую панель с layout = 'hbox' и содержащей элементы:
		 * ------------------------------
		 * | backToSearch | editReqMenu |
		 * ------------------------------
		 * backToSearch - кнопка, открытого доступа нет.
		 * editReqMenu - панель с layout = 'card'. Содержит кнопки для работы с запросом на разных этапах.
		 */
		/**
		 * @property {Ext.panel.Panel} editMenu
		 * Набор меню редактирования (горизонтальные верхние меню):
		 *
		 *  - 0 - меню для форм поиска и жвк ["добавить" "поиск" "очистить"]
		 *  - 1 - меню для форм работы с запросом
		 */
		editMenu: null,
		/**
		 * @property {Ext.panel.Panel} editReqMenu
		 * меню для редактирования при работе с запросом
		 *
		 * - 0 - меню для формы регистрации запроса ["редактировать" "сохранить" "удалить" "регистрировать"]
		 * - 1 - меню для формы уведомления заявителю ["сохранить" "редактировать"]
		 * - 2 - меню для формы передачи на исполнение ["редактировать" "сохранить" "удалить" "регистрировать"]
		 * - 3 - меню для формы исполнение запроса ["редактировать" "сохранить" "удалить" "регистрировать"]
		 *
		 * Для каждой формы берется свое меню из расчета что для разных форм
		 * кнопки могут иметь различное отображение (где-то недоступны, где-то - доступны).
		 */
		editReqMenu: null,
		/**
		 * @property {Object} articleMenu
		 * Набор меню подразделов (вертикальные левые меню)
		 */
		articleMenu: null,
		/**
		 * Устанавливает верхнее меню в соответствии с отображаемой формой
		 * @param {Number} idx индекс меню
		 */
		setEditMenu: function(idx) {
			var menus = qqext.Menu;
			if (idx < 3)
				menus._layout1.setActiveItem(menus._forms[idx])
			else {
				menus._layout1.setActiveItem(1);
				menus._layout2.setActiveItem(menus._forms[idx]);
			}
		},
		/**
		 * Карта соответствий форм меню редактирования.
		 * Первые три для форм поиска, последние 4 для форм работы с запросом
		 * @private
		 */
		_forms: [0, 0, 0, 0, 1, 2, 3],
		/**
		 * Слой для переключения между меню редактирования и меню поиска
		 * @private
		 */
		_layout1: null,
		/**
		 * Слой для переключения между меню редактирования в разных вкладках запроса
		 * @private
		 */
		_layout2: null,
		/**
		 * Этот статический метод необходимо вызвать перед запуском приложения.
		 */
		init: function() {
			var
					ns = qqext,
					menus = ns.Menu,
					labels = ns.labels,
					btns = ns.btns,
					getButton = ns.getButton,
					createCmp = Ext.create,
					//меню редактирования при выбранных разделах: 'Уведомления заявителю'

					// меню редактирования при выбранных подразделах: 'ЖВК', 'Поиск', 'Отчетные документы'
					searchEdit = ns.createHButtonMenu([
						{text: labels.add, action: add, name: btns.add},
						{text: labels.search, action: find},
						{text: labels.clean, action: clear}
					]),
					// меню с подразделами поиска (основное)
					searchMenu = createVButtonMenu([
						{text: labels.jvk, action: jvk, name: btns.jvk},
						{text: labels.search, action: search, name: btns.search},
						{text: labels.reports, action: documents}
					]),
					// меню с подразделами запроса
					requestMenu = createVButtonMenu([
						{text: labels.reqRegister, action: regRequest, name: btns.reg},
						{text: labels.reqNotify, action: notifyRequestor, name: btns.notify},
						{text: labels.transToComplete, action: transmitToComplete, name: btns.trans},
						{text: labels.complete, action: toComplete, name: btns.exec}
					]);

			menus.navigation = ns.createHButtonMenu([
				{text: labels.toBegin, action: toStartPage},
				{text: labels.quit, action: ns.quitAction}
			]);
			// Инициализация пустого меню для редактирвания в режиме работы с запросом
			menus.editReqMenu = createCardMenuPanel([]);
			menus.editMenu = createCardMenuPanel([searchEdit,
				// Меню с кнопкой "Вернуться в поиск" и различными меню для редактирования
				createCmp('Ext.panel.Panel', {
					layout: 'hbox',
					items: [ns.createHButtonMenu([{text: labels.toSearch, action: returnToSearch}]),
						menus.editReqMenu]
				})]);
			menus.articleMenu = createCardMenuPanel([searchMenu, requestMenu]);
			// Слои для переключения активных элементов картбоксов.
			var
					editMenuLayout = menus._layout1 = menus.editMenu.getLayout(),
					editReqMenuLayout = menus._layout2 = menus.editReqMenu.getLayout(),
					articleMenuLayout = menus.articleMenu.getLayout();

//----------Вспомогательные функции-----------------
			/**
			 * Создает набор меню с layout = 'card' расположением
			 * @private
			 * @param {Array} menus набор меню
			 * @returns {Ext.panel.Panel} панель с набором
			 */
			function createCardMenuPanel(menus) {
				return createCmp('Ext.panel.Panel', {
					layout: 'card',
					flex: 2,
					activeItem: 0,
					items: menus
				});
			}

			/**
			 * Создает меню с вертикально расположенными кнопками
			 * @private
			 * @param {Array} buttons набор кнопок
			 * @returns {qqext.view.menu.VButtonMenu} меню
			 */
			function createVButtonMenu(buttons) {
				return createCmp('qqext.view.menu.VButtonMenu',
						buttons, 'qqext.button.ArticleButton');
			}

			/**
			 * Обрабатывает событие 'click' на кнопке 'Вернуться в поиск'
			 * @private
			 * @returns {undefined}
			 */
			function returnToSearch() {
				editMenuLayout.setActiveItem(0);
				articleMenuLayout.setActiveItem(0);
				getButton(btns.jvk).fireEvent('click');
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Добавить"
			 * @private
			 * @returns {undefined}
			 */
			function add() {
				ns.request = null;
				// Переключаем форму, дальше все выполняется в форме по событию
				// 'activate'
				articleMenuLayout.setActiveItem(1);
				getButton(btns.reg).fireEvent('click');
			}
			/**
			 * Обрабатывает событие 'click' на кнопке "Поиск",  вызывается
			 * только для подразделов 'Поиск' и 'ЖВК'
			 * @private
			 */
			function find() {
				ns.getCurrentForm().exec();
			}
			/**
			 * Обрабатывает событие 'click' на кнопке "Очистить", вызывается
			 * только для подразделов 'Поиск' и 'ЖВК'
			 * @private
			 */
			function clear() {
				ns.getCurrentForm().reset();
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "В начало"
			 * @private
			 * @returns {undefined}
			 */
			function toStartPage() {
				ns.setActivePage(0);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "ЖВК" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function jvk() {
				ns.setCurrentForm(0);
				Ext.getStore('journal').load();
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Поиск" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function search() {
				ns.setCurrentForm(1);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Отчетные документы" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function documents() {
				ns.setCurrentForm(2);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Регистрация запроса" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function regRequest() {
				ns.setCurrentForm(3);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Уведомление заявителю" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function notifyRequestor() {
				editReqMenuLayout.setActiveItem(1);
				var me = ns.mainController;
				me.syncModel();

				if (ns.setCurrentForm(4)) {
					var
							model = me.getModel(),
							notify = model.getNotification();

					if (!notify) {
						console.debug('model.getNotification undefined, creating new instance');
						var n = createCmp('qqext.model.qq.Notification');
						model.setNotification(n);
						ns.notifyForm.loadRecord(n);
					} else {
						console.log('notification: ' + notify.getData());
						ns.notifyForm.loadRecord(notify);
					}
				}
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Передача на исполнение" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function transmitToComplete() {
				editReqMenuLayout.setActiveItem(2);
				var me = ns.mainController;
				me.syncModel();
				if (ns.setCurrentForm(5))
					ns.transForm.loadRecord(me.getModel().getTransmission());
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Исполнение запроса" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function toComplete() {
				editReqMenuLayout.setActiveItem(3);
				var me = ns.mainController;
				me.syncModel();
				if (ns.setCurrentForm(6))
					ns.execForm.loadRecord(me.getModel());
			}

		}
	}
});
