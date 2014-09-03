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
		/*		'hawk_common.fix.FixedTextField',
		 'hawk_common.fix.FixedField',
		 'hawk_common.fix.FixedFormPanel',
		 'hawk_common.fix.FixedNumberField',
		 'hawk_common.fix.FixedFieldContainer',
		 'hawk_common.fix.FixedBaseField',
		 'hawk_common.fix.FixedFieldSet',
		 'hawk_common.fix.FixedDateField',*/
		'qqext.cmp.Text',
		'qqext.cmp.Date',
		'qqext.cmp.Number',
		'qqext.cmp.ComboBox',
		'qqext.cmp.Checkbox',
		'qqext.cmp.FieldSet',
		'qqext.cmp.Panel',
		'qqext.cmp.FieldContainer',
		'qqext.cmp.TextArea',
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
				}),
				/*
				 modeswitch = Ext.create('hawk_common.cmp.ModeSwitch', {
				 editMode: true,
				 component: cb
				 });
				 */
				extbox = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: "Ext ComboBox",
					store: store,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'value'
				}),
				mybox = Ext.create('qqext.cmp.ComboBox', {
					fieldLabel: "My ComboBox",
					store: store,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'value'
				}),
				forextbtn = Ext.create('Ext.button.Button', {
					text: "Switch Mode",
					handler: function(btn) {
						btn.mode = !btn.mode;
						Ext.ComponentQuery.query('#MainPanel')[0].setViewOnly(btn.mode);
					}
				}),
				formybtn = Ext.create('Ext.button.Button', {
					text: "switchMy",
					handler: function() {
					}
				}),
				txtfield = Ext.create('qqext.cmp.Text', {
					fieldLabel: "Text Field"
				}),
				dtfield = Ext.create('qqext.cmp.Date', {
					fieldLabel: "Date Field"
				}),
				cmbbox = Ext.create('qqext.cmp.ComboBox', {
					fieldLabel: "Combo Field",
					store: store,
					queryMode: 'local',
					displayField: 'name',
					valueField: 'value'
				}),
				number = Ext.create('qqext.cmp.Number', {
					fieldLabel: "Number Field",
					value: 5,
					minValue: 0,
					maxValue: 10
				}),
				checkbx = Ext.create('qqext.cmp.Checkbox', {
					boxLabel: 'Check Box'
				}),
				tarea = Ext.create('qqext.cmp.TextArea', {
					fieldLabel: "Text Area"
				});
		Ext.create('qqext.cmp.Panel', {
			title: 'Examples',
			layout: 'vbox',
			id: 'MainPanel',
			style: {
				marginLeft: 'auto',
				marginRight: 'auto',
				marginTop: '20px'
			},
			width: 600,
			height: 400,
			bodyPadding: 10,
			renderTo: Ext.getBody(),
			items: [txtfield, dtfield, cmbbox, number, checkbx, tarea],
			buttons: [forextbtn]
		});
//		Ext.create('hawk_common.cmp.PLoginForm', {
//			width: 400,
//			height: 200,
//			buttonAlign: 'right',
//			renderTo: Ext.getBody()
//		});
//		Ext.create('hawk_common.cmp.SysChaptersBar', {
//			width: 200,
//			selectedCls: 'selectedChapter',
//			selectedItemId: 0,
//			items: [{
//					xtype: 'button',
//					text: 'Документы',
//					action: 'getDocs',
//					id: 'docsBtn'
//				}, {
//					xtype: 'button',
//					text: 'Печать отчетов',
//					action: 'getPrint',
//					id: 'printBtn'
//				}],
//			cls: 'regimes pad_l_10',
//			height: 34,
//		});
//		var form = Ext.create('hawk_common.cmp.Form', {
//			items: [
//				{
//					xtype: 'textfield',
//					allowBlank: false,
//					minLength: 4,
//					fieldLabel: "Text Field"
//				},
//				{
//					xtype: 'datefield',
//					allowBlank: false,
//					fieldLabel: "Date Field"
//				}
//			],
//			width: 500,
//			buttons: [
//				{
//					xtype: 'button',
//					handler: function() {
//						form.validate();
//					},
//					text: 'Validate'
//				}
//			],
//			renderTo: Ext.getBody()
//		});
	}
});
