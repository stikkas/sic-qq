/**
 *  Компонент ComboBox, позволяющий вводить данный из определнного хранилища и может находится как
 *  в режиме редактирования, так и в режиме просмотра.
 *
 */
Ext.define('qqext.cmp.ComboBox', {
	alias: 'ComboBox',
	extend: 'Ext.form.field.ComboBox',
	mixins: ['qqext.cmp.EditViewMode'],
	xtype: 'comboboxcmp',
	_getValue: function () {
		return this.getRawValue();
	},
	initComponent: function () {
		this.callParent();
		this.addListener('afterrender', function (t) {
			t.inputEl.dom.removeAttribute('id');
		});
	}
});

