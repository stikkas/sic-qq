/**
 * Страница показывается когда прошел успешно авторизацию, или когда пользователь
 * нажал на кнопку 'В начало'. Определены следующие стилевые классы для элементов:
 * .welcomebutton - кнопки на панели
 * .welcomecontainer - тело панели
 * .welcomepage - панель
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.WelcomePage', {
	alias: 'WelcomePage',
	extend: 'Ext.panel.Panel',
	requires: [
		'qqext.factory.HandlerButton',
		'qqext.factory.HrefButton'
	],
	layout: 'hbox',
	bodyCls: 'welcomecontainer',
	cls: 'welcomepage',
	initComponent: function() {
		var
				ns = qqext,
				labels = ns.labels,
				urls = ns.urls,
				createCmp = Ext.create,
				cls = 'welcomebutton';

		Ext.applyIf(this, {
			items: [
				createCmp('FHrefButton', labels.app1, urls.app1, {cls: cls}),
				createCmp('FHrefButton', labels.app2, urls.app2, {cls: cls}),
				createCmp('FHandlerButton', labels.asq, function() {
					ns.setActivePage(1);
				}, {cls: cls})
			],
			buttons: [createCmp('FHandlerButton', labels.quit, ns.quitAction)]
		});
		this.callParent();
	}
});
