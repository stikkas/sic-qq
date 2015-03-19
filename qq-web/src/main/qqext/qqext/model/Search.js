/**
 * Модель для таблицы результатов поиска по критериям
 */
Ext.define('qqext.model.Search', {
	extend: 'qqext.model.SearchJvk',
	fields: [
		{name: 'content', type: 'string'},
		{name: 'questionType', type: 'string'},
		{name: 'replyResult', type: 'string'}
	]
});
