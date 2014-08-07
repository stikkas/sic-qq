Ext.define('hawk_common.model.User',
		{
			extend: 'hawk_common.model.Model',
			fields:
				[
				 {
					 name: 'id',
					 type: 'string'
				 },
				 {
					 name: 'userId',
					 type: 'int'
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