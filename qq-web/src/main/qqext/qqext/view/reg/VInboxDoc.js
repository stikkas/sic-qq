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
						me.litera = createCmp('FComboBox', 'Литера', 'literas', 'litera', true, {width: 190,
							viewOnly: true}),
						createCmp('FTextField', '№ Входящего документа', 'prefixNum', {
							labelAlign: 'right',
							labelWidth: 180,
							width: 245
						}),
						createCmp('FTextField', '/', 'sufixNum', {
							labelWidth: 5,
							width: 50
						})
					]
				}),
				me.datereg = createCmp('FDateField', 'Дата регистрации', 'regDate', true,
						{viewOnly: true, allowBlank: true}), // Выставляется программно в модели
				createCmp('FComboBox', 'Способ передачи', 'inboxDocDeliveryType', 'transferType'),
				me.executor = createCmp('FComboBox', 'Исполняющая организация', 'inboxDocExecOrg', 'execOrg'),
				me.registrator = createCmp('FComboBox', 'ФИО регистратора', 'allUsers', 'registrator', true,
						{viewOnly: true, allowBlank: true})// Выставляется программно в модели
			]
		});
		me.callParent();
	}
});
