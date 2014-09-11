Ext.define('qqext.model.qq.DeliveryAction', {
	alias: 'DeliveryActionModel',
	extend: 'Ext.data.Model',
	idProperty: 'id',
	clientIdProperty: 'cliId',
	fields: [{
			name: 'cliId',
			type: 'string'
		}, {
			name: 'id',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'q',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'docType',
			type: 'int',
			convert: null,
			defaultValue: null

		}, {
			name: 'numOfDocs',
			type: 'int',
			convert: null,
			defaultValue: null
		}]
});