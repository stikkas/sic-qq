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
		'qqext.cmp.FieldContainer'
	],
	disabledCls: '',
	maskOnDisable: false,
	title: 'Входящий документ',
	initComponent: function() {
		var me = this, ns = qqext,
				factory = ns.factory,
				ComboBox = factory.ComboBox,
				TextField = factory.TextField,
				DateField = factory.DateField;
		Ext.applyIf(me, {
			items: [
				Ext.create('FieldContainer', {
					layout: 'hbox',
					items: [
						me.litera = Ext.create('ComboBox',
								new ComboBox('Литера', 'literas', 'litera', true).cfg({width: 190,
							viewOnly: true})),
						new TextField('№ Входящего документа', 'inboxNum').cfg({
							labelAlign: 'right',
							labelWidth: 200,
							width: 245
						}),
						new TextField('/').cfg({
							labelWidth: 5,
							width: 50
						})
					]
				}),
				me.datereg = Ext.create('DateField',
						new DateField('Дата регистрации', 'regDate', true).cfg({viewOnly: true})),
				new ComboBox('Способ передачи', 'inboxDocDeliveryType', 'transferType'),
				me.executor = Ext.create('ComboBox',
						new ComboBox('Исполняющая организация', 'inboxDocExecOrg', 'execOrg')),
				me.registrator = Ext.create('ComboBox',
						new ComboBox('ФИО регистратора', 'allUsers', 'registrator', true).
						cfg({viewOnly: true}))
			]
		});
		me.callParent(arguments);
	},
	setValues: function() {
		console.log(arguments);
		this.callParent(arguments);
	}
});
