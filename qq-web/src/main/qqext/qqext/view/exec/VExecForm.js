/**
 * Форма исполнения запроса
 */
Ext.define('qqext.view.exec.VExecForm', {
	extend: 'Ext.container.Container',
	requires: [
		'qqext.view.exec.VExecInfo',
		'qqext.view.exec.VDeliveryOfDocuments',
		'qqext.view.exec.VCoordination',
		'qqext.view.exec.VDeliveryMethod',
		'qqext.Menu'
	],
	overflowY: 'auto',
	disabled: false,
	maskOnDisable: false,
	height: 300,
	initComponent: function() {
		//----------обработчики для кнопок меню---------
		//sc - контекст для обработчика
		/**
		 * Обрабатывает событие 'click' на кнопке "Редактировать"
		 * @private
		 * @returns {undefined}
		 */
		function edit() {
			//TODO: разобраться что эта функция должна делать
			this.setDisabled(!this.isDisabled());
			this.doLayout();
		}

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 * @returns {undefined}
		 */
		function save() {
			ns.mainController.syncModel()
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
			ns.mainController.syncModel()
					.getModel().destroy({
				success: function() {
					ns.getButton('search').fireEvent('click');
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
			console.log(this);
		}
		//----------------------------------------------
		var me = edit.sc = save.sc = remove.sc = book.sc = this,
				ns = qqext,
				labels = ns.labels,
				menus = ns.createHButtonMenu([
					{text: labels.edit, action: edit},
					{text: labels.save, action: save},
					{text: labels.remove, action: remove},
					{text: labels.register, action: book}]);
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.exec.VExecInfo'),
				Ext.create('qqext.view.exec.VDeliveryOfDocuments'),
				Ext.create('qqext.view.exec.VCoordination'),
				Ext.create('qqext.view.exec.VDeliveryMethod')
			],
			menus: menus
		});
		me.callParent(arguments);
		ns.Menu.editReqMenu.insert(3, me.menus);
	},
	setDisabled: function(disabled) {
		var me = this,
				items = me.items.items,
				max = items.length;
		for (var i = 0; i < max; ++i) {
			items[i].setDisabled(disabled);
		}
		me.disabled = disabled;
	},
	isDisabled: function() {
		return this.disabled;
	},
	loadRecord: function(model) {
		var items = this.items.items,
				max = items.length;
		items[0].loadRecord(model.getExecutionInfo());
		for (var i = 1; i < max; ++i)
			items[i].loadRecord(model);
	},
	updateRecord: function(model) {
		var items = this.items.items,
				max = items.length;
		items[0].updateRecord(model.getExecutionInfo());
		for (var i = 1; i < max; ++i)
			items[i].updateRecord(model);
		return model;
	}
});
