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

	var
			menus = qqext.Menu,
			consts = qqext.Constants,
			labels = consts.labels,
			urls = consts.urls,
			//меню редактирования при выбранных разделах: 'Уведомления заявителю'
			requestorNotifyEdit = createHButtonMenu([
				{text: labels.save, action: saveNotify},
				{text: labels.edit, action: editNotify}
			]),
			//меню редактирования при выбранных подразделах:
			//'Регистрация запросов', 'Передача на исполнение', 'Исполнение запроса'
			requestEdit = createHButtonMenu([
				{text: labels.toSearch, action: returnToSearch},
				{text: labels.edit, action: edit},
				{text: labels.save, action: save},
				{text: labels.remove, action: remove},
				{text: labels.register, action: book}
			]),
			// меню редактирования при выбранных подразделах: 'ЖВК', 'Поиск', 'Отчетные документы'
			searchEdit = createHButtonMenu([
				{text: labels.add, action: add},
				{text: labels.search, action: find},
				{text: labels.clean, action: clear}
			]),
			// меню с подразделами поиска (основное)
			searchMenu = createVButtonMenu([
				{text: labels.jvk, action: jvk, name: 'jvk'},
				{text: labels.search, action: search, name: 'search'},
				{text: labels.reports, action: documents}
			]),
			// меню с подразделами запроса
			requestMenu = createVButtonMenu([
				{text: labels.reqRegister, action: regRequest, name: 'regRequest'},
				{text: labels.reqNotify, action: notifyRequestor},
				{text: labels.transToComplete, action: transmitToComplete},
				{text: labels.complete, action: toComplete}
			]);

	menus.navigation = createHButtonMenu([
		{text: labels.toBegin, action: toStartPage},
		{text: labels.quit, action: consts.quitAction}
	]);

	menus.editMenu = createCardMenuPanel([searchEdit, requestEdit, requestorNotifyEdit]);
	menus.articleMenu = createCardMenuPanel([searchMenu, requestMenu]);
	var
			editMenuLayout = menus.editMenu.getLayout(),
			articleMenuLayout = menus.articleMenu.getLayout();

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
		editMenuLayout.setActiveItem(0);
		articleMenuLayout.setActiveItem(0);
		consts.getButton('jvk').fireEvent('click');
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Редактировать"
	 * @private
	 * @returns {undefined}
	 */
	function edit() {
		//TODO: разобраться что эта функция должна делать
		var form = consts.getCurrentForm();
		form.setDisabled(!form.isDisabled());
		form.doLayout();
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Сохранить"
	 * @private
	 * @returns {undefined}
	 */
	function save() {
		consts.mainController.syncModel()
				.getModel().save(function(rec, op, suc) {
			console.log('is saving success?: ' + suc);
		});
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Удалить"
	 * @private
	 * @returns {undefined}
	 */
	function remove() {
		consts.mainController.syncModel()
				.getModel().destroy({
			success: function() {
				alert('Успешно удалено');
				consts.getButton('search').fireEvent('click');
			},
			failure: function() {
				alert('Ошибка при удалении');
			}
		});
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Регистрировать".
	 * TODO реализовать метод
	 * @private
	 * @returns {undefined}
	 */
	function book() {
		console.log('Регистрировать');
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Сохранить" при выбранном разделе
	 * "Уведомление заявителю"
	 * @private
	 * @returns {undefined}
	 */
	function saveNotify() {
		//TODO: реализовать
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Редактировать"  при выбранном разделе
	 * "Уведомление заявителю"
	 * @private
	 * @returns {undefined}
	 */
	function editNotify() {
		//TODO: реализовать
	}
	/**
	 * Обрабатывает событие 'click' на кнопке "Добавить"
	 * @private
	 * @returns {undefined}
	 */
	function add() {
		editMenuLayout.setActiveItem(1);
		articleMenuLayout.setActiveItem(1);
		var model = consts.mainController.currentModel = Ext.create('qqext.model.qq.Question');

		model.setNotification(Ext.create('qqext.model.qq.Notification'));
		model.setApplicant(Ext.create('qqext.model.qq.Applicant'));
		model.setTransmission(Ext.create('qqext.model.qq.Transmission'));
		model.setExecutionInfo(Ext.create('qqext.model.qq.ExecutionInfo'));
		model.setWayToSend(Ext.create('qqext.model.qq.WayToSend'));
		consts.regForm.loadRecord(model);

		consts.getButton('regRequest').fireEvent('click');
	}
	/**
	 * Обрабатывает событие 'click' на кнопке "Поиск"
	 * @private
	 * @returns {undefined}
	 */
	function find() {
		var
				model = qqext.model.qq.SearchCritery,
				form = consts.getCurrentForm();

		switch (form.$className) {
			case 'qqext.view.search.VSearchForm':
				form.updateRecord(model);
				var dataWithoutNulls = model.getData();
				Ext.data.writer.Json
						.dropNullsAndUndefinedFields(dataWithoutNulls);
				Ext.getStore('searchResults').load({
					params: {
						q: Ext.encode(dataWithoutNulls)
					}
				});
				break;
			case 'qqext.view.journal.VJournalForm':
				Ext.getStore('journal').reload();
		}
	}
	/**
	 * Обрабатывает событие 'click' на кнопке "Очистить"
	 * @private
	 * @returns {undefined}
	 */
	function clear() {
		var controller = consts.mainController;

		switch (controller.getMainCont().$className) {
			case 'qqext.view.search.VSearchForm' :
				Ext.getStore('searchResults').removeAll();
				controller.clearSearchParams();
				controller.getMainCont().loadRecord(controller.getSearchParams());
				break;
			case 'qqext.view.journal.VJournalForm' :
				Ext.getStore('journal').filters.clear();
				controller.getMainCont().clearCriterias();
				Ext.getStore('journal').loadPage(1);
				break;
			default :
				break;
		}
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "В начало"
	 * @private
	 * @returns {undefined}
	 */
	function toStartPage() {
		consts.setActivePage(0);
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "ЖВК" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function jvk() {
		consts.setCurrentForm(0);
		Ext.getStore('journal').load();
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Поиск" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function search() {
		consts.setCurrentForm(1);
//		consts.searchForm.loadRecord(consts.mainController.getSearchParams());
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Отчетные документы" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function documents() {
		consts.setCurrentForm(2);
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Регистрация запроса" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function regRequest() {
		editMenuLayout.setActiveItem(1);
		var me = consts.mainController;
		me.syncModel();

		if (consts.setCurrentForm(3))
			consts.regForm.loadRecord(me.getModel());
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Уведомление заявителю" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function notifyRequestor() {
		editMenuLayout.setActiveItem(2);
		var me = consts.mainController;
		me.syncModel();

		if (consts.setCurrentForm(4)) {
			var
					model = me.getModel(),
					notify = model.getNotification();

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
		editMenuLayout.setActiveItem(1);
		var me = consts.mainController;
		me.syncModel();
		if (consts.setCurrentForm(5))
			consts.transForm.loadRecord(me.getModel().getTransmission());
	}

	/**
	 * Обрабатывает событие 'click' на кнопке "Исполнение запроса" в панели разделов
	 * @private
	 * @returns {undefined}
	 */
	function toComplete() {
		editMenuLayout.setActiveItem(1);
		var me = consts.mainController;
		me.syncModel();
		if (consts.setCurrentForm(6))
			consts.execForm.loadRecord(me.getModel());
	}

});
