/**
 * Панелька "На кого запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQueryObject', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'Ext.form.field.Text',
		'Ext.form.field.Number'
	],
	title: 'На кого запрос',
	disabledCls: '',
	formBind: true,
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Фамилия',
					name: 'requestObjectSurname'
				}),
				Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Имя',
					name: 'requestObjectName'
				}),
				Ext.create('Ext.form.field.Text', {
					fieldLabel: 'Отчество',
					name: 'requestFatherName'
				}),
				Ext.create('Ext.form.field.Number', {
					name: 'request_object_birthyear',
					fieldLabel: 'Год рождения',
					width: 200
				})
			]
		});

		me.callParent(arguments);
	}
});