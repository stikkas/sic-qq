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
				createCmp = Ext.create;

		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', config.comboLabel, config.store, 'fcomboBoxId'),
				createCmp('FDateField', config.dateLabel, {
					labelAlign: 'right',
					width: 180,
					labelWidth: 70
				}),
				createCmp('FHandlerButton', 'trash', function() {
					me.ownerCt.remove(me);
					me.destroy();
				}, {margin: '0 0 0 15'})
			]
		});
		me.callParent();
	},
	getComboValue: function() {
		return this.items.getAt(0).getValue();
	},
	getDateValue: function() {
		return this.items.getAt(1).getValue();
	},
	setComboValue: function(value) {
		this.items.getAt(0).setValue(value);
	},
	setDateValue: function(value) {
		this.items.getAt(1).setValue(value);
	}
});
