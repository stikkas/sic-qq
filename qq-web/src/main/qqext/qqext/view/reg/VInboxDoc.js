/**
 * Форма "Входящий документ"
 */
Ext.define('qqext.view.reg.VInboxDoc', {
	alias: 'VInboxDoc',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'Ext.data.Store',
		'qqext.factory.ComboBox',
		'qqext.factory.TextField',
		'qqext.factory.DateField',
		'qqext.cmp.FieldContainer',
		'qqext.cmp.FieldSet'
	],
	fieldDefaults: {
		blankText: 'Обязательно для заполнения',
		allowBlank: false,
		validateOnChange: false
	},
	disabledCls: '',
	maskOnDisable: false,
	title: 'Входящий документ',
	initComponent: function() {
		var me = this,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						me.litera = createCmp('FComboBox', 'Литера', 'literas', 'litera', true, {width: 240,
                                                        labelWidth:150,
							viewOnly: true}),
						createCmp('FTextField', '№ Входящего документа', 'prefixNum', {
							labelAlign: 'right',
							width: 245,
                                                        labelWidth:200,
                                                        cls:'two_col_fld'
						}),
						createCmp('FTextField', '/', 'sufixNum', {
							labelWidth: 5,
							width: 50,
                                                        cls:'small_lbl'
						})
					]
				}),
				me.datereg = createCmp('FDateField', 'Дата регистрации', 'regDate', true,
						{viewOnly: true, allowBlank: true, width:250, labelWidth:150}), // Выставляется программно в модели
				createCmp('FComboBox', 'Способ передачи', 'inboxDocDeliveryType', 'transferType'),
				me.executor = createCmp('FComboBox', 'Исполняющая организация', 'inboxDocExecOrg', 'execOrg', {width:650, labelWidth:150}),
				me.registrator = createCmp('FComboBox', 'ФИО регистратора', 'allUsers', 'registrator', true,
						{viewOnly: true, allowBlank: true, width:500, labelWidth:150})// Выставляется программно в модели
			]
		});
		me.callParent();
	}
});
