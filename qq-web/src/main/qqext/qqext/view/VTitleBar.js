/**
 * Заголовочная панель с кнопками управления.
 */
Ext.define('qqext.view.VTitleBar', {
	alias: 'VTitleBar',
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.panel.Header',
		'qqext.Menu'
	],
	region: 'north',
	layout: 'hbox',
	margin: '0 0 10 0',
	cls: 'title_cls',
	initComponent: function() {
		var me = this,
				menus = qqext.Menu;
		Ext.applyIf(me, {
			items: [menus.editMenu, menus.navigation],
			header: {
				layout: 'hbox',
				items: [
					{
						xtype: 'label',
						text: 'АИС Запросы',
						flex: 4
					},
					{
						xtype: 'label',
						text: qqext.fio,
						cls: 'user_name'
					}
				]
			}
		});
		me.callParent(arguments);
	}
});
