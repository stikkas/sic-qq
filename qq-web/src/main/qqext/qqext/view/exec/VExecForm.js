/**
 * 
 */
Ext.define('qqext.view.exec.VExecForm', {
			extend : 'Ext.container.Container',
			requires : ['qqext.model.qq.ExecutionInfo'],
			overflowY : 'auto',
			disabled : false,
			maskOnDisable : false,
			height : 300,
			initComponent : function() {
				var me = this;
				var info = Ext.create('qqext.view.exec.VExecInfo');
				var delivery = Ext
						.create('qqext.view.exec.VDeliveryOfDocuments');
				var coordination = Ext.create('qqext.view.exec.VCoordination');
				var deliveryMethod = Ext
						.create('qqext.view.exec.VDeliveryMethod');
				Ext.applyIf(me, {
							items : [info, delivery, coordination,
									deliveryMethod]
						});
				me.callParent(arguments);
			},
			setDisabled : function() {
				var me = this;
				me.disabled = arguments[0];
				for (var i = 0; i < this.items.length; i++) {
					me.items.getAt(i).setDisabled(me.disabled);
				}
			},
			isDisabled : function() {
				return this.disabled;
			},
			loadRecord : function(model) {
				var me = this;
				var execInfo = model.getExecutionInfo();


				me.items.getAt(0).loadRecord(execInfo);
				me.items.getAt(1).loadRecord(model);
				me.items.getAt(2).loadRecord(model);
				me.items.getAt(3).loadRecord(model);
			},
			updateRecord:function(model){
				var me = this;
				me.items.getAt(0).updateRecord(model.getExecutionInfo());
				me.items.getAt(1).updateRecord(model);
				me.items.getAt(2).updateRecord(model);
				me.items.getAt(3).updateRecord(model);
				return model;
			}
		});