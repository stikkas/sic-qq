/**
 * Вертикальное кнопочное меню.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.VButtonMenu', {
	alias: 'VButtonMenu',
	extend: 'qqext.view.menu.ButtonMenu',
	requires: ['Ext.layout.container.VBox'],
	layout: {type: 'vbox', align: 'stretch'}
});