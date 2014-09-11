Ext.define('qqext.model.qq.Transmission', {
	alias: 'TransmissionModel',
	requires: ['qqext.model.qq.Question'],
	extend: 'Ext.data.Model',
	idProperty: 'id',
	clientIdProperty: 'cliId',
	fields: [{
			name: 'cliId',
			type: 'string'
		}, {
			name: 'id',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'responsibleForExecution',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'responsibleForExecutionDate',
			type: 'date'
		}, {
			name: 'executorName',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'executorDate',
			type: 'date'
		}, {
			name: 'control',
			type: 'boolean'
		}, {
			name: 'controlDateOfExecution',
			type: 'date'
		}, {
			name: 'resolutionAuthor',
			type: 'string'
		}, {
			name: 'storageTerritory',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'storageName',
			type: 'string'
		}],
	belongsTo: 'QuestionModel',
	proxy: {
		type: 'ajax',
		url: 'api/Transmission',
		api: {
			create: 'api/Transmission?action=create',
			read: 'api/Transmission?action=read',
			update: 'api/Transmission?action=update',
			destroy: 'api/Transmission?action=destroy'
		},
		reader: {
			type: 'json',
			root: 'data',
			messageProperty: 'msg',
			successProperty: 'success'
		},
		writer: {
			type: 'json'
		}
	}
});