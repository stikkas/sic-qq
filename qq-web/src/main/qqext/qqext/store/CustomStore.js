/**
 * 
 */
 Ext.define('qqext.store.CustomStore',{
 	extend:'Ext.data.Store',
 	constructor:function(parm){
 		this.proxy={
				type : 'ajax',
				url : parm.url,
				reader : {
					type : 'json',
					root:'items',
					total:'totalCount'
				}
			};
		this.callParent(arguments);
 	}
 });