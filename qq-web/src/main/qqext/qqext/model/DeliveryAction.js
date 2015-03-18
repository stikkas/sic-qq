Ext.define('qqext.model.DeliveryAction', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.validations'],
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
		// Тип документов
		{name: 'docType', type: 'int', convert: null, defaultValue: null},
		// Количество документов
		{name: 'docCount', type: 'int', convert: null, defaultValue: 1}
	],
	validations: [{type: 'presence', field: 'docType', message: 'Тип документов должен быть указан'},
		{type: 'format', field: 'docCount', matcher: /[1-9][0-9]*/, message: 'Количиство документов должно быть больше нуля'}
	]
});
