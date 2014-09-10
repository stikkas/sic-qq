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
		var
				me = this,
				factory = qqext.factory,
				ComboBox = factory.ComboBox;

		Ext.applyIf(me, {
			items: [
				new factory.DateField('Дата исполнения', 'execDate'),
				new ComboBox('Результат ответа', 'resultOfAnswer', 'answerResult')
						.cfg({editable: false}),
				new ComboBox('Тематика ответа', 'tematicOfAnswer', 'usageAnswer')
						.cfg({editable: false}),
				new ComboBox('Категория сложности', 'diffCategory', 'categoryComplexity')
						.cfg({width: 175, editable: false})
			]
		});
		me.callParent(arguments);
	}
});
