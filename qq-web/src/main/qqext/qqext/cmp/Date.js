/**
 *  Компонент Date, позволяющий вводить дату и может находится как
 *  в режиме редактирования, так и в режиме просмотра.
 *
 */
Ext.define('qqext.cmp.Date', {
	alias: 'DateField',
	extend: 'Ext.form.field.Date',
	mixins: ['qqext.cmp.EditViewMode'],
	xtype: 'datefieldcmp',
	format: 'd.m.Y',
	_getValue: function() {
		return Ext.Date.format(this.getValue(), 'd.m.Y');
	}
});
