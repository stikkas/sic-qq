/**
 * Панелька "Запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQuery', {
	alias: 'VQuery',
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
				new ComboBox('Вид запроса', 'queryType', 'questionType').cfg({
					listeners: {
						change: function(box, value) {
							var target = qqext.regForm.target;
							if (box.getStore().getById(value).get('code') === 'Q_VALUE_QUEST_TYPE_TEMATIC')
								target.hide();
							else
								target.show();
						}
					}
				}),
				new factory.DateField('Плановая дата исполнения запроса', 'plannedFinishDate'),
				new factory.TextArea('Содержание запроса', 'content').cfg({width: 600}),
				new ComboBox('Форма выдачи ответа', 'answerForm', 'answerFormType'),
				new factory.Checkbox('Мотивированный отказ', 'motivatedRefusal')
			]
		});
		me.callParent(arguments);
	}
});
