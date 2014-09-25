Ext.define('qqext.model.UsedMaterial', (function() {
	var ns = Ext.ns('qqext'),
			mat = ns.usedMaterial = {
				fond: ['fondNumber', '№ фонда'],
				opis: ['opisNumber', '№ описи'],
				storage: ['storageUnitNumber', '№ ед. хранения'],
				pages: ['seriesNumber', '№ листов'],
				remark: ['remark', 'примечание']
			};
	return {
		alias: 'UsedMaterialModel',
		extend: 'Ext.data.Model',
		requires: ['Ext.data.proxy.Rest',
			'Ext.data.validations'],
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', convert: null, defaultValue: null, isNull: true},
			{name: 'question', type: 'int', convert: null, defaultValue: null},
			{name: mat.fond[0], type: 'string'},
			{name: mat.opis[0], type: 'string'},
			{name: mat.storage[0], type: 'string'},
			{name: mat.pages[0], type: 'string'},
			{name: mat.remark[0], type: 'string'}
		],
		validations: [{type: 'presence', field: mat.fond[0], message: mat.fond[1] + ' должен быть указан'},
			{type: 'presence', field: mat.opis[0], message: mat.opis[1] + ' должен быть указан'},
			{type: 'presence', field: mat.storage[0], message: mat.storage[1] + ' должен быть указан'},
			{type: 'presence', field: mat.pages[0], message: mat.pages[1] + ' должен быть указан'}
		],
		belongsTo: 'qqext.model.ExecutionInfo',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/usedmaterial',
			reader: 'json',
			writer: 'json'
		}
	};
})());