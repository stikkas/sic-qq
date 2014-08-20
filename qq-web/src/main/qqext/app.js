Ext.Loader.setConfig({
	enabled: true,
	paths: {qqext: 'qqext'}
});
/**
 * Стандартная точка входя для ExtJS приложения.
 * @param {Object} различные установки для приложения
 */
Ext.application({
	name: 'qqext',
	appFolder: 'qqext',
	autoCreateViewport: false,
	requires: [
		'Ext.layout.container.Card',
		'qqext.view.search.VSearchParams',
		'qqext.Menu',
		'qqext.view.VTitleBar',
		'qqext.view.VLeftMenu',
		'qqext.view.search.VSearchForm',
		'qqext.view.search.FioFieldContainer',
		'qqext.view.search.VSearchResult',
		'hawk_common.cmp.DateField',
		'qqext.store.DictValuesStore',
		'qqext.store.CustomStore',
		'qqext.view.Viewport',
		'qqext.view.search.VSearchForm',
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
	controllers: ['qqext.controller.Main'],
	launch: function() {
		Ext.create('qqext.view.Viewport', {});
	}
});
