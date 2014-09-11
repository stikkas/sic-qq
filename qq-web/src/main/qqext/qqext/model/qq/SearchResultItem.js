/**
 *
 */
Ext.define('qqext.model.qq.SearchResultItem', {
	alias: 'SearchResultItemModel',
	extend: 'Ext.data.Model',
	fields: [{
			name: 'id',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'litera',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'inboxDocNum',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'regDate',
			type: 'date',
			defaultValue: null,
			convert: null
		}, {
			name: 'fioOrg',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'answerTematic',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'answerResult',
			type: 'string',
			defaultValue: null,
			convert: null
		}]
})