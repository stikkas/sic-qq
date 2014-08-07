/**
 *  Левый блок меню для разделов "ЖВК", "ПОИСК", "Отчетные документы"
 */
 
 Ext.define('qqext.view.VLeftMenuSearch',{
 	extend:'Ext.container.Container',
 	layout:{
 		type:'vbox'
 	},
 	initComponent:function(){
 		var me = this;
 		var journalBtn = Ext.create('Ext.Button',{
 			text:'ЖВК',
 			width:200,
 			action:'journal'
 		});
 		
 		var searchBtn = Ext.create('Ext.Button',{
 			text:'Поиск',
 			action:'search',
 			width:200
 		});
 		
 		var reportDocsBtn = Ext.create('Ext.Button',{
 			text:'Отчетные документы',
 			width:200,
 			action:'reports'
 		});
 		
 		Ext.applyIf(me,{
 			items:[journalBtn,searchBtn,reportDocsBtn]
 		});
 		
 		me.callParent(arguments);
 	}
 });