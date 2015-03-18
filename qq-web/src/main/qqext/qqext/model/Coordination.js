/**
 * Согласование документа (рис 5). вкладка
 * "Исполнение запроса"
 */

Ext.define('qqext.model.Coordination', {
	extend: 'Ext.data.Model',
	requires: ['Ext.data.validations'],
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', defaultValue: null, convert: null, isNull: true},
		//Этап согласования документа 
		{name: 'stage', type: 'int', defaultValue: null, convert: null},
		// Дата
		{name: 'stageDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}}
	],
	validations: [{type: 'presence', field: 'stage', message: 'Этап согласования документа должен быть указан'},
		{type: 'presence', field: 'stageDate', message: 'Дата должна быть указана'}
	]
});
