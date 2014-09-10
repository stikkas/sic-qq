/**
 * Панелька "На кого запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQueryObject', {
	alias: 'VQueryObject',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.TextField',
		'qqext.factory.NumberField'
	],
	title: 'На кого запрос',
	disabledCls: '',
	formBind: true,
	initComponent: function() {
		var me = this,
				factory = qqext.factory,
				TextField = factory.TextField;

		Ext.applyIf(me, {
			items: [
				new TextField('Фамилия', 'requestObjectSurname'),
				new TextField('Имя', 'requestObjectName'),
				new TextField('Отчество', 'requestFatherName'),
				new factory.NumberField('Год рождения', 'request_object_birthyear').cfg({
					width: 200
				})
			]
		});

		me.callParent(arguments);
	}
});
