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
	html: 'АИС Справочно-информационного центра',
	initComponent: function () {
		var
				ns = qqext,
				labels = ns.labels,
				urls = ns.urls,
				createCmp = Ext.create,
				cls = 'welcomebutton';

		Ext.applyIf(this, {
			items: [createCmp('FHandlerButton', labels.storage, function () {
					window.open(urls.storage, "_self");
				}, {cls: cls,
					icon: 'images/books.png',
					width: 400
				}),
//				createCmp('FHrefButton', labels.admin, urls.admin, {cls: cls,
//                                            icon:'images/adm_icon.png',
//                                            margin:'220 0 0 0',
//                                            width:340
//                                        }),
				createCmp('FHandlerButton', labels.asq, function () {
					ns.setActivePage(1);
				}, {cls: cls,
					icon: 'images/documents.png',
					width: 400
				})
			],
			buttons: [createCmp('FHandlerButton', labels.quit, ns.quitAction)]
		});
		this.callParent();
	}
});
