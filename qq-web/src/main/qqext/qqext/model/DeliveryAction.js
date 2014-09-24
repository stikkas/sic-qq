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
		fields: [
			{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
			{name: 'question', type: 'int', convert: null, defaultValue: null},
			{name: del.type[0], type: 'int', convert: null, defaultValue: null},
			{name: del.count[0], type: 'int', convert: null, defaultValue: 1}
		],
		belongsTo: 'qqext.model.Question',
		requires: ['Ext.data.proxy.Rest'],
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/deliveryaction',
			reader: 'json',
			writer: 'json'
		}
	};
})());