/**
 * ComboBox с измененным видом в режиме setDisabled(true): в этом случае не
 * отрисовывается триггер и не показывается поле ввода, а текст отображается в
 * виде метки. Для работы необходимо наличие css класса .display-false{ display:
 * none }
 */
Ext.define('hawk_common.fix.FixedField', {
    override : 'Ext.form.field.ComboBox',
    requires : [ 'hawk_common.fix.FixedTextField' ],
    name:'fixedComboBox',
    divId : null,
    editable:false,
    setDisabled : function() {
	    var me = this;
	    me.callOverridden(arguments);
	    if (me.disabled) {
		    if (me.triggerEl)
			    me.triggerEl.hide();
			if (me.triggerWrap)
				me.triggerWrap.removeCls('x-form-trigger-wrap');
		    
	    } else {
		    if (me.triggerEl)
			    me.triggerEl.show();
			if (me.triggerWrap)
				me.triggerWrap.addCls('x-form-trigger-wrap');
	    }
    },
    onRender : function() {
	    var me = this;
	    me.callOverridden(arguments);
	    if (!me.rendered) {
		    return;
	    }
	    
	    var t = me.getValue();
	    var displayValue = t;
	    if (t) {
		    var storeObj = me.getStore().getById(t);
		    if (storeObj) {
			    displayValue = storeObj.data[me.displayField];
		    }
	    }
	    if (me.disabled) {
		    me.triggerEl.hide();
		    me.triggerWrap.removeCls('x-form-trigger-wrap');
	    } else {
		    me.triggerEl.show();
		    me.triggerWrap.addCls('x-form-trigger-wrap');
	    }
	    me.label.setText(displayValue);
    },
    changeListener : function(combo, nVal, oVal, eopts) {
	    var storeObj = combo.getStore().getById(nVal);
	    if (storeObj) {
		    var displayText = storeObj.data[combo.displayField];
		    if (displayText == '&nbsp') {
			    displayText = '';
		    }
		    if (combo['label']) {
			    combo['label'].setText(displayText);
		    }
	    } else {
		    if (combo['label']) {
			    combo['label'].setText('Не выбрано');
		    }
		    // Если отображается Не выбрано, а nVal != undefined,
		    // значит store комбо-бокса не загружено.
		    // для корректного отображения значения, необходимо, что бы store
		    // было загружено перед
		    // инициализацией данного компонента
	    }
    },
    initComponent : function() {
	    var me = this;
	    me.callOverridden(arguments);
	    me.addListener('change', me.changeListener);
    }
});