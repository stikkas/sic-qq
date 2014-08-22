/**
 *  Левый блок меню для разделов.
 */

Ext.define('qqext.view.VLeftMenu', {
	extend: 'Ext.container.Container',
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
