Ext.define('hawk_common.cmp.FilesList',
		{
			extend: 'Ext.container.Container',
			layout:
				{
					type: 'vbox'
				},
			alias: 'widget.filesList',
			config:
				{
					//режим работы (true - редактирование, false - просмотр)
					editMode: false,
					//название раздела
					sectionName: null,
					//надпись на кнопке
					buttonText: 'Прикрепить',
					//префикс поля name для полей input[type=file]
					namePrefix: 'fl'
				},
			flIndex: 0,
				
			initComponent: function()
			{
				var sectionLabel = null;
				if (this.sectionName)
					sectionLabel = Ext.create('Ext.form.Label',
							{
								text: this.sectionName,
								width: '100%'
							});
				
				this.items = [sectionLabel, this.createAttachButton()];
				
				this.callParent(arguments);
				this.applyEditMode(this.editMode);
			},
			
			createAttachButton: function()
			{
				this.attachButton = Ext.create('hawk_common.cmp.FileField',
						{
							buttonOnly: true,
							buttonText: this.buttonText,
							name: this.namePrefix + this.flIndex++,
							cls:'attach',
							listeners:
								{
									'change': this.onAttachFile,
									scope: this
								}
						});
				return this.attachButton;
			},
				
			onAttachFile: function(component, value)
			{
				var newFile = Ext.create('Ext.container.Container',
						{
							layout:
								{
									type: 'hbox'
								},
							items:
								[
								 {
									xtype: 'label',
									text: value,
									cls:'att_files'
								 },
								 {
									xtype: 'button',
									cls:'garbage',
									handler: function(btn)
									{
										var fileInfo = btn.up();
										this.remove(fileInfo);
									},
									scope: this
								 },
								 component
								]
						});
				component.hide();
				this.add(newFile);
				this.insert(1, this.createAttachButton());
			},
			
			applyEditMode: function(editMode)
			{
				this.attachButton.setVisible(editMode);
				
				this.items.each(function(component)
						{
							if (component.xtype == 'button')
								component.setVisible(editMode);
						});
				return editMode;
			},
			
			addExistingFile: function(file)
			{
				var newFile = Ext.create('Ext.container.Container',
						{
							layout:
								{
									type: 'hbox'
								},
							items:
								[
								 {
									 xtype: 'box',
									 autoEl:
										 {
										 	tag: 'a',
										 	href: file.link,
										 	html: file.name,
											cls:'att_files',
										 	target: '_blank'
										 }
								 },
								 {
									 xtype: 'button',
									 cls: 'garbage',
									 action: 'removeExisting',
									 fileId: file.id,
									 hidden: !this.editMode
								 }
								]
						});
				this.add(newFile);
			},
			
			clearFiles: function()
			{
				var me = this;
				var files = Ext.ComponentQuery.query('container', me);
				Ext.each(files, function(file)
						{
							me.remove(file);
						});
			}
		});