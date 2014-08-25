/**
 * Панелька "Запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQuery', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.factory.TextArea',
		'qqext.factory.Checkbox'
	],
	title: 'Запрос',
	disabledCls: '',
	initComponent: function() {
		var me = this,
				factory = qqext.factory,
				ComboBox = factory.ComboBox;
		Ext.applyIf(me, {
			items: [
				new ComboBox('Вид запроса', Ext.getStore('queryType'), 'questionType'),
				new factory.DateField('Плановая дата исполнения запроса', 'plannedFinishDate'),
				new factory.TextArea('Содержание запроса', 'content'),
				new ComboBox('Форма выдачи ответа', Ext.getStore('answerForm'), 'answerFormType'),
				new factory.Checkbox('Мотивированный отказ', 'motivatedRefusal')
			]
		});
		me.callParent(arguments);
	}
});
