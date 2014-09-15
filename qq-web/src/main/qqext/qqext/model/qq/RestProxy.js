/**
 * Общие настройки прокси для всех моделей. Каждая модель должна в конструкторе
 * добавить к URL свой конечный адрес.
 */
Ext.define('qqext.model.qq.RestProxy', {
	requires: ['Ext.data.proxy.Rest'],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/',
		reader: 'json',
		writer: 'json'
	}
});