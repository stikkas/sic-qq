/**
 * Панель корзина для мусора.
 */
Ext.define('qqext.view.exec.cmp.DeliveryTypeCount', {
	extend: 'qqext.cmp.Container',
	alias: 'DeliveryTypeCount',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.NumberField',
		'qqext.factory.HandlerButton'
	],
	layout: {
		type: 'hbox',
		align: 'middle'
	},
	height: 40,
	width: 600,
	loadRecord: function() {
		var me = this,
				model = me._model,
				del = qqext.delAction;
		me._combo.setValue(model.set(del.type[0]));
		me._number.setValue(model.set(del.count[0]));
	},
	updateRecord: function() {
		var me = this,
				model = me._model,
				del = qqext.delAction;
		model.set(del.type[0], me._combo.getValue());
		model.set(del.count[0], me._number.getValue());
	},
	constructor: function(parent) {
		var me = this;
		me._p = parent;
		me._model = Ext.create('DeliveryActionModel');
		qqext.request.delActions().add(me._model);
		me.callParent();
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				del = qqext.delAction;
		Ext.applyIf(me, {
			items: [
				me._combo = createCmp('FComboBox', del.type[1], del.type[0], del.type[0], {
					editable: false/*,
					 labelWidth: 100,
					 width: 250,
					 height: 22 */
				}),
				me._number = createCmp('FNumberField', del.count[1], del.count[0], {
					labelAlign: 'right',
					minValue: 1,
					maxValue: 100,
					value: 1/*,
					 hideTrigger: true,
					 width: 230,
					 labelWidth: 150*/
				}),
				createCmp('FHandlerButton', 'Удалить', function() {
					// пока так, потом надо сделать проверку на наличие на сервере
					this.model.destroy({callback: function(r, o) {
							me._p.remove(me, true);
						}});
				})
			]
		});
		me.callParent();
	},
	validate: function(errors) {
		var me = this;
		if (!me._combo.isValid)
			errors.push(me._combo.getErrors());
		if (!me._number.isValid())
			errors.push(me._number.getErrors());
	}
});
