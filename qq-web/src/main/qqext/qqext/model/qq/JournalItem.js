/**
 *
 */
Ext.define('qqext.model.qq.JournalItem', {
	alias: 'JournalItemModel',
	extend: 'Ext.data.Model',
	idProperty: 'id',
	fields: [{
			name: 'id',
			type: 'int'
		}, {
			name: 'litera',
			type: 'string'
		}, {
			name: 'inboxDocNum',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'regDate',
			type: 'date',
			defaultValue: null,
			dateFormat: 'd.m.Y',
			dateWriteFormat: 'd.m.Y',
			dateReadFormat: 'd.m.Y'
		}, {
			name: 'execDate',
			type: 'date',
			defaultValue: null,
			dateFormat: 'd.m.Y',
			dateWriteFormat: 'd.m.Y',
			dateReadFormat: 'd.m.Y'
		}, {
			name: 'fioOrg',
			type: 'string'
		}, {
			name: 'status',
			type: 'string'
		}, {
			name: 'executor',
			type: 'string'
		}]
});