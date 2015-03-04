/**
 * Модель ЖВК для Архивов
 */
Ext.define('qqext.model.ArchiveJvk', {
	extend: 'qqext.model.Jvk',
	fields: [
		{name: 'questionType', type: 'string'},
		{name: 'execDate', type: 'date', defaultValue: null, dateFormat: 'd.m.Y'}
	]
});
