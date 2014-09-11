/**
 *  Компонент Number, позволяющий вводить числовые данные и может находится как
 *  в режиме редактирования, так и в режиме просмотра.
 *
 */
Ext.define('qqext.cmp.Number', {
	extend: 'Ext.form.field.Number',
	mixins: ['qqext.cmp.EditViewMode'],
	xtype: 'numberfieldcmp',
	alias: 'NumberField'
});

