Ext.define('qqext.model.qq.AttachedFile', {
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
	belongsTo: 'qqext.model.qq.Question',
	mixins: ['qqext.qq.model.RestProxy'],
	constructor: function() {
		this.proxy.url += 'attachedfile';
		this.callParent(arguments);
	}
});
