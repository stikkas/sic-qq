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
	maxHeight: 205,
	initComponent: function() {
		var createCmp = Ext.create;

		Ext.applyIf(this, {
			items: [
				createCmp('FDateField', 'Дата исполнения', 'execDate'),
				createCmp('FComboBox', 'Результат ответа', 'resultOfAnswer', 'answerResult',
						{editable: false}),
				createCmp('FComboBox', 'Тематика ответа', 'tematicOfAnswer', 'usageAnswer',
						{editable: false}),
				createCmp('FComboBox', 'Категория сложности', 'diffCategory', 'categoryComplexity',
						{width: 175, editable: false})
			]
		});
		this.callParent();
	}
});
