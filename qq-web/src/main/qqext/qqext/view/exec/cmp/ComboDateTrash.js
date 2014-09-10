/**
 *
 */
Ext.define('qqext.view.exec.cmp.ComboDateTrash', {
	alias: 'ComboDateTrash',
	extend: 'Ext.form.FieldContainer',
	required: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.factory.HandlerButton'
	],
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	/**
	 *
	 * @param {store:
	 *            <storeId of store for combobox>, comboLabel: <text for
	 *            combo's label>, dateLabel: <text for datefield's
	 *            label>, } config
	 */
	constructor: function(config) {
		var me = this,
				factory = qqext.factory;

		Ext.applyIf(me, {
			items: [
				new factory.ComboBox(config.comboLabel, config.store),
				new factory.DateField(config.dateLabel).cfg({
					labelAlign: 'right',
					width: 180,
					labelWidth: 70
				}),
				new factory.HandlerButton('trash', function() {
					me.ownerCt.remove(me);
					me.destroy();
				}).cfg({margin: '0 0 0 15'})
			]
		});
		me.callParent(arguments);
	},
	getComboValue: function() {
		var me = this;
		return me.items.getAt(0).getValue();
	},
	getDateValue: function() {
		var me = this;
		return me.items.getAt(1).getValue();
	},
	setComboValue: function(value) {
		this.items.getAt(0).setValue(value);
	},
	setDateValue: function(value) {
		this.items.getAt(1).setValue(value);
	}
});
