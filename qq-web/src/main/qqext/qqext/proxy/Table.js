/** 
 * Общие настройки для прокси таблицы
 */
Ext.define('qqext.proxy.Table', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.table',
	reader: {
		type: 'json',
		rootProperty: 'items',
		totalProperty: 'total'
	}
});


