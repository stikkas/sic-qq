Ext.define('hawk_common.cmp.ComboWithEmpty', {
	extend : 'Ext.form.field.ComboBox',
	xtype : 'comboboxWEmpty',
	emptyItemText: null,
	initComponent : function() {
		var me = this; 
		me.emptyText = me.emptyItemText;
		this.callParent(arguments);
		var store = this.getStore();
		var addEmpty = function(st) {
			if (st.noAddEmpty || st.getById(null)){
				return;
			}
			if (!store.getById(null)){
				var emptyObj = {};
				emptyObj[me.valueField] = null;
				emptyObj[me.displayField] = me.emptyItemText ? me.emptyItemText : '&nbsp';
				st.insert(0, emptyObj);
			}
		};
		store.on('load', addEmpty);
		if (!store.getById(null) && !store.noAddEmpty)
			addEmpty(store);
	},
	listeners : {
		select : function(cb, selection) {
			if (selection[0].data[cb.valueField] == null)
				cb.reset();
		}
	},
	getStore: function()
	{
		var store = this.callParent(arguments);
		var empty = store.getById(null);
		var emptyItemText = this.emptyItemText ? this.emptyItemText : '&nbsp';
		if (empty && empty.get(this.displayField) != emptyItemText)
			empty.set(this.displayField, emptyItemText);
		return store;
	}
});