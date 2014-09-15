/**
 * Панель корзина для мусора.
 */
Ext.define('qqext.view.exec.cmp.DeliveryTypeCount', {
	extend: 'Ext.form.FieldContainer',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.NumberField',
		'qqext.factory.HandlerButton'
	],
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	height: 40,
	width: 600,
	loadRecord: function(model) {
		this.items.getAt(0).setValue(model.get(qqext.delAction.type[0]));
		this.items.getAt(1).setValue(model.get(qqext.delAction.count[0]));
	},
	updateRecord: function(model) {
		model.set(qqext.delAction.type[0], this.items.getAt(0).getValue());
		model.set(qqext.delAction.count[0], this.items.getAt(1).getValue())
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				del = qqext.delAction;
		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', del.type[1], del.type[0], {
					editable: false,
					labelWidth: 100,
					width: 250,
					height: 22
				}),
				createCmp('FNumberField', del.count[1], del.count[0], {
					labelAlign: 'right',
					hideTrigger: true,
					width: 230,
					labelWidth: 150
				}),
				createCmp('FHandlerButton', 'Trash', function() {
					this.ownerCt.ownerCt.remove(this.ownerCt);
				}, {
					action: 'drop',
					height: 25,
					margin: '0 0 0 15'
				})
			]
		});
		me.callParent();
	}
});
