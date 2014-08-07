/**
 * combo for chosing report output format
 * @sorokin
 * 29.01.2014
 */

Ext.define('hawk_common.cmp.ReportFormatCombo',{
	extend:'Ext.form.field.ComboBox',
	xtype:'reportformatcombo',
	editable:false,
	width:250,
	store:Ext.create('Ext.data.Store',{
        fields : [ 'value', 'text' ],
        data : [ {
            "value" : "pdf",
            "text" : ".pdf"
        }, {
            "value" : "doc",
            "text" : ".doc"
        } ]
	}),
	value:"pdf",
    displayField : 'text',
    valueField : 'value',
});