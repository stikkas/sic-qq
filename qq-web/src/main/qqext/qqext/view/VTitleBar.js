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
				consts = qqext.Constants;

		consts.EDIT_MENUS = Ext.create('Ext.panel.Panel', {
			layout: 'card',
			flex: 2,
			activeItem: 0,
			items: [Ext.create('qqext.view.menu.SearchEditMenu',
						{itemId: consts.EM_ID_0}),
				Ext.create('qqext.view.menu.RequestRegEditMenu',
						{itemId: consts.EM_ID_1}),
				Ext.create('qqext.view.menu.RequestorNotifyEditMenu',
						{itemId: consts.EM_ID_2})
			]
		});
		consts.NAV_MENU = Ext.create('qqext.view.menu.NavigationMenu');

		Ext.applyIf(me, {
			items: [consts.EDIT_MENUS, consts.NAV_MENU]});
		me.callParent(arguments);
	}
});