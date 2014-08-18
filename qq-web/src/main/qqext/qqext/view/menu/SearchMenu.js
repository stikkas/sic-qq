/**
 * Меню для работы с поиском
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.SearchMenu', {
	extend: 'qqext.view.menu.VButtonMenu',
	_buttons: [
		{text: "ЖВК", action: function() {
				console.log(this.text);
			}},
		{text: "Поиск", action: function() {
				console.log(this.text);
			}},
		{text: "Отчетные документы", action: function() {
				console.log(this.text);
			}}
	],
	initComponent: function() {
		var me = this;
		me.callParent(arguments);
		qqext.Constants.SEARCH_BUTTONS = me.items.items;
	}
});

