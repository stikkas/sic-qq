/**
 * 
 */
 Ext.define('qqext.view.exec.cmp.DeliveryTypeCount',{
 	extend:'Ext.form.FieldContainer',
 	
 	layout:{
 		type:'hbox',
 		align:'middle'
 	},
 	height:40,
 	width:600,
 	loadRecord:function(model){
 		this.items.getAt(0).setValue(model.get('docType'));
 		this.items.getAt(1).setValue(model.get('numOfDocs'));
 	},
 	updateRecord:function(model){
 		model.set('docType',this.items.getAt(0).getValue());
 		model.set('numOfDocs',this.items.getAt(1).getValue())
 	},
 	initComponent:function(){
 		var me = this;
 		var fields = new Array();
 		var combo, tf, trash;
 		combo = Ext.create('Ext.form.field.ComboBox',{
 			fieldLabel:'Тип документов',
 			valueField:'id',
 			displayField:'name',
 			store:'docType',
 			editable:false,
 			labelWidth:100,
 			width:250,
 			height:22
 		});
 		
 		tf = Ext.create('Ext.form.field.Number',{
 			fieldLabel:'Количество документов',
 			labelAlign:'right',
 			hideTrigger:true,
 			width:230,
 			labelWidth:150
 		});

 		trash = Ext.create('Ext.Button',{
 			text:'Trash',
 			action:'drop',
 			height:25,
 			margin:'0 0 0 15',
 			handler:function(){
                var owwNer = this.ownerCt.ownerCt;
 				owwNer.remove(this.ownerCt);
 			}
 		});
 		
 		Ext.applyIf(me,{
 			items:[combo,tf,trash]
 		});
 		me.callParent(arguments);
 	}
 })