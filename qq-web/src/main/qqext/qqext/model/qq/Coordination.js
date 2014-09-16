/**
 * Согласование документа (рис 5). вкладка
 * "Исполнение запроса"
 */

Ext.define('qqext.model.qq.Coordination', (function() {
	var ns = Ext.ns('qqext'),
			coor = ns.coordination = {
				stage: ['stage', 'Этап согласования документа'],
				date: ['stageDate', 'Дата']
			};
	return {
		alias: 'CoordinationModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
//	clientIdProperty: 'cliId',
		fields: [
//		{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int'},
			{name: 'question', type: 'int'},
			{name: coor.stage[0], type: 'int', defaultValue: null, convert: null},
			{name: coor.date[0], type: 'date'}
		],
		belongsTo: 'qqext.model.qq.Question',
		requires: ['qqext.model.qq.RestProxy'],
		constructor: function() {
			this.proxy = Ext.create('qqext.model.qq.RestProxy', 'coordination');
			this.callParent();
		}

	};
})());
