/**
 * Форма свединия об исполнении запроса
 */
Ext.define('qqext.view.exec.VExecInfo', {
	extend: 'Ext.form.Panel',
	requires: [
		'Ext.form.field.Date',
		'Ext.form.field.ComboBox'
	],
	title: 'Сведения об исполнении',
	maxHeight: 205,
	margin: '0 10 0 0',
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.field.Date', {
					fieldLabel: 'Дата исполнения',
					name: 'execDate'
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Результат ответа',
					displayField: 'name',
					valueField: 'id',
					store: Ext.getStore('resultOfAnswer'),
					editable: false,
					name: 'answerResult'
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Тематика ответа',
					displayField: 'name',
					valueField: 'id',
					store: Ext.getStore('tematicOfAnswer'),
					editable: false,
					name: 'usageAnswer'
				}),
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Категория сложности',
					displayField: 'name',
					valueField: 'id',
					store: Ext.getStore('diffCategory'),
					width: 175,
					editable: false,
					name: 'categoryComplexity'
				})
			]
		});
		me.callParent(arguments);
	}
});