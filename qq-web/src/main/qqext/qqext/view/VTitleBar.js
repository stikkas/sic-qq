/**
 * Заголовочная панель с кнопками управления.
 */
Ext.define('qqext.view.VTitleBar', {
	extend: 'Ext.form.Panel',
	title: 'АС Запросы',
	region: 'north',
	buttons: [
		{text: 'Добавить', action: 'add_query'},
		{text: 'Поиск', action: 'start_search'},
		{text: 'Очистить', action: 'clear'}
	],
	layout: {
		type: 'hbox'
	},
	margin: '0 0 10 0',
	buttonAlign: 'left' //,
//			height:50
});