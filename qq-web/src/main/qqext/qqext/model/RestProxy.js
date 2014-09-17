/**
 * Общие настройки прокси для всех моделей. Каждая модель должна в конструкторе
 * добавить к URL свой конечный адрес.
 */
Ext.define('qqext.model.RestProxy', {
	extend: 'Ext.data.proxy.Rest',
	alias: 'RestProxy',
	constructor: function(model) {
		var me = this;
		me.type = 'rest';
		me.url = '/qq-web/rest/' + model;
		me.reader = 'json';
		me.writer = 'json';
		me.callParent();
	}
});