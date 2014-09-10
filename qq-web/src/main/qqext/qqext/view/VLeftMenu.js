/**
 *  Левый блок меню для разделов.
 */

Ext.define('qqext.view.VLeftMenu', {
	alias: 'VLeftMenu',
	extend: 'Ext.container.Container',
	requires: [
		'qqext.Menu'
	],
	margin: '0 10 0 0',
	region: 'west',
	layout: 'vbox',
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [qqext.Menu.articleMenu]});
		me.callParent(arguments);
	}
});
