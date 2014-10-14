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
		'qqext.model.Notification',
		'qqext.model.Applicant',
		'qqext.model.ExecutionInfo',
		'qqext.model.WayToSend',
		'qqext.view.StatusPanel'
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
		 * | backToSearch | add | editReqMenu |
		 * ------------------------------
		 * backToSearch - кнопка, открытого доступа нет.
		 * add - добавить новый запрос.
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
		 * Устанавливает необходимый набор левых меню:
		 *  - 0 - меню поиска
		 *  - 1 - меню работы с запросом
		 * @method setArticleMenu
		 */
		setArticleMenu: null,
		/**
		 * Устанавливает верхнее меню в соответствии с отображаемой формой
		 * @param {Number} idx индекс меню
		 */
		setEditMenu: function (idx) {
			var menus = qqext.Menu;
			if (idx < 3)
				menus._layout1.setActiveItem(menus._forms[idx]);
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
		init: function () {
			var
					ns = qqext,
					menus = ns.Menu,
					labels = ns.labels,
					btns = ns.btns,
					getButton = ns.getButton,
					createCmp = Ext.create,
					// меню редактирования при выбранных подразделах: 'ЖВК', 'Поиск', 'Отчетные документы'
					searchEdit = createCmp('HButtonMenu', [
						{text: labels.add, action: add, name: btns.add, opts: {cls: 'add_btn'}},
						{text: labels.search, action: find, opts: {cls: 'search_btn'}},
						{text: labels.clean, action: clear, opts: {cls: 'clean_btn'}}
					], 'ToolButton'),
					// меню с подразделами поиска (основное)
					searchMenu = createCmp('VButtonMenu', [
						{text: labels.jvk, action: jvk, name: btns.jvk},
						{text: labels.search, action: search, name: btns.search},
						{text: labels.reports, action: documents}
					], 'ArticleButton'),
					// меню с подразделами запроса
					requestMenu = createCmp('VButtonMenu', [
						{text: labels.reqRegister, action: regRequest, name: btns.reg},
						{text: labels.reqNotify, action: notifyRequestor, name: btns.notify},
						{text: labels.transToComplete, action: transmitToComplete, name: btns.trans},
						{text: labels.complete, action: toComplete, name: btns.exec}
					], 'ArticleButton');

			//Панель отображения запроса
			ns.statusPanel = createCmp('StatusPanel');
			requestMenu.add(ns.statusPanel);
			menus.navigation = createCmp('HButtonMenu', [
				{text: labels.toBegin, action: toStartPage, opts: {cls: 'to_begin_btn'}},
				{text: labels.quit, action: ns.quitAction, opts: {cls: 'quit_btn'}}
			], 'ToolButton');
			// Инициализация пустого меню для редактирвания в режиме работы с запросом
			menus.editReqMenu = createCardMenuPanel([]);
			menus.editMenu = createCardMenuPanel([searchEdit,
				// Меню с кнопкой "Вернуться в поиск" и различными меню для редактирования
				createCmp('Ext.panel.Panel', {
					layout: 'hbox',
					items: [createCmp('HButtonMenu', [{text: labels.toSearch, action: returnToSearch,
								name: btns.toSearch},
							{text: labels.add, action: function () {
									add(true);
								}, opts: {cls: 'add_btn'}}], 'ToolButton'),
						menus.editReqMenu],
					cls: 'back_btn h'
				})]);
			menus.articleMenu = createCardMenuPanel([searchMenu, requestMenu]);
			// Слои для переключения активных элементов картбоксов.
			var
					editMenuLayout = menus._layout1 = menus.editMenu.getLayout(),
					editReqMenuLayout = menus._layout2 = menus.editReqMenu.getLayout(),
					articleMenuLayout = menus.articleMenu.getLayout();

			menus.setArticleMenu = function (idx) {
				articleMenuLayout.setActiveItem(idx);
			};
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
			 * Обрабатывает событие 'click' на кнопке 'Вернуться в поиск'
			 * @param {Ext.button.Button} btn кнопка, по которой жмакнули
			 * @private
			 * @returns {undefined}
			 */
			function returnToSearch(btn) {
				// Удаляем ссылку на запрос, с которым работали
				ns.request = null;
				editMenuLayout.setActiveItem(0);
				articleMenuLayout.setActiveItem(0);
				ns.setCurrentForm(btn.form);
//				getButton(btns.jvk).fireEvent('click');
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Добавить"
			 * @param {Boolean} force если true, то переключаем на jvk и обратно
			 * @private
			 * @returns {undefined}
			 */
			function add(force) {
				// Только с ролью регистратор можно добавлять запрос
				if (ns.user.isAllowed(ns.rules.reg)) {
					if (force === true) {
						ns.setCurrentForm(0);
					} else {
						getButton(btns.toSearch).form = ns.getCurrentForm();
					}
					ns.request = null;
					// Переключаем форму, дальше все выполняется в форме по событию
					// 'activate'
					articleMenuLayout.setActiveItem(1);
					// Все вкладки кроме "Регистрация запроса" делаем недоступными
					ns.disableArticles(true, btns.notify, btns.trans, btns.exec);
					getButton(btns.reg).fireEvent('click');
				}
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
				ns.setCurrentForm(4);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Передача на исполнение" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function transmitToComplete() {
				ns.setCurrentForm(5);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Исполнение запроса" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function toComplete() {
				ns.setCurrentForm(6);
			}

		}
	}
});
