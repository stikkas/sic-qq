/**
 *
 */
Ext.define('qqext.model.SearchResultItem', {
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
			convert: function (v) {
				if (v === 'null/null')
					return '';
				return v;
			}
		}, {
			name: 'regDate',
			type: 'date',
			defaultValue: null,
			convert: null
		}, {
			name: 'requestType',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'fioOrg',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'content',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'answerResult',
			type: 'string',
			defaultValue: null,
			convert: null
		}]
});
