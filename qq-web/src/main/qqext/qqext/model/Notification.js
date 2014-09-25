Ext.define('qqext.model.Notification', (function() {
	var ns = Ext.ns('qqext'),
			notf = ns.notification = {
				executor: ['executor', 'ФИО исполнителя'],
				docType: ['docType', 'Тип документов'],
				deliveryType: ['deliveryType', 'Способ передачи'],
				notificationDate: ['notificationDate', 'Дата уведомления']
			};

	return {
		alias: 'NotificationModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', convert: null, defaultValue: null},
			{name: notf.executor[0], type: 'int', convert: null, defaultValue: null},
			{name: notf.docType[0], type: 'int', convert: null, defaultValue: null},
			{name: notf.deliveryType[0], type: 'int', convert: null, defaultValue: null},
			{name: notf.notificationDate[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}}
		],
		belongsTo: 'qqext.model.Question',
		requires: ['Ext.data.proxy.Rest'],
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/notification',
			reader: 'json',
			writer: 'json'
		}
	};
})());
