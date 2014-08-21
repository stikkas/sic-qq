/**
 * Страница показывается когда прошел успешно авторизацию, или когда пользователь
 * нажал на кнопку 'В начало'.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.WelcomePage', {
	extend: 'Ext.panel.Panel',
	layout: 'hbox',
	bodyCls: 'welcomecontainer',
	cls: 'welcomepage',
	initComponent: function() {
		var
				me = this,
				consts = qqext.Constants,
				labels = consts.labels,
				urls = consts.urls;

		Ext.applyIf(me, {
			items: createButtons([
				[labels.app1, urls.app1],
				[labels.app2, urls.app2],
				[labels.asq, beginAction]
			]),
			buttons: [
				{text: labels.quit,
					handler: consts.quitAction}
			]
		});
		me.callParent();

		/**
		 * Создает массив кнопок
		 * @param {Array} buttons массив массивов из двух элементов
		 * @returns {Array} массив объектов для кнопок
		 */
		function createButtons(buttons) {
			var result = [];
			for (var i = 0, max = buttons.length; i < max; ++i) {
				var
						props = buttons[i],
						hrefOrHandler = props[1],
						btn = {xtype: 'button',
							text: props[0],
							cls: 'welcomebutton'};

				if (hrefOrHandler instanceof Function)
					btn.handler = hrefOrHandler;
				else
					btn.href = hrefOrHandler;
				result.push(btn);
			}
			return result;
		}
		/**
		 * Вызывается когда нажали на кнопку для входа в систему АС Запросы
		 */
		function beginAction() {
			consts.viewport.getLayout().setActiveItem(1);
		}
	}
});
