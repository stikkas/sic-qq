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
									displayField: 'shortValue',
									labelWidth: 150,
									viewOnly: true}),
						me.prefix = createCmp('FTextField', '№ Входящего документа', 'prefix', true, {
//							maskRe: /\d/,
							viewOnly: true,
							labelAlign: 'right',
							width: 252,
							labelWidth: 200,
							cls: 'two_col_fld'
						}),
						me.sufix = createCmp('FTextField', '/', 'sufix', true, {
							labelSeparator: '',
							viewOnly: true,
							labelWidth: 5,
							width: 50,
							cls: 'small_lbl'
						})
					]
				}),
				me.datereg = createCmp('FDateField', 'Дата регистрации', 'regDate', true,
						{viewOnly: true, width: 250, labelWidth: 150}), // Выставляется программно в модели
				me._sp = createCmp('FComboBox', 'Способ передачи', ns.stIds.docdeltype,
						'transferMethod', {allowBlank: false, width: 300, labelWidth: 150}),
				me.executor = createCmp('FComboBox', 'Исполняющая организация',
						ns.stIds.litera, 'execOrg', {
							width: 650, labelWidth: 150,
							listeners: {
								change: function (combo, value) {
									var otkaz = ns.regForm.query.mr;
									if (value !== ns.sicId) {
										otkaz.hide();
										otkaz.reset();
									} else {
										otkaz.show();
									}
									/*
									 var plannedDateCombo = ns.regForm.query.pd;
									 if (ns.sicId === value) {
									 plannedDateCombo.setViewOnly(true);
									 plannedDateCombo.viewOnly = true;
									 } else if (!ns.regForm.query.vz.social) {
									 plannedDateCombo.viewOnly = false;
									 plannedDateCombo._viewMode = !me._sp._viewMode;
									 plannedDateCombo.setViewOnly(me._sp._viewMode);
									 }
									 */
								}
							}
						}),
				me.registrator = createCmp('FComboBox', 'ФИО регистратора', ns.stIds.regusers,
						'registrator', true,
						{viewOnly: true, width: 500, labelWidth: 150})// Выставляется программно в модели
			]
		});
		if (ns.isSIC)
			me.executor.allowBlank = false;
		me.callParent();
	}
});
