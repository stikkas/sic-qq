/**
 * Основной экран главной страницы
 */
Ext.define('qqext.view.Viewport', {
	extend: 'Ext.container.Viewport',
	name: 'qq-viewport',
	layout: 'border',
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.VTitleBar'),
				Ext.create('qqext.view.VLeftMenu'),
				Ext.create('qqext.view.search.VSearchForm')
			]});
		me.callParent(arguments);
	}
});
