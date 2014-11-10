/**
 * Исправляем косяк Sencha, когда после раскрытия collapsed FieldSet
 * DatePicker не показывается
 */
Ext.define('over.DatePicker', {
	override: 'Ext.picker.Date',
	collapseImmune: true
});
