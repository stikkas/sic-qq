/**
 * Store for dictionaries.
 */
Ext.define('qqext.store.DictStore', {
	alias: 'DictStore',
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: ['id', 'name', 'code'],
	autoLoad: true,
	constructor: function(storeId, dict, org) {

		var me = this;
		me.storeId = storeId;
		me.proxy = {
			type: 'rest',
			url: '/qq-web/rest/dict/' + dict,
			reader: 'json',
			writer: 'json',
			extraParams: {
				organization: org
			}
		};
		me.callParent();
	}
});
