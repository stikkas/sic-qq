/**
 * Меню для перехода между подсистемами и завершения сеанса.
 */


Ext.define('qqext.view.menu.NavigationMenu', {
	extend: 'qqext.view.menu.HButtonMenu',
	_buttons: [
		{text: "В начало", action: function() {
				console.log(this.text);
			}},
		{text: "Выйти", action: function() {
				console.log(this.text);
			}}
	]
});