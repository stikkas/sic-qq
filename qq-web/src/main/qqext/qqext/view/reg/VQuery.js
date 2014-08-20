/**
 * Панелька "Запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQuery', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'Ext.form.field.TextArea',
		'Ext.form.field.Checkbox'
	],
	title: 'Запрос',
	disabledCls: '',
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Вид запроса',
					name: 'questionType',
					store: Ext.getStore('queryType'),
					valueField: 'id',
					displayField: 'name'
				}),
				Ext.create('Ext.form.field.Date', {
					name: 'plannedFinishDate',
					fieldLabel: 'Плановая дата исполнения запроса'
				}),
				Ext.create('Ext.form.field.TextArea', {
					fieldLabel: 'Содержание запроса',
					name: 'content'
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Форма выдачи ответа',
					name: 'answerFormType',
					store: Ext.getStore('answerForm'),
					valueField: 'id',
					displayField: 'name'
				}),
				Ext.create('Ext.form.field.Checkbox', {
					fieldLabel: 'Мотивированный отказ',
					name: 'motivatedRefusal'
				})
			]
		})

		me.callParent(arguments);
	}
});
