Ext.define('qqext.model.DeliveryAction', (function() {

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
		belongsTo: 'qqext.model.Question',
		requires: ['qqext.model.RestProxy'],
		constructor: function() {
			this.proxy = Ext.create('qqext.model.RestProxy', 'deliveryaction');
			this.callParent();
		}

	};
})());