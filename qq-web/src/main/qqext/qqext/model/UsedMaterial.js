Ext.define('qqext.model.UsedMaterial', {
		extend: 'Ext.data.Model',
		requires: ['Ext.data.validations'],
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
			// Номер фонда
			{name: 'fondNum', type: 'string'},
			// Номер описи
			{name: 'opisNum', type: 'string'},
			// Номер единицы хранения
			{name: 'storeUnitNum', type: 'string'},
			// Номер листов
			{name: 'seriesNum', type: 'string'},
			// примечание
			{name: 'remark', type: 'string'}
		],
		validations: [{type: 'presence', field: 'fondNum', message: '№ фонда должен быть указан'},
			{type: 'presence', field: 'opisNum', message: '№ описи должен быть указан'},
			{type: 'presence', field: 'storeUnitNum', message: '№ ед. хранения должен быть указан'},
			{type: 'presence', field: 'seriesNum', message: '№ листов должен быть указан'}
		]
});