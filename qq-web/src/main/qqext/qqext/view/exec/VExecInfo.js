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
	cls: 'exec_inf',
	fieldDefaults: {
		validateOnChange: false,
		blankText: 'Обязательно для заполнения',
		allowBlank: false,
		labelWidth: 150
	},
	initComponent: function () {
		var me = this,
				ns = qqext,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [
				me.df1 = createCmp('FDateField', 'Дата исполнения', 'execDate', {width: 270}),
				me.df2 = createCmp('FDateField', 'Уведомление о продлении сроков', 'prolongDate', {
					allowBlank: true,
					width: 270
				}),
				createCmp('FComboBox', 'Результат ответа', ns.stIds.resans, 'replyRes', {
					listeners: {
						change: function xx(cb, value) {
							if (xx.adr === undefined) {
								var store = cb.store;
								xx.adr = store.getAt(store.find('shortValue', 'Q_VALUE_RESULT_REDIRECT')).get('id');
								xx.rec = store.getAt(store.find('shortValue', 'Q_VALUE_RESULT_DOP_INFO')).get('id');
							}
							me._rf.reset();
							if (value === xx.adr) {
								me._rf.show();
								me._rf.setFieldLabel('Переадресовка');
							} else if (value === xx.rec) {
								me._rf.show();
								me._rf.setFieldLabel('Рекомендация');
							} else {
								me._rf.hide();
							}
						}
					},
					editable: false,
					width: 400
				}),
				me._rf = createCmp('FTextArea', '', 'refer', {allowBlank: true, hidden: true}),
				createCmp('FComboBox', 'Тематика ответа', ns.stIds.tematic, 'replyTema', {
					editable: false, width: 400}),
				createCmp('FComboBox', 'Категория сложности', ns.stIds.difcat, 'difCat',
						{width: 200, editable: false, allowBlank: true})
			]
		});
		me.callParent();
	}
});
