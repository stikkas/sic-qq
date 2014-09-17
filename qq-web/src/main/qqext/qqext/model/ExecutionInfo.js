Ext.define('qqext.model.ExecutionInfo', (function() {
	var ns = Ext.ns('qqext'),
			exec = ns.execInfo = {
				date: ['execDate', 'Дата исполнения'],
				result: ['answerResult', 'Результат ответа'],
				tema: ['usageAnswer', 'Тематика ответа'],
				category: ['categoryComplexity', 'Категория сложности']
			};
	return {
		alias: 'ExecutionInfoModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
//	clientIdProperty: 'cliId',
		fields: [
//		{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int', defaultValue: null, convert: null},
			{name: exec.date[0], type: 'date'},
			{name: exec.result[0], type: 'int', defaultValue: null, convert: null},
			{name: exec.tema[0], type: 'int', defaultValue: null, convert: null},
			{name: exec.category[0], type: 'int', defaultValue: null, convert: null}
		],
		belongsTo: 'qqext.model.Question',
		requires: ['qqext.model.RestProxy'],
		constructor: function() {
			this.proxy = Ext.create('qqext.model.RestProxy', 'execution');
			this.callParent();
		}

	}
})());