/**
 * 
 */
 Ext.define('qqext.view.search.FioFieldContainer',{
 	extend:'Ext.form.FieldContainer',
 	layout:{
 		type:'hbox'
 	},
 	height:30,
 	initComponent:function(){
 		var me = this;
 		var f = Ext.create('Ext.form.field.Text',{
 			fieldLabel:'Фамилия',
 			name:me.nSurname
 		});
 		
 		var n = Ext.create('Ext.form.field.Text',{
 			fieldLabel:'Имя',
 			labelAlign:'right',
 			name:me.nName
 		});
 		
 		var ff = Ext.create('Ext.form.field.Text',{
 			fieldLabel:'Отчество',
 			labelAlign:'right',
 			name:me.nFatherName
 		});
 		Ext.applyIf(me,{
 			items:[f,n,ff]
 		});
 		
 		me.callParent(arguments);
 	}
 });