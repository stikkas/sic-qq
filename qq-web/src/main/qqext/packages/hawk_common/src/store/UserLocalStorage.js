Ext.define('hawk_common.store.UserLocalStorage',
		{
			extend: 'Ext.data.Store',
			model: 'hawk_common.model.User',
			proxy:
				{
					type: 'localstorage',
					id: 'user'
				}
		});