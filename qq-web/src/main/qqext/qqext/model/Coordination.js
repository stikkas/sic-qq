/**
 * Согласование документа (рис 5). вкладка
 * "Исполнение запроса"
 */

Ext.define('qqext.model.Coordination', (function() {
	var ns = Ext.ns('qqext'),
			coor = ns.coordination = {
				stage: ['stage', 'Этап согласования документа'],
				date: ['stageDate', 'Дата']
			};
	return {
		alias: 'CoordinationModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int'},
			{name: 'question', type: 'int'},
			{name: coor.stage[0], type: 'int', defaultValue: null, convert: null},
			{name: coor.date[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}}
		],
		belongsTo: 'qqext.model.Question',
		requires: ['Ext.data.proxy.Rest'],
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/coordination',
			reader: 'json',
			writer: 'json'
		}

	};
})());