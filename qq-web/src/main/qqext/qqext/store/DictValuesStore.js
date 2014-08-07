/**
 * Store for dictionaries.
 */
Ext.define('qqext.store.DictValuesStore', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name','code'],
			autoLoad : true,
			/**
			 * Create instance of store for load values from dictionary
			 * 
			 * @param {}
			 *            config must contain fields: storeId:'<storeId> for
			 *            created store' dictCode:'<server descriptor group
			 *            code>'
			 */
			constructor : function(config) {
				
				var me = this;
				me.storeId = config.storeId;
				me.proxy = {
					type : 'ajax',
					url : 'api/DictValues',
					reader : {
						type : 'json'
					},
					extraParams : {
						action : 'getDictValues',
						dict : config.dictCode
					}
				};
				me.callParent(arguments);
			}
		});