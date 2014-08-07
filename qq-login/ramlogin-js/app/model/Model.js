Ext.define('ramlogin.model.Model',
		{
			extend: 'Ext.data.Model',
			init: function()
			{
				var me = this;
				if (this.validations)
					Ext.each(this.validations, function(validation)
							{
								validation.model = me;
							});
				
				if (this.fields)
					this.fields.each(function(field)
							{
								if (field.type.type == 'string' && field.useNull)
									field.convert = me.emptyToNull;
							});
			},
			emptyToNull: function(val, rec)
			{
				if (val === "")
					return null;
				
				return val;
			}
		});