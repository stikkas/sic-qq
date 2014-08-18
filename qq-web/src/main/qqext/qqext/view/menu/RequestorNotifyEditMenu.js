/**
 * Панель с кнопками меню для уведомления заявителю
 *
 * @author С. Благодатских
 */

Ext.define('qqext.view.menu.RequestorNotifyEditMenu', {
	extend: 'qqext.view.menu.HButtonMenu',
	_buttons: [
		{text: "Сохранить", action: function() {
				console.log(this.text);
			}},
		{text: "Редактировать", action: function() {
				console.log(this.text);
			}}
	]
});