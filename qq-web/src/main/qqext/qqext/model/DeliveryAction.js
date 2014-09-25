Ext.define('qqext.model.DeliveryAction', (function() {

	var ns = Ext.ns('qqext'),
			del = ns.delAction = {
				type: ['docType', 'Тип документов'],
				count: ['docCount', 'Количество документов']
			};
	return {
		alias: 'DeliveryActionModel',
		extend: 'Ext.data.Model',
		requires: ['Ext.data.proxy.Rest',
			'Ext.data.validations'],
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
			{name: 'question', type: 'int', convert: null, defaultValue: null},
			{name: del.type[0], type: 'int', convert: null, defaultValue: null},
			{name: del.count[0], type: 'int', convert: null, defaultValue: 1}
		],
		validations: [{type: 'presence', field: del.type[0], message: del.type[1] + ' должен быть указан'},
			{type: 'format', field: del.count[0], matcher: /[1-9][0-9]*/, message: del.count[1] + ' должно быть больше нуля'}
		],
		belongsTo: 'qqext.model.ExecutionInfo',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/deliveryaction',
			reader: 'json',
			writer: 'json'
		}
	};
})());