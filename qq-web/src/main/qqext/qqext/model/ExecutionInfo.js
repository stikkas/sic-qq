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
		fields: [
			{name: 'id', type: 'int', defaultValue: null, convert: null},
			{name: exec.date[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}},
			{name: exec.result[0], type: 'int', defaultValue: null, convert: null},
			{name: exec.tema[0], type: 'int', defaultValue: null, convert: null},
			{name: exec.category[0], type: 'int', defaultValue: null, convert: null}
		],
		belongsTo: 'qqext.model.Question',
		associations: [
			{type: 'hasMany', model: 'qqext.model.DeliveryAction',
				name: 'deliveryactions', foreignKey: 'question'},
			{type: 'hasMany', model: 'qqext.model.UsedMaterial',
				name: 'usedmaterials', foreignKey: 'question'},
			{type: 'hasMany', model: 'qqext.model.Coordination',
				name: 'coordinations', foreignKey: 'question'},
			{type: 'hasMany', model: 'qqext.model.SendAction',
				name: 'sendactions', foreignKey: 'question'},
			{type: 'hasOne', model: 'qqext.model.WayToSend', foreignKey: 'id',
				setterName: 'setWay', getterName: 'getWay'}
		],
		requires: ['Ext.data.proxy.Rest'],
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/execution',
			reader: 'json',
			writer: 'json'
		}
	}
})());