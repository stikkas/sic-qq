/**
 * Форма "Входящий документ"
 */
Ext.define('qqext.view.reg.VInboxDoc', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.TextField',
		'qqext.factory.DateField',
		'Ext.form.FieldContainer'
	],
	disabledCls: '',
	maskOnDisable: false,
	title: 'Входящий документ',
	initComponent: function() {
		var me = this,
				factory = qqext.factory,
				ComboBox = factory.ComboBox,
				TextField = factory.TextField,
				DateField = factory.DateField,
				reg = Ext.create('qqext.cmp.Text',
						new TextField('ФИО регистратора', 'registrator').cfg({
					listeners: {
						afterrender: function() {
							this.setValue(qqext.user.get('name'));
							this.setViewOnly(true);
						}
					}
				}));

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.FieldContainer', {
					layout: 'hbox',
					items: [
						new ComboBox('Литера', 'literas', 'litera').cfg({width: 190}),
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
				new DateField('Дата регистрации', 'regDate'),
				new ComboBox('Способ передачи', Ext.getStore('inboxDocDeliveryType'), 'transferType'),
				new ComboBox('Исполняющая организация', Ext.getStore('inboxDocExecOrg'), 'execOrg'),
				reg
			]
		});
		me.callParent(arguments);
	}
});
