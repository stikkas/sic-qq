/**
 * Модифицирование Ext.form.field.Date: в режиме disabled отображается не
 * компонент, а текстовая метка со значением.
 */
Ext.define('hawk_common.fix.FixedDateField', {
    override : 'Ext.form.field.Date',
    requires : [ 'hawk_common.fix.FixedTextField' ],
    name : 'fixedDateField',
    setValue : function() {
	    var me = this;
	    me.callParent(arguments);
	    if (me.label) {
		    var formattedValue = Ext.Date.format(me.getValue(), me.format);
		    me.label.setText(formattedValue);
	    }
    },
    changeMode : function() {
	    var me = this;
	    if (!me.rendered) {
		    return;
	    }
	    if (!me.label) {
		    return;
	    }
	    if (me.disabled) {
		    me.inputEl.addCls('display-false');
		    var formattedDate = Ext.Date.format(me.getValue(), me.format);
		    me.label.setText(formattedDate);
		    me.label.show();
		    me.triggerEl.hide();
		    me.triggerWrap.removeCls('x-form-trigger-wrap');
	    } else {
		    me.label.hide();
		    me.inputEl.dom.disabled = false;
		    me.inputEl.removeCls('display-false');
		    me.triggerEl.show();
		    me.triggerWrap.addCls('x-form-trigger-wrap');
	    }
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