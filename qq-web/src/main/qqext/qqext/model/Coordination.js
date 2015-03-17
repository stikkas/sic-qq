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
		requires: ['Ext.data.proxy.Rest',
			'Ext.data.validations'],
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', defaultValue: null, convert: null, isNull: true},
			{name: 'question', type: 'int'},
			{name: coor.stage[0], type: 'int', defaultValue: null, convert: null},
			{name: coor.date[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}}
		],
		validations: [{type: 'presence', field: coor.stage[0], message: coor.stage[1] + ' должен быть указан'},
			{type: 'presence', field: coor.date[0], message: coor.date[1] + ' должна быть указана'}
		],
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/coordination',
			reader: 'json',
			writer: 'json'
		}

	};
})());
