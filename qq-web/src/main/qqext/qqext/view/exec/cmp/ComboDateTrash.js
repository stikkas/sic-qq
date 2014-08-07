/**
 * 
 */
Ext.define('qqext.view.exec.cmp.ComboDateTrash', {
			extend : 'Ext.form.FieldContainer',
			layout : {
				type : 'hbox',
				align : 'middle'
			},
			/**
			 * 
			 * @param {store:
			 *            <storeId of store for combobox>, comboLabel: <text for
			 *            combo's label>, dateLabel: <text for datefield's
			 *            label>, } config
			 */
			constructor : function(config) {
				var me = this;
				var combo = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : config.comboLabel,
							store : config.store,
							displayField : 'name',
							valueField : 'id'
						});
				var df = Ext.create('Ext.form.field.Date', {
							fieldLabel : config.dateLabel,
							labelAlign : 'right',
							width : 180,
							labelWidth : 70
						});
				var trashBtn = Ext.create('Ext.Button', {
							text : 'trash',
							margin : '0 0 0 15',
							handler : function() {
								var owwNer = me.ownerCt;
								owwNer.remove(me);
								me.destroy();
							}
						})
				Ext.applyIf(me, {
							items : [combo, df, trashBtn]
						});
				me.callParent(arguments);
			},
			getComboValue : function() {
				var me = this;
				return me.items.getAt(0).getValue();
			},
			getDateValue : function() {
				var me = this;
				return me.items.getAt(1).getValue();
			},
			setComboValue:function(value){
				this.items.getAt(0).setValue(value);
			},
			setDateValue:function(value){
				this.items.getAt(1).setValue(value);
			}
		})