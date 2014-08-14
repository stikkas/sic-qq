/**
 * Стандартная точка входя для ExtJS приложения.
 * @param {Object} различные установки для приложения
 */
Ext.application({
	name: 'qqext',
	appFolder: 'qqext',
	autoCreateViewport: false,
	requires: [
		'qqext.Utils',
		'hawk_common.cmp.DateField',
		'qqext.view.search.FioFieldContainer',
		'qqext.view.search.VSearchResult',
		'qqext.store.DictValuesStore',
		'qqext.store.CustomStore',
		'qqext.view.Viewport',
		'qqext.view.search.VSearchForm',
		'qqext.view.search.VSearchParams',
		'hawk_common.fix.FixedTextField',
		'hawk_common.fix.FixedField',
		'hawk_common.fix.FixedFormPanel',
		'hawk_common.fix.FixedNumberField',
		'hawk_common.fix.FixedFieldContainer',
		'hawk_common.fix.FixedBaseField',
		'hawk_common.fix.FixedFieldSet',
		'hawk_common.fix.FixedDateField',
		'Ext.form.Label',
		'Ext.form.field.ComboBox',
		'Ext.layout.container.Border'
	],
	controllers: [
		'qqext.controller.Main', 'qqext.controller.LeftMenu', 'qqext.controller.TitleMenu'
	],
	launch: function() {
		Ext.create('qqext.view.Viewport', {});
	}
});
