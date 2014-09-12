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
		'qqext.cmp.FieldContainer',
		'qqext.cmp.FieldSet',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
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
		var
				ns = qqext,
				labels = ns.labels,
				createCmp = Ext.create,
				configForDate = {
					labelAlign: 'right',
					margin: '6 0 0 0'
				};
		// scope for buttons
		edit.sc = save.sc = remove.sc = book.sc = this;

		Ext.applyIf(this, {
			items: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						createCmp('FComboBox', 'Ответственный за исполнение', 'allUsers',
								'responsibleForExecution'),
						createCmp('FDateField', 'Дата', 'responsibleForExecutionDate', configForDate)
					]
				}),
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						createCmp('FComboBox', 'ФИО исполнителя', 'allUsers', 'executorName'),
						createCmp('FDateField', 'Дата', 'executorDate', configForDate)
					]
				}),
				createCmp('FCheckbox', 'Контроль', 'control'),
				createCmp('FDateField', 'Контрольная дата исполнения', 'controlDateOfExecution'),
				createCmp('FieldSet', {
					collapsible: true,
					title: 'Дополнительная информация',
					layout: 'vbox',
					items: [
						createCmp('FTextField', 'Автор резолюции', 'resolutionAuthor'),
						createCmp('FComboBox', 'Территория хранилища', 'storageTerritory', 'storageTerritory'),
						createCmp('FTextField', 'Название хранилища', 'storageName')
					]
				})
			],
			menus: createCmp('HButtonMenu', [
				{text: labels.edit, action: edit},
				{text: labels.save, action: save},
				{text: labels.remove, action: remove},
				{text: labels.register, action: book}],
					'ToolButton')
		});
		this.callParent(arguments);
		ns.Menu.editReqMenu.insert(2, this.menus);
	}
});
