/**
 * Панелька "Передача на исполнение" одноименной формы
 */

Ext.define('qqext.view.transmission.VTransmission', {
	extend: 'qqext.view.StyledPanel',
	title: 'Передача на исполнение',
	height: 400,
	maxHeight: 400,
	initComponent: function() {
		var me = this;
		var execMgr = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: 'Ответственный за исполнение',
			name: 'responsibleForExecution',
			store: 'allUsers',
			displayField: 'name',
			valueField: 'id'
		});

		var d1 = Ext.create('Ext.form.field.Date', {
			fieldLabel: 'Дата',
			labelAlign: 'right',
			margin: '6 0 0 0',
			name: 'responsibleForExecutionDate'
		});

		var fc1 = Ext.create('Ext.form.FieldContainer', {
			layout: {
				type: 'hbox'
			},
			items: [execMgr, d1]
		});

		var executorFio = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: 'ФИО исполнителя',
			name: 'executorName',
			store: 'allUsers',
			displayField: 'name',
			valueField: 'id'
		});

		var d2 = Ext.create('Ext.form.field.Date', {
			fieldLabel: 'Дата',
			labelAlign: 'right',
			name: 'executorDate',
			margin: '6 0 0 0'
		});

		var fc2 = Ext.create('Ext.form.FieldContainer', {
			layout: {
				type: 'hbox'
			},
			items: [executorFio, d2]
		});

		var cbControl = Ext.create('Ext.form.field.Checkbox', {
			fieldLabel: 'Контроль',
			name: 'control'
		});

		var controlDate = Ext.create('Ext.form.field.Date', {
			fieldLabel: 'Контрольная дата исполнения',
			name: 'controlDateOfExecution'
		});

		var resolutionAuthor = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Автор резолюции',
			name: 'resolutionAuthor'
		});

		var storageTerritory = Ext.create('Ext.form.field.ComboBox', {
			fieldLabel: 'Территория хранилища',
			store: Ext.getStore('storageTerritory'),
			displayField: 'name',
			name: 'storageTerritory',
			valueField: 'id'
		});

		var storageName = Ext.create('Ext.form.field.Text', {
			fieldLabel: 'Название хранилища',
			name: 'storageName'
		});

		var dopInfo = Ext.create('Ext.form.FieldSet', {
			collapsible: true,
			title: 'Дополнительная информация',
			layout: {
				type: 'vbox'
			},
			items: [resolutionAuthor, storageTerritory, storageName]
		});

		Ext.applyIf(me, {
			items: [fc1, fc2, cbControl, controlDate, dopInfo]
		});
		me.callParent(arguments);
	}
});
