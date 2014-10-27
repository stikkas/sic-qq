Ext.define('qqext.cmp.FieldSet', {
	alias: 'FieldSet',
	extend: 'Ext.form.FieldSet',
	mixins: ['qqext.cmp.PanelEditViewMode'],
	xtype: 'fieldsetcmp',
	setValue: function () {
		this.items.forEach(function (it) {
			it.setValue();
		});
	}
});


