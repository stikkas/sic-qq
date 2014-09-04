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
	extend: 'Ext.panel.Panel',
	requires: [
		'qqext.Constants',
		'qqext.factory.HandlerButton',
		'qqext.factory.HrefButton'
	],
	layout: 'hbox',
	bodyCls: 'welcomecontainer',
	cls: 'welcomepage',
	initComponent: function() {
		var
				me = this,
				consts = qqext.Constants,
				labels = consts.labels,
				urls = consts.urls,
				HrefButton = qqext.factory.HrefButton,
				HandlerButton = qqext.factory.HandlerButton;

		Ext.applyIf(me, {
			items: [
				new HrefButton(labels.app1, urls.app1),
				new HrefButton(labels.app2, urls.app2),
				new HandlerButton(labels.asq, function() {
					consts.setActivePage(1);
				})
			].map(function(btn) {
				return btn.cfg({cls: 'welcomebutton'});
			}),
			buttons: [new HandlerButton(labels.quit, consts.quitAction)]
		});
		me.callParent();
	}
});