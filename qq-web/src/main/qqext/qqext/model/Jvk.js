/** 
 * Абстрактный класс модели для журнала входящих сообщений.
 * От него наследуются SicJvk (ЖВК для СИЦ) и ArchiveJvk (ЖВК для архивов)
 */
Ext.define('qqext.model.Jvk', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'litera', type: 'string'},
		{name: 'number', type: 'string'},
		{name: 'regDate', type: 'date', defaultValue: null, convert: function(v){
			if (v)
				return new Date(v);
			return v;
		}},
		// Нужна для раскрашивания просроченных заявок
		{name: 'controlDate', type: 'date', defaultValue: null, convert: function(v){
			if (v)
				return new Date(v);
			return v;
		}},
		// Нужна для раскрашивания просроченных заявок
		{name: 'planDate', type: 'date', defaultValue: null, convert: function(v){
			if (v)
				return new Date(v);
			return v;
		}},
		{name: 'otKogo', type: 'string'},
		{name: 'status', type: 'string'},
		{name: 'executor', type: 'string'}
	]
});
