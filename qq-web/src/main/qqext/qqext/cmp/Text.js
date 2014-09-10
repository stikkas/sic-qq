/**
 *  Компонент Text позволяющий вводить текстовые данные и может находится как
 *  в режиме редактирования, так и в режиме просмотра.
 *
 */
Ext.define('qqext.cmp.Text', {
	alias: 'TextField',
	extend: 'Ext.form.field.Text',
	_before: 'inputEl',
	mixins: ['qqext.cmp.EditViewMode'],
	xtype: 'textfieldcmp'
});



