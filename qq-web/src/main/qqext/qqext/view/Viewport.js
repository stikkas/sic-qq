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

		var
				me = this,
				layout = me.getLayout(),
				consts = qqext.Constants;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.WelcomePage'),
				Ext.create('qqext.view.MainPage')
			]
		});
		me.callParent();

		/**
		 * Переключает страницы
		 * @param {type} idx индекс требуемой страницы
		 */
		consts.setActivePage = function(idx) {
			layout.setActiveItem(idx);
			if (idx === 1)
				consts.getButton('jvk').fireEvent('click');
		}
	}
});
