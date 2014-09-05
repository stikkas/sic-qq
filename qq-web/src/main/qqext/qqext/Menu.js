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
		articleMenu: null,
		/**
		 * Этот статический метод необходимо вызвать перед запуском приложения.
		 */
		init: function() {
			var
					menus = qqext.Menu,
					labels = qqext.labels,
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
				{text: labels.quit, action: qqext.quitAction}
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
				qqext.getButton('jvk').fireEvent('click');
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Редактировать"
			 * @private
			 * @returns {undefined}
			 */
			function edit() {
				//TODO: разобраться что эта функция должна делать
				var form = qqext.getCurrentForm();
				form.setDisabled(!form.isDisabled());
				form.doLayout();
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Сохранить"
			 * @private
			 * @returns {undefined}
			 */
			function save() {
				qqext.mainController.syncModel()
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
				qqext.mainController.syncModel()
						.getModel().destroy({
					success: function() {
						alert('Успешно удалено');
						qqext.getButton('search').fireEvent('click');
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
				var model = qqext.mainController.currentModel = Ext.create('qqext.model.qq.Question');

				model.setNotification(Ext.create('qqext.model.qq.Notification'));
				model.setApplicant(Ext.create('qqext.model.qq.Applicant'));
				model.setTransmission(Ext.create('qqext.model.qq.Transmission'));
				model.setExecutionInfo(Ext.create('qqext.model.qq.ExecutionInfo'));
				model.setWayToSend(Ext.create('qqext.model.qq.WayToSend'));
				qqext.regForm.loadRecord(model);

				qqext.getButton('regRequest').fireEvent('click');
			}
			/**
			 * Обрабатывает событие 'click' на кнопке "Поиск",  вызывается
			 * только для подразделов 'Поиск' и 'ЖВК'
			 * @private
			 */
			function find() {
				qqext.getCurrentForm().exec();
			}
			/**
			 * Обрабатывает событие 'click' на кнопке "Очистить", вызывается
			 * только для подразделов 'Поиск' и 'ЖВК'
			 * @private
			 */
			function clear() {
				qqext.getCurrentForm().reset();
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "В начало"
			 * @private
			 * @returns {undefined}
			 */
			function toStartPage() {
				qqext.setActivePage(0);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "ЖВК" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function jvk() {
				qqext.setCurrentForm(0);
				Ext.getStore('journal').load();
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Поиск" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function search() {
				qqext.setCurrentForm(1);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Отчетные документы" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function documents() {
				qqext.setCurrentForm(2);
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Регистрация запроса" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function regRequest() {
				editMenuLayout.setActiveItem(1);
				var me = qqext.mainController;
				me.syncModel();

				if (qqext.setCurrentForm(3))
					qqext.regForm.loadRecord(me.getModel());
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Уведомление заявителю" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function notifyRequestor() {
				editMenuLayout.setActiveItem(2);
				var me = qqext.mainController;
				me.syncModel();

				if (qqext.setCurrentForm(4)) {
					var
							model = me.getModel(),
							notify = model.getNotification();

					if (!notify) {
						console.debug('model.getNotification undefined, creating new instance');
						var n = Ext.create('qqext.model.qq.Notification');
						model.setNotification(n);
						qqext.notifyForm.loadRecord(n);
					} else {
						console.log('notification: ' + notify.getData());
						qqext.notifyForm.loadRecord(notify);
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
				var me = qqext.mainController;
				me.syncModel();
				if (qqext.setCurrentForm(5))
					qqext.transForm.loadRecord(me.getModel().getTransmission());
			}

			/**
			 * Обрабатывает событие 'click' на кнопке "Исполнение запроса" в панели разделов
			 * @private
			 * @returns {undefined}
			 */
			function toComplete() {
				editMenuLayout.setActiveItem(1);
				var me = qqext.mainController;
				me.syncModel();
				if (qqext.setCurrentForm(6))
					qqext.execForm.loadRecord(me.getModel());
			}

		}
	}
});
