/** 
 * Абстрактный класс модели для журнала входящих сообщений.
 * От него наследуются SicJvk (ЖВК для СИЦ) и ArchiveJvk (ЖВК для архивов)
 */
Ext.define('qqext.model.Jvk', {
	extend: 'qqext.model.SearchJvk',
	fields: [
		{name: 'controlDate', type: 'date', defaultValue: null, convert: function (v) {
				if (v)
					return new Date(v);
				return v;
			}},
		// Нужна для раскрашивания просроченных заявок
		{name: 'planDate', type: 'date', defaultValue: null, convert: function (v) {
				if (v)
					return new Date(v);
				return v;
			}},
		{name: 'status', type: 'string'},
		{name: 'executor', type: 'string'}
	]
});
