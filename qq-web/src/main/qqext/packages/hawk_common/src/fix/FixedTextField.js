/**
 * 
 */
Ext.define('hawk_common.fix.FixedTextField',{
	override:'Ext.form.field.Text',
	valueLabelDivId:null,
	label:null,
	disabledCls:'',
	onDisable:function(){
		var me = this;
		me.changeMode();
	},
	onEnable:function(){
		var me = this;
		me.changeMode();
	},
	setValue:function(){
		var me = this;
		me.callParent(arguments);
		if (me.label){
			me.label.setText(arguments[0]);
		}
//		me.value = arguments[0];
	},
	initComponent:function(){
		var me = this;
		me.valueLabelDivId = Ext.id();
		me.callOverridden(arguments);
	},
	onRender:function(){
		var me = this;
		me.callOverridden(arguments);
		if (!me.rendered){
			return;
		}
		if (me instanceof Ext.form.field.Number){
			return;
		}
		if (me instanceof Ext.form.field.Date){
			return;
		}
		me.label = Ext.create('Ext.form.Label',{
			renderTo:me.valueLabelDivId,
			text:'',
			hidden:true,
			height:30
		});
		me.changeMode();
	},
	setDisabled:function(){	
		var me = this;
		if (me.disabled==arguments[0]){
			return this;
		}
		me.disabled = arguments[0];
		me.changeMode();
		return this;
	},
	changeMode:function(){
		var me = this;
		if (!me.rendered){
			return;
		}
		if (!me.label){
			return;
		}
		if (me.disabled){
			me.inputEl.addCls('display-false');
			if (!(me instanceof Ext.form.field.ComboBox)){
				me.label.setText(me.getValue());
			}
			me.label.show();
		}else{
			me.label.hide();
			me.inputEl.dom.disabled = false;
			me.inputEl.removeCls('display-false');
		}
	},
	getSubTplMarkup:function(){
		var me = this;
		var result = me.callOverridden(arguments);
		result +='<div id="'+me.valueLabelDivId+'"></div>';
		return result;
	}
});