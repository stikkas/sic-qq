Ext.define('qqext.model.WayToSend', (function() {
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
		fields: [
			{name: 'id', type: 'int'},
			{name: way.notice[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}},
			{name: way.number[0], type: 'string'},
			{name: way.remark[0], type: 'string'}
		],
		requires: ['Ext.data.proxy.Rest'],
		belongsTo: 'qqext.model.Question',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/waytosend',
			reader: 'json',
			writer: 'json'
		}
	};
})());