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
		this.items.getAt(0).setValue(model.get('docType'));
		this.items.getAt(1).setValue(model.get('numOfDocs'));
	},
	updateRecord: function(model) {
		model.set('docType', this.items.getAt(0).getValue());
		model.set('numOfDocs', this.items.getAt(1).getValue())
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', 'Тип документов', 'docType', {
					editable: false,
					labelWidth: 100,
					width: 250,
					height: 22
				}),
				createCmp('FNumberField', 'Количество документов', {
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
