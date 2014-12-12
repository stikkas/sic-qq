Ext.define('qqext.model.WayToSend', (function () {
	var ns = Ext.ns('qqext'),
			way = ns.wayToSend = {
				remark: ['remark', 'Примечание'],
				number: ['issueNumber', 'Исходящий №']
			};
	return {
		alias: 'WayToSendModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int'},
			{name: way.number[0], type: 'string'},
			{name: way.remark[0], type: 'string'}
		],
		requires: ['Ext.data.proxy.Rest'],
		belongsTo: 'qqext.model.ExecutionInfo',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/waytosend',
			reader: 'json',
			writer: 'json'
		}
	};
})());