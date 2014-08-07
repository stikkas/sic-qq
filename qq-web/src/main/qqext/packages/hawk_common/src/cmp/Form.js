Ext.define('hawk_common.cmp.Form',
		{
			extend: 'Ext.form.Panel',
//			xtype: 'form',
			errorString: '',
			isValid: function()
			{
				this.errorString = this.initErrors().items.join('<br>');
				return !this.errorString;
			},
			getErrorString: function()
			{
				return this.errorString;
			},
			initErrors: function()
			{
				var errorCollection = Ext.create('Ext.util.MixedCollection');
				var fields = this.getForm().getFields();
				var grids = Ext.ComponentQuery.query('grid', this);
				
				fields.each(function()
						{
							var field = this;
							var fieldLabel = field.getFieldLabel();
							if (field.up()['$className'].match(/()*CDateInterval/))
								fieldLabel = field.up().fromLabel;
							if (!field.isValid() && fieldLabel)
								Ext.each(field.getErrors(), function(error)
										{
											var text = '<b>' + fieldLabel + ':</b> ' + error;
											if (errorCollection.indexOf(text) < 0)
												errorCollection.add(text);
										});
						});
				
				Ext.each(grids, function(grid)
						{
							var store = grid.getStore();
							if (store.count() > 0)
								store.each(function()
										{
											var rec = this;
											var errors = rec.validate();
											if (!errors.isValid())
											{
												errors.each(function()
														{
															var err = this, label;
															Ext.each(grid.columns, function(column)
																	{
																		if (column.dataIndex == err.field)
																		{
																			label = column.text.replace('<br>', ' ');
																		}
																	});
															var text = '<b>' + label + ':</b> ' + err.message;
															if (errorCollection.indexOf(text) < 0)
																errorCollection.add(text);
														});
											}
										});	
						});
				
				return errorCollection;
			},
			validate: function()
			{
				if (!this.isValid())
				{
					Ext.Msg.show(
							{
								title: 'Ошибка',
								msg: this.getErrorString(),
								buttons: Ext.Msg.OK,
								icon: Ext.Msg.ERROR
							});
					return false;
				}
				return true;
			}
		});