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
        cls:'exec_inf',
	fieldDefaults: {
		validateOnChange: false,
		blankText: 'Обязательно для заполнения',
		allowBlank: false,
		labelWidth: 150
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				exec = qqext.execInfo;
		Ext.applyIf(me, {
			items: [
				me.df1 = createCmp('FDateField', exec.date[1], exec.date[0], {width: 270}),
				me.df2 = createCmp('FDateField', exec.notice[1], exec.notice[0], {
					allowBlank: true,
					width: 270
				}),
				createCmp('FComboBox', exec.result[1], 'resultOfAnswer', exec.result[0],
						{
							listeners: {
								change: function xx(cb, value) {
									if (xx.adr === undefined) {
										var store = cb.store;
										xx.adr = store.getAt(store.find('code', 'Q_VALUE_RESULT_REDIRECT')).get('id');
										xx.rec = store.getAt(store.find('code', 'Q_VALUE_RESULT_DOP_INFO')).get('id');
									}
									me._rf.reset();
									if (value === xx.adr) {
										me._rf.show();
										me._rf.setFieldLabel(exec.refer[1]);
									} else if (value === xx.rec) {
										me._rf.show();
										me._rf.setFieldLabel(exec.refer[2]);
									} else {
										me._rf.hide();
									}
								}
							},
							editable: false,
							width: 400
						}),
				me._rf = createCmp('FTextArea', '', exec.refer[0], {hidden: true}),
				createCmp('FComboBox', exec.tema[1], 'tematicOfAnswer', exec.tema[0], {
					editable: false,
					width: 400
				}),
				createCmp('FComboBox', exec.category[1], 'diffCategory', exec.category[0],
						{width: 200, editable: false, allowBlank: true})
			]
		});
		me.callParent();
	}
});
