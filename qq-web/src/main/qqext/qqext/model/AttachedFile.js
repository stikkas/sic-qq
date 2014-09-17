Ext.define('qqext.model.AttachedFile', {
	alias: 'AttachedFileModel',
	extend: 'Ext.data.Model',
	idProperty: 'id',
//	clientIdProperty: 'cliId',
	fields: [
		{name: 'id', type: 'int', convert: null, defaultValue: null},
//		{ name: 'cliId', type: 'string' },
		{name: 'fileName', type: 'string'},
		{name: 'fileType', type: 'int'},
		{name: 'question', type: 'int', defaultValue: null, convert: null}
	],
	belongsTo: 'qqext.model.Question',
	requires: ['Ext.data.proxy.Rest'],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/attachedfile',
		reader: 'json',
		writer: 'json'
	}
});

