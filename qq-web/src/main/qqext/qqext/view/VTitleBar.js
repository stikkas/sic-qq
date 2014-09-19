/**
 * Заголовочная панель с кнопками управления.
 */
Ext.define('qqext.view.VTitleBar', {
	alias: 'VTitleBar',
	extend: 'Ext.panel.Panel',
	requires: [
		'qqext.Menu'
	],
	title: 'АС Запросы',
	region: 'north',
	layout: 'hbox',
	margin: '0 0 10 0',
        cls:'title_cls',
	initComponent: function() {
		var me = this,
				menus = qqext.Menu;
		Ext.applyIf(me, {
			items: [menus.editMenu, menus.navigation]});
		me.callParent(arguments);
	}
});
