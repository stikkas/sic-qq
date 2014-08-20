/**
 * Форма "Уведомление заявителю"
 *
 * @author М. Сорокин
 */
Ext.define('qqext.view.notify.VNotify', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date'
	],
	height: 300,
	maxHeight: 300,
	margin: '0 10 0 0',
	title: 'Уведомление заявителю',
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'ФИО исполнителя',
					displayField: 'name',
					valueField: 'id',
					name: 'executor',
					store: 'allUsers'
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Тип документов',
					displayField: 'name',
					valueField: 'id',
					name: 'docType',
					store: Ext.getStore('docType')
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Способ передачи',
					displayField: 'name',
					valueField: 'id',
					store: Ext.getStore('answerForm'),
					name: 'deliveryType'
				}),
				Ext.create('Ext.form.field.Date', {
					fieldLabel: 'Дата уведомления',
					name: 'notificationDate'
				})
			]
		});

		me.callParent(arguments);
	}
});