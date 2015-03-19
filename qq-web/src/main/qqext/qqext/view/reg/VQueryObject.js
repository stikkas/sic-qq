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
		validateOnChange: false
	},
	title: 'На кого запрос',
	disabledCls: '',
	formBind: true,
	initComponent: function () {
		var createCmp = Ext.create,
				year;

		Ext.applyIf(this, {
			items: [
				createCmp('FTextField', 'Фамилия', 'objLName', {labelWidth:150, width: 400}),
				createCmp('FTextField', 'Имя', 'objFName', {labelWidth:150}),
				createCmp('FTextField', 'Отчество', 'objMName', {labelWidth:150}),
				year = createCmp('FNumberField', 'Год рождения', 'objBYear', {
					width: 230,
					labelWidth: 150,
					spinDownEnabled: false,
					spinUpEnabled: false
				})
			]
		});

		this.callParent();
	}
});
