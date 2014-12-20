/**
 * Модель для "Документы заявителя"
 */
Ext.define('qqext.model.ApplicantDoc', {
	alias: 'ApplicantDocModel',
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
		{name: 'name', type: 'string'},
		{name: 'type', type: 'int', defaultValue: null, convert: null},
		{name: 'question', type: 'int', defaultValue: null, convert: null}
	],
	belongsTo: 'qqext.model.Question',
	requires: ['Ext.data.proxy.Rest'],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/attachedfile/question',
		reader: 'json',
		writer: 'json'
	}
});

