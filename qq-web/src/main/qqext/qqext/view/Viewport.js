/**
 * Основной экран главной страницы
 */
Ext.define('qqext.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'qqext.view.WelcomePage',
		'qqext.view.MainPage',
		'qqext.Constants'
	],
	layout: 'card',
	initComponent: function() {
		var me = this;
		qqext.Constants.viewport = me;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.WelcomePage'),
				Ext.create('qqext.view.MainPage')
			]
		});
		me.callParent();
	}
});
