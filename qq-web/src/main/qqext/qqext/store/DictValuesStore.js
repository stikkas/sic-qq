/**
 * Store for dictionaries.
 */
Ext.define('qqext.store.DictValuesStore', {
	alias: 'DictValuesStore',
	extend: 'Ext.data.Store',
	fields: ['id', 'name', 'code'],
	autoLoad: true,
	/**
	 * Create instance of store for load values from dictionary
	 *
	 * @param {}
	 *            config must contain fields: storeId:'<storeId> for
	 *            created store' dictCode:'<server descriptor group
	 *            code>'
	 */
	constructor: function(storeId, dictCode, opts) {

		var me = this;
		me.storeId = storeId;
		me.proxy = {
			type: 'ajax',
			url: '/qq-web/api/DictValues',
			reader: {
				type: 'json'
			},
			extraParams: {
				action: 'getDictValues',
				dict: dictCode
			}
		};
		me.callParent([opts]);
	}
});