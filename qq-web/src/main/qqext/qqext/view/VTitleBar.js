/**
 * Заголовочная панель с кнопками управления.
 */
Ext.define('qqext.view.VTitleBar', {
	extend: 'Ext.panel.Panel',
	title: 'АС Запросы',
	region: 'north',
	layout: 'hbox',
	initComponent: function() {
		var me = this,
				menus = qqext.Menu;
		Ext.applyIf(me, {
			items: [menus.editMenu, menus.navigation]});
		me.callParent(arguments);
	}
});
