/**
 * Модель для "Подготовленный документ" в "В уведомлении заявителю"
 */
Ext.define('qqext.model.PreparedDoc', {
	alias: 'PreparedDocModel',
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
		{name: 'name', type: 'string'},
		{name: 'type', type: 'int', defaultValue: null, convert: null},
		{name: 'question', type: 'int', defaultValue: null, convert: null}
	],
	belongsTo: 'qqext.model.Notification',
	requires: ['Ext.data.proxy.Rest'],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/attachedfile/info',
		reader: 'json',
		writer: 'json'
	}
});
