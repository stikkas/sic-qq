Ext.define('qqext.model.Transmission', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Rest',
		'qqext.cmp.ManyOneReader'
	],
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', defaultValue: null, convert: null},
		// Ответственный за исполнение
		{name: 'bossExec', type: 'int', convert: null, defaultValue: null},
		// Дата ответственного за исполнение
		{name: 'bossExecDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		// ФИО исполнителя
		{name: 'executor', type: 'int', convert: null, defaultValue: null},
		// Дата исполнителя 
		{name: 'execDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		// Контроль
		{name: 'control', type: 'boolean', defaultValue: false},
		// Дата контроля
		{name: 'controlDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		// Автор резолюции
		{name: 'resAuthor', type: 'string'},
		// Территория хранилища
		{name: 'storeTeritory', type: 'int', defaultValue: null, convert: null},
		// Название хранилища
		{name: 'storeName', type: 'string'},
		// Статус запроса
		{name: 'status', type: 'int', defaultValue: null, convert: null}
	],
	proxy: {
		type: 'rest',
		url: 'rest/transmission',
		reader: {
			type: 'manyone',
			hasField: 'assistants',
			model: 'qqext.model.Transmission'
		},
		writer: 'json'
	}
});
