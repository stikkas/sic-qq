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
		idProperty: 'id',
//		clientIdProperty: 'cliId',
		fields: [
//			{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int', convert: null, defaultValue: null},
			{name: 'question', type: 'int', convert: null, defaultValue: null},
			{name: mat.fond[0], type: 'string'},
			{name: mat.opis[0], type: 'string'},
			{name: mat.storage[0], type: 'string'},
			{name: mat.pages[0], type: 'string'},
			{name: mat.remark[0], type: 'string'}
		],
		requires: ['Ext.data.proxy.Rest'],
		belongsTo: 'qqext.model.Question',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/usedmaterial',
			reader: 'json',
			writer: 'json'
		}
	};
})());