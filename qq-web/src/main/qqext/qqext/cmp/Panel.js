/**
 * Панель для формы с возможностью переключать все свои компоненты в режим просмотра.
 */
Ext.define('qqext.cmp.Panel', {
	extend: 'Ext.form.Panel',
	mixins: ['qqext.cmp.PanelEditViewMode'],
	xtype: 'formcmp'
});

