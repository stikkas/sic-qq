/**
 * Форма свединия об исполнении запроса
 */
Ext.define('qqext.view.exec.VExecInfo', {
	alias: 'VExecInfo',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField'
	],
	title: 'Сведения об исполнении',
	fieldDefaults: {
		validateOnChange: false,
		blankText: 'Обязательно для заполнения',
		allowBlank: false
	},
	initComponent: function() {
		var createCmp = Ext.create,
				exec = qqext.execInfo;
		Ext.applyIf(this, {
			items: [
				createCmp('FDateField', exec.date[1], exec.date[0]),
				createCmp('FComboBox', exec.result[1], 'resultOfAnswer', exec.result[0],
						{editable: false}),
				createCmp('FComboBox', exec.tema[1], 'tematicOfAnswer', exec.tema[0],
						{editable: false}),
				createCmp('FComboBox', exec.category[1], 'diffCategory', exec.category[0],
						{width: 175, editable: false, allowBlank: true})
			]
		});
		this.callParent();
	}
});
