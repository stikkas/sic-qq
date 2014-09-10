/**
 * Панелька "Передача на исполнение" одноименной формы
 */

Ext.define('qqext.view.transmission.VTransmission', {
	alias: 'VTransmission',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.factory.Checkbox',
		'qqext.factory.TextField',
		'Ext.form.FieldContainer',
		'Ext.form.FieldSet',
		'qqext.Menu'
	],
	title: 'Передача на исполнение',
	height: 400,
	maxHeight: 400,
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 5,
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
					ns.getButton(ns.btns.search).fireEvent('click');
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
				factory = ns.factory,
				ComboBox = factory.ComboBox,
				DateField = factory.DateField,
				TextField = factory.TextField,
				configForDate = {
					labelAlign: 'right',
					margin: '6 0 0 0'
				};

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.FieldContainer', {
					layout: 'hbox',
					items: [
						new ComboBox('Ответственный за исполнение', 'allUsers',
								'responsibleForExecution'),
						new DateField('Дата', 'responsibleForExecutionDate').cfg(configForDate)
					]
				}),
				Ext.create('Ext.form.FieldContainer', {
					layout: 'hbox',
					items: [
						new ComboBox('ФИО исполнителя', 'allUsers', 'executorName'),
						new DateField('Дата', 'executorDate').cfg(configForDate)
					]
				}),
				new factory.Checkbox('Контроль', 'control'),
				new DateField('Контрольная дата исполнения', 'controlDateOfExecution'),
				Ext.create('Ext.form.FieldSet', {
					collapsible: true,
					title: 'Дополнительная информация',
					layout: 'vbox',
					items: [
						new TextField('Автор резолюции', 'resolutionAuthor'),
						new ComboBox('Территория хранилища', 'storageTerritory', 'storageTerritory'),
						new TextField('Название хранилища', 'storageName')
					]
				})
			],
			menus: ns.createHButtonMenu([
				{text: labels.edit, action: edit},
				{text: labels.save, action: save},
				{text: labels.remove, action: remove},
				{text: labels.register, action: book}])
		});
		me.callParent(arguments);
		ns.Menu.editReqMenu.insert(2, me.menus);
	}
});
