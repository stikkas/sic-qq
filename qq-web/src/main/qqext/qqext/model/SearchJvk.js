/** 
 * Общий набор полей для Табличных данных ЖВК и Поиска
 */
Ext.define('qqext.model.SearchJvk', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'litera', type: 'string'},
		{name: 'number', type: 'string'},
		{name: 'regDate', type: 'date', defaultValue: null, convert: function (v) {
				if (v)
					return new Date(v);
				return v;
			}},
		{name: 'otKogo', type: 'string'}
	]
});


