Ext.define('qqext.cmp.FieldSet', {
	alias: 'FieldSet',
	extend: 'Ext.form.FieldSet',
	mixins: ['qqext.cmp.PanelEditViewMode'],
	xtype: 'fieldsetcmp',
	setValue: function (value) {
		this._toAll('setValue', value);
	},
	setRequired: function (mode) {
		this._toAll('setRequired', mode);
	},
	_toAll: function (action) {
		var args = arguments;
		this.items.each(function (it) {
			it[action].apply(it,
					Array.prototype.slice.call(args).slice(1));
		});
	}
});


