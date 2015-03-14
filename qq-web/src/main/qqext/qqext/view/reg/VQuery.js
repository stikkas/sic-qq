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
		validateOnChange: false,
		labelWidth: 150
	},
	title: 'Запрос',
	disabledCls: '',
	initComponent: function () {
		var createCmp = Ext.create,
				me = this,
				ns = qqext;
		Ext.applyIf(me, {
			items: [
				me.vz = createCmp('FComboBox', 'Вид запроса', ns.stIds.queryType, 'questionType', {
					listeners: {
						change: function (box, value) {
							console.log(value);
							var target = ns.regForm.target,
									code = box.getStore().getById(value).get('code');
							if (code === 'Q_VALUE_QUEST_TYPE_TEMATIC')
								target.hide();
							else
								target.show();
							/*
							 if (ns.regForm.inbox.executor.getValue() !== ns.sicId) {
							 if (code === 'Q_VALUE_QUEST_TYPE_SOCIAL') {
							 me.pd.setViewOnly(true);
							 me.pd.viewOnly = true;
							 me.vz.social = true;
							 } else {
							 me.pd.viewOnly = false;
							 me.pd.setViewOnly(me.vz._viewMode);
							 me.vz.social = false;
							 }
							 }*/
						}
					},
					width: 370
				}),
				me.pd = createCmp('FDateField', 'Плановая дата исполнения запроса', 'planDate', {
					allowBlank: true,
					viewOnly: true,
					width: 270}),
				createCmp('FTextArea', 'Содержание запроса', 'content', {width: 950}),
				createCmp('FComboBox', 'Форма выдачи ответа', ns.stIds.sendType, 'replyForm'),
				me.mr = createCmp('FCheckbox', 'Мотивированный отказ', 'motivRefuse', {hidden: !ns.isSIC})
			]
		});
		me.callParent();
	}
});
