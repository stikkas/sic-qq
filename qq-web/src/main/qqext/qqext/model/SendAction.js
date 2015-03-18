Ext.define('qqext.model.SendAction', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.validations'
	],
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
		{name: 'sendType', type: 'int', convert: null, defaultValue: null},
		{name: 'sendDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}}
	],
	validations: [
		{type: 'presence', field: 'sendType', message: 'Способ отправки должен быть указан'},
		{type: 'presence', field: 'sendDate', message: 'Дата должна быть указана'}
	]
});

