/**
 * Панель с кнопками меню для поиска.
 *
 * @author С. Благодатских
 */

Ext.define('qqext.view.menu.SearchEditMenu', {
	extend: 'qqext.view.menu.HButtonMenu',
	_buttons: [
		{text: "Добавить", action: function() {
				var consts = qqext.Constants,
						btn = consts.REQ_BUTTONS[0];
				consts.EDIT_MENUS.getLayout().setActiveItem(consts.EM_ID_1);
				consts.LEFT_MENUS.getLayout().setActiveItem(consts.LM_ID_1);
				btn.fireEvent('click', btn);
			}},
		{text: "Поиск", action: function() {
				console.log(this.text);
			}},
		{text: "Очистить", action: function() {
				console.log(this.text);
			}}
	]
});