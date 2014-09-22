/**
 * Контейнер, в котором содержатся Типы документов и кол-во
 */
Ext.define('qqext.view.exec.cmp.DeliveryContainer', {
	extend: 'qqext.cmp.Container',
	requires: [
		'qqext.view.exec.cmp.DeliveryTypeCount',
		'qqext.factory.HandlerButton'
	],
	alias: 'DeliveryContainer',
	maxHeight: 400,
	overflowY: 'auto',
	layout: 'vbox',
	_tcs: [],
	initComponent: function() {
		var me = this,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [createCmp('FHandlerButton', 'Добавить',
						function() {
							me._tcs.push(me.add(createCmp('DeliveryTypeCount'), me));
						}
				)]
		});
		me.callParent();
	},
	_actItem: function(action, args) {
		this._tcs.forEach(function(v) {
			v[action](args);
		});
	},
	updateRecord: function() {
		this._actItem('updateRecord');
	},
	loadRecord: function() {
		this._actItem('loadRecord');
	},
	isValid: function() {
		var me = this;
		me._errors = [];
		me._actItem('validate', me._errors);
		return me._errors.length === 0;
	},
	getErrors: function() {
		return this._errors;
	}
});
