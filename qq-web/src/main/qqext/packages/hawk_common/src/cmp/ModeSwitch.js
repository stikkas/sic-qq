Ext.define('hawk_common.cmp.ModeSwitch',
		{
			extend: 'Ext.container.Container',
			requires: ['hawk_common.sys.Consts'],
			layout:
				{
					type: 'hbox'
				},
			alias: 'widget.modeSwitch',
			config:
				{
					//true - редактирование, false - просмотр
					editMode: false,
					//Компонент, который рисуется в случае editMode = true
					component: null,
					//Статический текст, отображаемый в случае editMode = false
					text: null,
					//Метка, отображаемая в случае editMode = false
					label: null,
					//Ширина метки
					labelWidth: null,
					//Функция преобразования значения компонента в текст для режима просмотра
					convert: function(value)
					{
						switch (this.component.getXType())
						{
						case 'datefield':
						case 'hawkDateField':
							return Ext.Date.format(value, hawk_common.sys.Consts.defaultDateFormat);
						case 'combobox':
						case 'comboboxWEmpty':
							if (value)
								return this.component.getStore().getById(value).getData()[this.component.displayField];
							else
								return value;
						case 'checkboxfield':
							if (value)
								return 'Да';
							else
								return 'Нет';
						}
						return value;
					}
				},
			
			initComponent: function()
			{
				this.labelLabel = Ext.create('Ext.form.Label',
						{
							text: this.label,
							width: this.labelWidth,
							hidden: this.editMode
						});
				this.labelText = Ext.create('Ext.form.Label',
						{
							text: this.text,
							flex: 1,
							hidden: this.editMode,
							cls:'label_view'
						});
									
				this.items = [this.labelLabel, this.labelText];
				
				this.callParent(arguments);
				
				if (this.component)
				{
					this.component.on('change', function(component, value)
							{
								this.labelText.setText(this.convert(component.value));
							}, 
							this);
					
					this.insert(0, this.component);
					this.switchComponents(this.editMode);
				}
			},
			applyEditMode: function(editMode)
			{
				if (editMode != this.editMode)
					this.switchComponents(editMode);

				return editMode;
			},
			switchComponents: function(editMode)
			{
				this.labelLabel.setVisible(!editMode);
				this.labelText.setVisible(!editMode);
				
				if (this.component)
				{
					this.component.setVisible(editMode);
					
					if (!editMode)
					{
						this.labelText.setText(this.convert(this.component.value));
						this.labelLabel.setText(this.component.fieldLabel);
						this.labelLabel.setWidth(this.component.labelWidth);
					}
				}
			}
		});