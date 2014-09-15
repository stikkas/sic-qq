Ext.define('qqext.model.qq.SendAction', (function() {
	var ns = Ext.ns('qqext'),
			send = ns.sendAction = {
				type: ['sendType', 'Способ отправки'],
				date: ['sendDate', 'Дата']
			};
	return {
		alias: 'SendActionModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
		clientIdProperty: 'cliId',
		fields: [
			{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int'},
			{name: 'question', type: 'int'},
			{name: send.type[0], type: 'int'},
			{name: send.date[0], type: 'date'}
		],
		belongsTo: 'qqext.model.qq.Question',
		mixins: ['qqext.qq.model.RestProxy'],
		constructor: function() {
			this.proxy.url += 'sendaction';
			this.callParent(arguments);
		}
	};
})());
