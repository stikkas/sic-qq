/** 
 * Общие настройки для прокси комбобоксов
 */
Ext.define('qqext.proxy.Combo', {
	extend: 'Ext.data.proxy.Ajax',
	alias: 'proxy.combo',
	// Не посылать эти параметры серверу
	pageParam: '',
	startParam: '',
	limitParam: ''
});


