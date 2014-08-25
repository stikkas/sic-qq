/**
 * Форма исполнения запроса
 */
Ext.define('qqext.view.exec.VExecForm', {
	extend: 'Ext.container.Container',
	requires: [
		'qqext.view.exec.VExecInfo',
		'qqext.view.exec.VDeliveryOfDocuments',
		'qqext.view.exec.VCoordination',
		'qqext.view.exec.VDeliveryMethod'
	],
	overflowY: 'auto',
	disabled: false,
	maskOnDisable: false,
	height: 300,
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.exec.VExecInfo'),
				Ext.create('qqext.view.exec.VDeliveryOfDocuments'),
				Ext.create('qqext.view.exec.VCoordination'),
				Ext.create('qqext.view.exec.VDeliveryMethod')
			]
		});
		me.callParent(arguments);
	},
	setDisabled: function(disabled) {
		var me = this,
				items = me.items.items,
				max = items.length;
		for (var i = 0; i < max; ++i) {
			items[i].setDisabled(disabled);
		}
		me.disabled = disabled;
	},
	isDisabled: function() {
		return this.disabled;
	},
	loadRecord: function(model) {
		var items = this.items.items,
				max = items.length;
		items[0].loadRecord(model.getExecutionInfo());
		for (var i = 1; i < max; ++i)
			items[i].loadRecord(model);
	},
	updateRecord: function(model) {
		var items = this.items.items,
				max = items.length;
		items[0].updateRecord(model.getExecutionInfo());
		for (var i = 1; i < max; ++i)
			items[i].updateRecord(model);
		return model;
	}
});
