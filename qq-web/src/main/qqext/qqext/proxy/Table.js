/** 
 * Общие настройки для прокси таблицы.
 * Используется в ЖВК и Поиске
 * 
 */
Ext.define('qqext.proxy.Table', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.table',
	timeout: 120000,
	reader: {
		type: 'json',
		root: 'items'
	}
});


