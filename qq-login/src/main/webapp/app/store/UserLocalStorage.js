Ext.define('ramlogin.store.UserLocalStorage',
        {
            extend: 'Ext.data.Store',
            model: 'ramlogin.model.User',
            proxy:
                    {
                        type: 'localstorage',
                        id: 'user'
                    }
        });