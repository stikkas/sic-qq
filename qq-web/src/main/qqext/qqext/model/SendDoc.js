/**
 * Модель для "Ответ" в "Исполнение запроса"
 */
Ext.define('qqext.model.SendDoc', {
	alias: 'SendDocModel',
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
		{name: 'name', type: 'string'},
		{name: 'type', type: 'int', defaultValue: null, convert: null},
		{name: 'question', type: 'int', defaultValue: null, convert: null}
	],
	belongsTo: 'qqext.model.ExecutionInfo',
	requires: ['Ext.data.proxy.Rest'],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/attachedfile/execution',
		reader: 'json',
		writer: 'json'
	}
});

