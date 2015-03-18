Ext.define('qqext.model.Execution', {
	extend: 'Ext.data.Model',
	idProperty: 'id',
	requires: [
		'Ext.data.proxy.Rest',
		'qqext.model.UsedMaterial',
		'qqext.model.Coordination',
		'qqext.model.SendAction',
		'qqext.cmp.ManyOneReader'
	],
	fields: [
		{name: 'id', type: 'int', defaultValue: null, convert: null},
		// Дата исполнения
		{name: 'execDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}, defaultValue: null},
		// Уведомление о продлении сроков
		{name: 'prolongDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}, defaultValue: null},
		// Результат ответа
		{name: 'replyRes', type: 'int', defaultValue: null, convert: null},
		// Переадресовка, Рекомендация 
		{name: 'refer', type: 'string', defaultValue: null, convert: null},
		// Тематика ответа
		{name: 'replyTema', type: 'int', defaultValue: null, convert: null},
		// Категория сложности
		{name: 'difCat', type: 'int', defaultValue: null, convert: null},
		// Исходящий №
		{name: 'issueNum', type: 'string'},
		// Примечание
		{name: 'remark', type: 'string'},
		// Статус запроса
		{name: 'status', type: 'int', defaultValue: null, convert: null},
		// Плановая дата выполнения запроса
		{name: 'planDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}, defaultValue: null},
		// Исполнитель, нужен только для чтения
		{name: 'executor', type: 'int', defaultValue: null, convert: null}
	],
	associations: [
		{type: 'hasMany', model: 'qqext.model.DeliveryAction',
			name: 'deliveryactions', foreignKey: 'question'},
		{type: 'hasMany', model: 'qqext.model.UsedMaterial',
			name: 'usedmaterials', foreignKey: 'question'},
		{type: 'hasMany', model: 'qqext.model.Coordination',
			name: 'coordinations', foreignKey: 'question'},
		{type: 'hasMany', model: 'qqext.model.SendAction',
			name: 'sendactions', foreignKey: 'question'}
	],
	proxy: {
		type: 'rest',
		url: 'rest/execution',
		reader: {
			type: 'manyone',
			hasField: 'files',
			model: 'qqext.model.Execution'
		},
		writer: 'json'
	}
});
