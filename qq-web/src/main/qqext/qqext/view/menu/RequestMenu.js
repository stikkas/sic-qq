/**
 * Меню для работы с запросами.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.RequestMenu', {
	extend: 'qqext.view.menu.VButtonMenu',
	_buttons: [
		{text: "Регистрация запроса", action: function() {
				console.log(this.text);
			}},
		{text: "Уведомление заявителю", action: function() {
				console.log(this.text);
			}},
		{text: "Передача на исполнение", action: function() {
				console.log(this.text);
			}},
		{text: "Исполнение запроса", action: function() {
				console.log(this.text);
			}}
	],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		qqext.Constants.REQ_BUTTONS = me.items.items;
	}
});