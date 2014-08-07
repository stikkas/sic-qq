/**
 *  Форма поиска
 */
 
 Ext.define('qqext.view.search.VSearchForm',{
 	extend:'Ext.container.Container',
 	margin : '0 10 0 0',
 	loadRecord:function(model){
 		this.items.getAt(0).loadRecord(model);
 	},
 	updateRecord:function(model){
 		this.items.getAt(0).updateRecord(model);
 	},
 	initComponent:function(){
 		var me = this;
 		var params = Ext.create('qqext.view.search.VSearchParams',{
 			
 		});
 		var results = Ext.create('qqext.view.search.VSearchResult',{
 			
 		});
 		Ext.applyIf(me,{
 		items:[params,results]
 		});
 		me.callParent(arguments);
 	}
 })