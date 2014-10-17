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
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				ns = qqext;
		Ext.applyIf(me, {
			items: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						me.litera = createCmp('FComboBox', 'Литера', ns.stIds.litera, 'litera',
								true, {width: 240,
									labelWidth: 150,
									viewOnly: true}),
						me.prefix = createCmp('FTextField', '№ Входящего документа', 'prefixNum', {
							maskRe: /\d/,
							labelAlign: 'right',
							width: 245,
							labelWidth: 200,
							cls: 'two_col_fld'
						}),
						createCmp('FTextField', '/', 'sufixNum', true, {
//							maskRe: /\d/,
							viewOnly: true,
							labelWidth: 5,
							width: 50,
							cls: 'small_lbl'
						})
					]
				}),
				me.datereg = createCmp('FDateField', 'Дата регистрации', 'regDate', true,
						{viewOnly: true, allowBlank: true, width: 250, labelWidth: 150}), // Выставляется программно в модели
				me._sp = createCmp('FComboBox', 'Способ передачи', 'inboxDocDeliveryType', 'transferType'),
				me.executor = createCmp('FComboBox', 'Исполняющая организация',
						'inboxDocExecOrg', 'execOrg', {
							width: 650, labelWidth: 150,
							listeners: {
								change: function (combo, value) {
									var plannedDateCombo = ns.regForm.query.pd;
									if (ns.sicId === value) {
										plannedDateCombo.setViewOnly(true);
										plannedDateCombo.viewOnly = true;
									} else if (!ns.regForm.query.vz.social) {
										plannedDateCombo.viewOnly = false;
										plannedDateCombo._viewMode = !me._sp._viewMode;
										plannedDateCombo.setViewOnly(me._sp._viewMode);
									}
								}
							}
						}),
				me.registrator = createCmp('FComboBox', 'ФИО регистратора', ns.stIds.allusers,
						'registrator', true,
						{viewOnly: true, allowBlank: true, width: 500, labelWidth: 150})// Выставляется программно в модели
			]
		});
		me.callParent();
	}
});
