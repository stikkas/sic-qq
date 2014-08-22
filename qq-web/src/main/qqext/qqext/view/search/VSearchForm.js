/**
 *  Форма поиска
 */

Ext.define('qqext.view.search.VSearchForm', {
	extend: 'Ext.container.Container',
	id: 'VSearchForm',
	loadRecord: function(model) {
		this.items.getAt(0).loadRecord(model);
	},
	updateRecord: function(model) {
		this.items.getAt(0).updateRecord(model);
	},
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.search.VSearchParams'),
				Ext.create('qqext.view.search.VSearchResult')
			]
		});
		me.callParent(arguments);
	}
})