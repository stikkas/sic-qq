Ext.define('ramlogin.model.User',
        {
            extend: 'ramlogin.model.Model',
            fields:
                    [
                        {
                            name: 'id',
                            type: 'string'
                        },
                        {
                            name: 'name',
                            type: 'string'
                        },
                        {
                            name: 'access',
                            type: 'auto'
                        }
                    ]
        });