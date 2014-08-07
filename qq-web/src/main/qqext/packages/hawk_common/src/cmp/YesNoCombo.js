/**
 * 
 */
Ext.define('hawk_common.cmp.YesNoCombo', {
    extend : 'Ext.form.field.ComboBox',
    xtype:'yesnocombo',
    width:250,
    editable:false,
    store : Ext.create('Ext.data.Store', {
        fields : [ 'value', 'text' ],
        data : [ {
            "value" : "no",
            "text" : "<<все>>"
        }, {
            "value" : true,
            "text" : "Да"
        }, {
            "value" : false,
            "text" : "Нет"
        } ]
    }),
    displayField : 'text',
    valueField : 'value',
    emptyText:'<<все>>',
    listeners:{
    	select:function(combo,records,eopts){
    		if (records[0].data.value=='no'){
    			combo.reset();
    		}
    	}
    }
});