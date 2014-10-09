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
	fieldDefaults: {
		blankText: 'Обязательно для заполнения',
		allowBlank: false,
		validateOnChange: false
	},
	title: 'На кого запрос',
	disabledCls: '',
	formBind: true,
	initComponent: function() {
		var createCmp = Ext.create;

		Ext.applyIf(this, {
			items: [
				createCmp('FTextField', 'Фамилия', 'objectLName'),
				createCmp('FTextField', 'Имя', 'objectFName'),
				createCmp('FTextField', 'Отчество', 'objectMName'),
				createCmp('FNumberField', 'Год рождения', 'objectBirthYear', {
					width: 230,
					labelWidth: 150
				})
			]
		});

		this.callParent();
	}
});
