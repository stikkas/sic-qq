/**
 * Контейнер для полей с возможностью переключения режима редактирования для
 * своих компонентов.
 */
Ext.define('qqext.cmp.FieldContainer', {
	alias: 'FieldContainer',
	extend: 'Ext.form.FieldContainer',
	mixins: ['qqext.cmp.PanelEditViewMode'],
	xtype: 'fieldcontainercmp'
});
