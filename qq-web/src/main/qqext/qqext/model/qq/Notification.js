Ext.define('qqext.model.qq.Notification', {
	alias: 'NotificationModel',
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
			name: 'executor',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'docType',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'deliveryType',
			type: 'int',
			convert: null,
			defaultValue: null
		}, {
			name: 'notificationDate',
			type: 'date'
		}],
	proxy: {
		type: 'ajax',
		url: 'api/Notification',
		api: {
			create: 'api/Notification?action=create',
			read: 'api/Notification?action=read',
			update: 'api/Notification?action=update',
			destroy: 'api/Notification?action=destroy'
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