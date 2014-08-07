Ext.define('hawk_common.cmp.FileField',
		{
			extend: 'Ext.form.field.File',
			config:
				{
					multiple: true
				},
			xtype: 'hawkFileField',
			onRender: function()
			{
				this.callParent(arguments);
				var inputEl = this.button.fileInputEl;
				if (this.multiple)
					inputEl.set(
							{
								multiple: 'multiple'
							});
			},
			/**
			 * hello Function 
			 * @param {type} button
			 * @param {type} e
			 * @param {type} value
			 * @returns {undefined}
			 */
			onFileChange: function(button, e, value) 
		    {
		        this.duringFileSelect = true;
		        var files = this.button.fileInputEl.dom.files;
		        if (files.length > 1)
		        	value = 'Выбрано файлов: ' + files.length;
		        Ext.form.field.File.superclass.setValue.call(this, value);
		        delete this.duringFileSelect;
		    }
		});