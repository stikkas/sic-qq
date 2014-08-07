Ext.define('hawk_common.model.Model',
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
				
				if (this.associations)
					this.associations.each(function(association)
							{
								if (association.type == 'hasMany')
								{
									var store = eval('me.' + association.name + '()');
									store.on('remove', function(store, rec)
											{
												if (rec.get(rec.idProperty))
													this.setDirty();
											},
											me);
								}
							});
				if (!this.get(this.idProperty))
					this.setDirty();
			},
			emptyToNull: function(val, rec)
			{
				if (val === "")
					return null;
				
				return val;
			},
			isDirty: function()
			{
				if (this.dirty)
					return true;
				
				var rec = this;
				if (this.associations)
					for (var i = 0; i < this.associations.getCount(); i++)
					{
						var association = this.associations.getAt(i);
						if (association.type == 'hasMany')
						{
							var store = eval('rec.' + association.name + '()');
							for (var j = 0; j < store.count(); j++)
							{
								var childRec = store.data.getAt(j);
								if (childRec.isDirty())
									return true;
							}
						}
					}
				return false;
			}
		});