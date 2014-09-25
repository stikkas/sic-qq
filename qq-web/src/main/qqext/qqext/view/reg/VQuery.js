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
	fieldDefaults: {
		blankText: 'Обязательно для заполнения',
		allowBlank: false,
		validateOnChange: false
	},
	title: 'Запрос',
	disabledCls: '',
	initComponent: function() {
		var createCmp = Ext.create;
		Ext.applyIf(this, {
			items: [
				createCmp('FComboBox', 'Вид запроса', 'queryType', 'questionType', {
					listeners: {
						change: function(box, value) {
							var target = qqext.regForm.target;
							if (box.getStore().getById(value).get('code') === 'Q_VALUE_QUEST_TYPE_TEMATIC')
								target.hide();
							else
								target.show();
						},
                                                width:330, 
                                                labelWidth:150
					}
				}),
				createCmp('FDateField', 'Плановая дата исполнения запроса', 'plannedFinishDate',{width:250, labelWidth:150}),
				createCmp('FTextArea', 'Содержание запроса', 'content', {width: 950, labelWidth:150}),
				createCmp('FComboBox', 'Форма выдачи ответа', 'answerForm', 'answerFormType'),
				createCmp('FCheckbox', 'Мотивированный отказ', 'motivatedRefusal')
			]
		});
		this.callParent();
	}
});
