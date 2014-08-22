/**
 *
 */
Ext.define('qqext.view.reg.VInboxDoc', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'Ext.form.field.ComboBox',
		'Ext.form.field.Text',
		'Ext.form.FieldContainer',
		'Ext.form.field.Date'
	],
	disabledCls: '',
	maskOnDisable: false,
	title: 'Входящий документ',
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.FieldContainer', {
					layout: 'hbox',
					items: [Ext.create('Ext.form.field.ComboBox', {
							fieldLabel: 'Литера',
							width: 190,
							name: 'litera',
							store: 'literas',
							displayField: 'name',
							valueField: 'id'
						}), Ext.create('Ext.form.field.Text', {
							fieldLabel: '№ Входящего документа',
							labelAlign: 'right',
							labelWidth: 200,
							name: 'inboxNum',
							width: 245
						}), Ext.create('Ext.form.field.Text', {
							fieldLabel: '/',
							labelWidth: 5,
							width: 50
						})]
				}),
				Ext.create('Ext.form.field.Date', {
					fieldLabel: 'Дата регистрации',
					name: 'regDate'
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Способ передачи',
					name: 'transferType',
					displayField: 'name',
					valueField: 'id',
					store: Ext.getStore('inboxDocDeliveryType')
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Исполняющая организация',
					displayField: 'name',
					name: 'execOrg',
					valueField: 'id',
					store: Ext.getStore('inboxDocExecOrg')
				}),
				Ext.create('Ext.form.field.Text', {
					fieldLabel: 'ФИО регистратора',
					disabled: true,
					name: 'registrator',
					value: 'Только для чтения',
					setDisabled: function() {
						return this;
					}
				})
			]
		});
		me.callParent(arguments);
	}
});