
/**
 * Панель с кнопками меню для регистрации запроса
 *
 * @author С. Благодатских
 */

Ext.define('qqext.view.menu.RequestRegEditMenu', {
	extend: 'qqext.view.menu.HButtonMenu',
	_buttons: [
		{text: "Вернуться в поиск",
			action: function() {
				var consts = qqext.Constants,
						btn = consts.REQ_BUTTONS[0];
				consts.EDIT_MENUS.getLayout().setActiveItem(consts.EM_ID_0);
				consts.LEFT_MENUS.getLayout().setActiveItem(consts.LM_ID_0);
				btn.fireEvent('click', btn);
			}},
		{text: "Редактировать",
			action: function() {
				console.log(this.text);
			}},
		{text: "Сохранить",
			action: function() {
				console.log(this.text);
			}},
		{text: "Удалить",
			action: function() {
				console.log(this.text);
			}},
		{text: "Регистрировать",
			action: function() {
				console.log(this.text);
			}},
	]
});