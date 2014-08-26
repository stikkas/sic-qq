/*
 * Использутеся для тестирования различных виджетов. comp.html
 */
Ext.Loader.setConfig({
	enabled: true,
	paths: {qqext: 'qqext', hawk_common: 'packages/hawk_common/src'}
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
		'Ext.data.proxy.LocalStorage',
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
		'Ext.layout.container.Border',
		'hawk_common.model.User',
		'hawk_common.store.UserLocalStorage'
	],
	controllers: ['qqext.controller.Main'],
	launch: function() {
		Ext.define('Gender', {
			extend: 'Ext.data.Model',
			fields: ['value', 'name']
		});
		var data = {
			genders: [
				{
					value: 1,
					name: 'Female'
				},
				{
					value: 2,
					name: 'Male'
				},
				{
					value: 3,
					name: 'Unknown'
				}
			]
		};
		var store = Ext.create('Ext.data.Store', {
			autoLoad: true,
			model: 'Gender',
			data: data,
			proxy: {
				type: 'memory',
				reader: {
					type: 'json',
					root: 'genders'
				}
			}
		});
		var cb = Ext.create(
				'hawk_common.cmp.ComboWithEmpty', {
					emptyItemText: 'All mans',
					displayField: 'name',
					valueField: 'value',
					store: store
				});
		/*
		 modeswitch = Ext.create('hawk_common.cmp.ModeSwitch', {
		 editMode: true,
		 component: cb
		 });
		 */

		Ext.create('Ext.panel.Panel', {
			title: 'Examples',
			layout: 'vbox',
			style: {
				marginLeft: 'auto',
				marginRight: 'auto',
				marginTop: '20px'
			},
			width: 600,
			height: 400,
			bodyPadding: 10,
			items: [
				Ext.create('hawk_common.cmp.FilesList', {
					editMode: true,
					sectionName: 'Документы заявителя',
					namePrefix: 'applicant_doc',
					html: '<hr style="width:calc(97% - 160px);"></hr>',
					cls: 'subsect',
					margin: '3px 10px 10px 10px'
				})
			],
			renderTo: Ext.getBody()
		});
	}
});
