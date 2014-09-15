Ext.define('qqext.model.qq.DeliveryAction', (function() {

	var ns = Ext.ns('qqext'),
			del = ns.delAction = {
				type: ['docType', 'Тип документов'],
				count: ['docCount', 'Количество документов']
			};
	return {
		alias: 'DeliveryActionModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
//	clientIdProperty: 'cliId',
		fields: [
//		{ name: 'cliId', type: 'string' },
			{name: 'id', type: 'int', convert: null, defaultValue: null},
			{name: 'question', type: 'int', convert: null, defaultValue: null},
			{name: del.type[0], type: 'int', convert: null, defaultValue: null},
			{name: del.count[0], type: 'int', convert: null, defaultValue: null}
		],
		belongsTo: 'qqext.model.qq.Question',
		mixins: ['qqext.qq.model.RestProxy'],
		constructor: function() {
			this.proxy.url += 'deliveryaction';
			this.callParent(arguments);
		}
	};
})());