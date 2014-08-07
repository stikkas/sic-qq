/**
 * Модифицирование Ext.form.field.Number: в режиме disabled показывается не
 * текстфилд, а метка с текстом.
 */
Ext.define('hawk_common.fix.FixedNumberField', {
    requires : [ 'hawk_common.fix.FixedTextField' ],
    override : 'Ext.form.field.Number',
    setDisabled : function() {
	    var me = this;
	    var result = me.callOverridden(arguments);
	    me.changeMode();
	    return result;
    },
    getSubTplMarkup : function() {
	    var me = this;
	    var result = me.callOverridden(arguments);
	    result += '<div id="' + me.valueLabelDivId + '"></div>';
	    return result;
    },
    initComponent : function() {
	    var me = this;
	    me.valueLabelDivId = Ext.id();
	    me.callOverridden(arguments);
    },
    onRender : function() {
	    var me = this;
	    me.callOverridden(arguments);
	    if (!me.rendered) {
		    return;
	    }
	    me.label = Ext.create('Ext.form.Label', {
	        renderTo : me.valueLabelDivId,
	        text : '',
	        hidden : true
	    });
	    me.changeMode();
    }
});