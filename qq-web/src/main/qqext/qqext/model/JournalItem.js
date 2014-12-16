/**
 *
 */
Ext.define('qqext.model.JournalItem', {
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
			name: 'queryType',
			type: 'string'
		}, {
			name: 'inboxDocNum',
			type: 'string',
			defaultValue: null,
			convert: function (v) {
				if (v === 'null/null')
					return '';
				return v;
			}
		}, {
			name: 'regDate',
			type: 'date',
			defaultValue: null,
			dateFormat: 'd.m.Y',
			dateWriteFormat: 'd.m.Y',
			dateReadFormat: 'd.m.Y'
		}, {
			name: 'plannedDate',
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
			name: 'notifyStatus',
			type: 'string'
		}, {
			name: 'execOrg',
			type: 'string'
		}, {
			name: 'executor',
			type: 'string'
		}, {
			name: 'controlDate',
			type: 'date',
			defaultValue: null,
			dateFormat: 'd.m.Y',
			dateWriteFormat: 'd.m.Y',
			dateReadFormat: 'd.m.Y'
		}]
});