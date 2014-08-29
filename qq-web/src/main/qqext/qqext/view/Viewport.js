/**
 * Основной экран главной страницы
 */
Ext.define('qqext.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.layout.container.Card',
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
		Ext.applyIf(me, {items: [Ext.create('qqext.view.WelcomePage')]});
		me.callParent();

		/**
		 * Переключает страницы
		 * @param {type} idx индекс требуемой страницы
		 */
		consts.setActivePage = function(idx) {
			// Вызываем первый раз. При первом вызове idx всегда равен 1.
			// Если это где-то получится не так то надо переделать метод.
			me.add(Ext.create('qqext.view.MainPage'));
			layout.setActiveItem(idx);
			consts.getButton('jvk').fireEvent('click');
			console.log("first switch");

			// Для последующих вызовов
			consts.setActivePage = function(idx) {
				console.log("switch for great then 1 more")
				layout.setActiveItem(idx);
				if (idx === 1)
					consts.getButton('jvk').fireEvent('click');
			}
		}
	}
});
