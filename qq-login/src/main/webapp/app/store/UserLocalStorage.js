Ext.define('qqlogin.store.UserLocalStorage',
		{
			extend: 'Ext.data.Store',
			model: 'qqlogin.model.User',
			proxy:
					{
						type: 'localstorage',
						id: 'user'
					}
		});