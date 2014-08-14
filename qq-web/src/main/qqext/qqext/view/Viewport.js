/**
 * Основной экран главной страницы
 */
Ext.define('qqext.view.Viewport', {
	extend: 'Ext.container.Viewport',
	name: 'qq-viewport',
	layout: {
		type: 'border'
	},
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.VTitleBar', {}),
				Ext.create('qqext.view.VLeftMenuSearch', {}),
				Ext.create('qqext.view.search.VSearchForm', {})
			]
		});
		me.callParent(arguments);
	}
});
