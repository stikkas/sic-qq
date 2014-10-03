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
				createCmp('FHandlerButton', labels.storage, function() {
					window.open(urls.storage, "_self");
				}, {cls: cls, icon:'images/books.png'}),
				createCmp('FHrefButton', labels.admin, urls.admin, {cls: cls, 
                                            icon:'images/adm_icon.png',
                                            margin:'150 0 0 0'}),
				createCmp('FHandlerButton', labels.asq, function() {
					ns.setActivePage(1);
				}, {cls: cls, icon:'images/documents.png'})
			],
			buttons: [createCmp('FHandlerButton', labels.quit, ns.quitAction)]
		});
		this.callParent();
	}
});
