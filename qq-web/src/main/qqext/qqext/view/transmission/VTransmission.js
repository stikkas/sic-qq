/**
 * Панелька "Передача на исполнение" одноименной формы
 */

Ext.define('qqext.view.transmission.VTransmission', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.factory.Checkbox',
		'qqext.factory.TextField',
		'Ext.form.FieldContainer',
		'Ext.form.FieldSet'
	],
	title: 'Передача на исполнение',
	height: 400,
	maxHeight: 400,
	initComponent: function() {
		var configForDate = {
			labelAlign: 'right',
			margin: '6 0 0 0'
		},
		me = this,
				factory = qqext.factory,
				ComboBox = factory.ComboBox,
				DateField = factory.DateField,
				TextField = factory.TextField;

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
			]
		});
		me.callParent(arguments);
	}
});
