/**
 * Пакет для различных меню системы
 * @author С. Благодатских
 */


Ext.define('qqext.Menu', {
	requires: [
		'qqext.Constants',
		'qqext.view.menu.HButtonMenu',
		'qqext.view.menu.VButtonMenu',
		'Ext.panel.Panel',
		'qqext.button.ToolButton',
		'qqext.button.ArticleButton'
	],
	statics: {
		/**
		 * Меню для перехода между подсистемами и завершения сеанса.
		 */
		navigation: null,
		/**
		 * Набор меню редактирования (горизонтальные верхние меню)
		 */
		editMenu: null,
		/**
		 * Набор меню подразделов (вертикальные левые меню)
		 */
		articleMenu: null
	}
}, function() {

	var menus = qqext.Menu,
			//меню редактирования при выбранных разделах: 'Уведомления заявителю'
			requestorNotifyEdit = createHButtonMenu([
				{text: "Сохранить", action: saveNotify},
				{text: "Редактировать", action: editNotify}
			]),
			//меню редактирования при выбранных подразделах:
			//'Регистрация запросов', 'Передача на исполнение', 'Исполнение запроса'
			requestEdit = createHButtonMenu([
				{text: "Вернуться в поиск", action: returnToSearch},
				{text: "Редактировать", action: edit},
				{text: "Сохранить", action: save},
				{text: "Удалить", action: remove},
				{text: "Регистрировать", action: book}
			]),
			// меню редактирования при выбранных подразделах: 'ЖВК', 'Поиск', 'Отчетные документы'
			searchEdit = createHButtonMenu([
				{text: "Добавить", action: add},
				{text: "Поиск", action: find},
				{text: "Очистить", action: clear}
			]),
			// меню с подразделами поиска (основное)
			searchMenu = createVButtonMenu([
				{text: "ЖВК", action: jvk, name: 'jvk'},
				{text: "Поиск", action: search},
				{text: "Отчетные документы", action: documents}
			]),
			// меню с подразделами запроса
			requestMenu = createVButtonMenu([
				{text: "Регистрация запроса", action: regRequest, name: 'regRequest'},
				{text: "Уведомление заявителю", action: notifyRequestor},
				{text: "Передача на исполнение", action: transmitToComplete},
				{text: "Исполнение запроса", action: toComplete}
			]),
			consts = qqext.Constants;

	menus.navigation = createHButtonMenu([
		{text: "В начало", action: toStartPage},
		{text: "Выйти", action: quit}
	]);

	menus.editMenu = createCardMenuPanel([searchEdit, requestEdit, requestorNotifyEdit]);
	menus.articleMenu = createCardMenuPanel([searchMenu, requestMenu]);

//----------Вспомогательные функции-----------------
	/**
	 * Создает набор меню с layout = 'card' расположением
	 * @private
	 * @param {Array} menus набор меню
	 * @returns {Ext.panel.Panel} панель с набором
	 */
	function createCardMenuPanel(menus) {
		return Ext.create('Ext.panel.Panel', {
			layout: 'card',
			flex: 2,
			activeItem: 0,
			items: menus
		});
	}

	/**
	 * Создает меню с горизонтально расположенными кнопками
	 * @private
	 * @param {Array} buttons набор кнопок
	 * @returns {qqext.view.menu.HButtonMenu} меню
	 */
	function createHButtonMenu(buttons) {
		return Ext.create('qqext.view.menu.HButtonMenu', {
			_buttons: buttons, _type: 'qqext.button.ToolButton'
		});
	}

	/**
	 * Создает меню с вертикально расположенными кнопками
	 * @private
	 * @param {Array} buttons набор кнопок
	 * @returns {qqext.view.menu.VButtonMenu} меню
	 */
	function createVButtonMenu(buttons) {
		return Ext.create('qqext.view.menu.VButtonMenu', {
			_buttons: buttons, _type: 'qqext.button.ArticleButton'
		});
	}

	/**
	 * Обрабатывает событие 'click' на кнопке 'Вернуться в поиск'
	 * @private
	 * @returns {undefined}
	 */
	function returnToSearch() {
		menus.editMenu.getLayout().setActiveItem(0);
		menus.articleMenu.getLayout().setActiveItem(0);
		consts.getButton('jvk').fireEvent('click');
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Редактировать"
	 * @private
	 * @returns {undefined}
	 */
	function edit() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Сохранить"
	 * @private
	 * @returns {undefined}
	 */
	function save() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Удалить"
	 * @private
	 * @returns {undefined}
	 */
	function remove() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Регистрировать"
	 * @private
	 * @returns {undefined}
	 */
	function book() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Сохранить" при выбранном разделе
	 * "Уведомление заявителю"
	 * @private
	 * @returns {undefined}
	 */
	function saveNotify() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Редактировать"  при выбранном разделе
	 * "Уведомление заявителю"
	 * @private
	 * @returns {undefined}
	 */
	function editNotify() {
	}
	/**
	 * Обрабатывает событие 'click' на кнопке "Добавить"
	 * @private
	 * @returns {undefined}
	 */
	function add() {
		menus.editMenu.getLayout().setActiveItem(1);
		menus.articleMenu.getLayout().setActiveItem(1);
		consts.getButton('regRequest').fireEvent('click');
	}
	/**
	 * Обрабатывает событие 'click' на кнопке "Поиск"
	 * @private
	 * @returns {undefined}
	 */
	function find() {
	}
	/**
	 * Обрабатывает событие 'click' на кнопке "Очистить"
	 * @private
	 * @returns {undefined}
	 */
	function clear() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "В начало"
	 * @private
	 * @returns {undefined}
	 */
	function toStartPage() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Выйти"
	 * @private
	 * @returns {undefined}
	 */
	function quit() {
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "ЖВК" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function jvk() {
		consts.mainPanel.getLayout().setActiveItem(0);
		Ext.getStore('journal').load();
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Поиск" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function search() {
		consts.mainPanel.getLayout().setActiveItem(1);
		consts.searchForm.loadRecord(consts.mainController.getSearchParams());
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Отчетные документы" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function documents() {
		consts.mainPanel.getLayout().setActiveItem(2);
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Регистрация запроса" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function regRequest() {
		menus.editMenu.getLayout().setActiveItem(1);
		var me = consts.mainController;
		me.syncModel();
		if (me.currentQueryFormSection === 'REGISTRATION') {
			console.log('already registration');
			return;
		} else {
			consts.mainPanel.getLayout().setActiveItem(3);
			consts.regForm.loadRecord(me.getModel());
			me.currentQueryFormSection = 'REGISTRATION';
		}
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Уведомление заявителю" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function notifyRequestor() {
		menus.editMenu.getLayout().setActiveItem(2);
		var me = consts.mainController;
		me.syncModel();
		if (me.currentQueryFormSection === 'NOTIFICATION') {
			console.log('already notification');
			return;
		} else {
			consts.mainPanel.getLayout().setActiveItem(4);
			var
					model = me.getModel(),
					notify = model.getNotification();
			me.currentQueryFormSection = 'NOTIFICATION';
			if (!notify) {
				console.debug('model.getNotification undefined, creating new instance');
				var n = Ext.create('qqext.model.qq.Notification');
				model.setNotification(n);
				consts.notifyForm.loadRecord(n);
			} else {
				console.log('notification: ' + notify.getData());
				consts.notifyForm.loadRecord(notify);
			}
		}
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Передача на исполнение" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function transmitToComplete() {
		menus.editMenu.getLayout().setActiveItem(1);
		var me = consts.mainController;
		me.syncModel();
		if (me.currentQueryFormSection === 'TRANSMISSION') {
			console.log('already transmission');
			return;
		} else {
			consts.mainPanel.getLayout().setActiveItem(5);
			consts.transForm.loadRecord(me.getModel().getTransmission());
			me.currentQueryFormSection = 'TRANSMISSION';
		}
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Исполнение запроса" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function toComplete() {
		menus.editMenu.getLayout().setActiveItem(1);
		var me = consts.mainController;
		me.syncModel();
		if (me.currentQueryFormSection === 'EXECUTION') {
			console.log('already execution');
			return;
		} else {
			consts.mainPanel.getLayout().setActiveItem(6);
			consts.execForm.loadRecord(me.getModel());
			me.currentQueryFormSection = 'EXECUTION';
		}
	}

});