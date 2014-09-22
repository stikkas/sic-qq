/**
 * Основной экран главной страницы
 */
Ext.define('qqext.view.Viewport', {
	alias: 'Viewport',
	extend: 'Ext.container.Viewport',
	requires: [
		'Ext.layout.container.Card',
		'qqext.view.WelcomePage',
		'qqext.view.MainPage'
	],
	layout: 'card',
	initComponent: function() {
		var
				me = this,
				layout = me.getLayout(),
				ns = qqext;
		Ext.applyIf(me, {items: [Ext.create('WelcomePage')]});
		me.callParent();
		ns.viewport = me;

		/**
		 * Переключает страницы
		 * @param {type} idx индекс требуемой страницы
		 */
		ns.setActivePage = function(idx) {
			// Вызываем первый раз. При первом вызове idx всегда равен 1.
			// Если это где-то получится не так то надо переделать метод.
			var jvk = ns.btns.jvk;
			me.add(Ext.create('MainPage'));
			layout.setActiveItem(idx);
			ns.getButton(jvk).fireEvent('click');

			// Для последующих вызовов
			ns.setActivePage = function(idx) {
				layout.setActiveItem(idx);
				if (idx === 1)
					ns.getButton(jvk).fireEvent('click');
			}
		}
	}
});
