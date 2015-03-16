/**
 * Модель для формы "Уведомление заявителю"
 */
Ext.define('qqext.model.Notification',  {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Rest',
		'qqext.cmp.FilesReader'
	],
	idProperty: 'id',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null},
		{name: 'status', type: 'int', convert: null, defaultValue: null},
		{name: 'executor', type: 'int', convert: null, defaultValue: null},
		{name: 'docType', type: 'int', convert: null, defaultValue: null},
		{name: 'toWhom', type: 'string', convert: null, defaultValue: null},
		{name: 'delType', type: 'int', convert: null, defaultValue: null},
		{name: 'notiDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		{name: 'issueDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}}
	],
	proxy: {
		type: 'rest',
		url: 'rest/notification',
		reader: {
			type: 'files',
			model: 'qqext.model.Notification'
		},
		writer: 'json'
	}
});
