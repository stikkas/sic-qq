Ext.define('qqext.model.qq.WayToSend', (function() {
	var ns = Ext.ns('qqext'),
			way = ns.wayToSend = {
				remark: ['remark', 'Примечание'],
				number: ['issueNumber', 'Исходящий №'],
				notice: ['renewalNotice', 'Уведомление о продлении сроков']
			};
	return {
		alias: 'WayToSendModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
//	clientIdProperty: 'cliId',
		fields: [
			{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int'},
			{name: way.notice[0], type: 'date'},
			{name: way.number[0], type: 'string'},
			{name: way.remark[0], type: 'string'}
		],
		belongsTo: 'qqext.model.qq.Question',
		requires: ['qqext.model.qq.RestProxy'],
		constructor: function() {
			this.proxy = Ext.create('qqext.model.qq.RestProxy', 'waytosend');
			this.callParent();
		}
	};
})());