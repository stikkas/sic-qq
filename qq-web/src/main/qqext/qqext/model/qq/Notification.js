Ext.define('qqext.model.qq.Notification', (function() {
	var ns = Ext.ns('qqext'),
			notf = ns.notification = {
				executor: ['executor', 'ФИО исполнителя'],
				docType: ['docType', 'Тип документов'],
				deliveryType: ['deliveryType', 'Способ передачи'],
				notificationDate: ['notificationDate', 'Дата уведомления'],
			};

	return {
		alias: 'NotificationModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
//	clientIdProperty: 'cliId',
		fields: [
//		{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int', convert: null, defaultValue: null},
			{name: notf.executor[0], type: 'int', convert: null, defaultValue: null},
			{name: notf.docType[0], type: 'int', convert: null, defaultValue: null},
			{name: notf.deliveryType[0], type: 'int', convert: null, defaultValue: null},
			{name: notf.notificationDate[0], type: 'date'}
		],
		belongsTo: 'qqext.model.qq.Question',
		mixins: ['qqext.qq.model.RestProxy'],
		constructor: function() {
			this.proxy.url += 'notification';
			this.callParent(arguments);
		}
	};
})());
