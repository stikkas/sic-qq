Ext.define('qqext.model.SendAction', (function() {
	var ns = Ext.ns('qqext'),
			send = ns.sendAction = {
				type: ['sendType', 'Способ отправки'],
				date: ['sendDate', 'Дата']
			};
	return {
		alias: 'SendActionModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
			{name: 'question', type: 'int'},
			{name: send.type[0], type: 'int'},
			{name: send.date[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}}
		],
		requires: ['Ext.data.proxy.Rest'],
		belongsTo: 'qqext.model.Question',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/sendaction',
			reader: 'json',
			writer: 'json'
		}
	};
})());
