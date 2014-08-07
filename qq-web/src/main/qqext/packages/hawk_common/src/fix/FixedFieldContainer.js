/**
 * 
 */
Ext.define('hawk_common.fix.FixedFieldContainer',{
	override:'Ext.form.FieldContainer',
	labelSeparator:'',
	setDisabled:function(){
		var me = this;
		for (var i = 0 ; i < me.items.length;i++){
			me.items.getAt(i).setDisabled(arguments[0]);
		}
	}
});