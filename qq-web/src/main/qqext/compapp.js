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
//		Ext.define('Gender', {
//			extend: 'Ext.data.Model',
//			fields: ['value', 'name']
//		});
//		var data = {
//			genders: [
//				{
//					value: 1,
//					name: 'Female'
//				},
//				{
//					value: 2,
//					name: 'Male'
//				},
//				{
//					value: 3,
//					name: 'Unknown'
//				}
//			]
//		};
//		var store = Ext.create('Ext.data.Store', {
//			autoLoad: true,
//			model: 'Gender',
//			data: data,
//			proxy: {
//				type: 'memory',
//				reader: {
//					type: 'json',
//					root: 'genders'
//				}
//			}
//		});
//		var cb = Ext.create(
//				'hawk_common.cmp.ComboWithEmpty', {
//					emptyItemText: 'All mans',
//					displayField: 'name',
//					valueField: 'value',
//					store: store
//				}),
//				/*
//				 modeswitch = Ext.create('hawk_common.cmp.ModeSwitch', {
//				 editMode: true,
//				 component: cb
//				 });
//				 */
//				extbox = Ext.create('Ext.form.field.ComboBox', {
//					fieldLabel: "Ext ComboBox",
//					store: store,
//					queryMode: 'local',
//					displayField: 'name',
//					valueField: 'value'
//				}),
//				mybox = Ext.create('qqext.cmp.ComboBox', {
//					fieldLabel: "My ComboBox",
//					store: store,
//					queryMode: 'local',
//					displayField: 'name',
//					valueField: 'value'
//				}),
//				forextbtn = Ext.create('Ext.button.Button', {
//					text: "Switch Mode",
//					listeners: {
//						click: function(btn) {
//							btn.mode = !btn.mode;
//							Ext.ComponentQuery.query('#MainPanel')[0].setViewOnly(btn.mode);
//							console.log(this);
//						},
//						scope: Hello.hello
//					}
//				}),
//				formybtn = Ext.create('Ext.button.Button', {
//					text: "switchMy",
//					handler: function() {
//					}
//				}),
//				txtfield = Ext.create('qqext.cmp.Text', {
//					fieldLabel: "Text Field"
//				}),
//				dtfield = Ext.create('qqext.cmp.Date', {
//					fieldLabel: "Date Field"
//				}),
//				cmbbox = Ext.create('qqext.cmp.ComboBox', {
//					fieldLabel: "Combo Field",
//					store: store,
//					queryMode: 'local',
//					displayField: 'name',
//					valueField: 'value'
//				}),
//				number = Ext.create('qqext.cmp.Number', {
//					fieldLabel: "Number Field",
//					value: 5,
//					minValue: 0,
//					maxValue: 10
//				}),
//				checkbx = Ext.create('qqext.cmp.Checkbox', {
//					boxLabel: 'Check Box'
//				}),
//				tarea = Ext.create('qqext.cmp.TextArea', {
//					fieldLabel: "Text Area"
//				});
//		Ext.create('qqext.cmp.Panel', {
//			title: 'Examples',
//			layout: 'vbox',
//			id: 'MainPanel',
//			style: {
//				marginLeft: 'auto',
//				marginRight: 'auto',
//				marginTop: '20px'
//			},
//			width: 600,
//			height: 400,
//			bodyPadding: 10,
//			renderTo: Ext.getBody(),
//			items: [txtfield, dtfield, cmbbox, number, checkbx, tarea],
//			buttons: [forextbtn]
//		});
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
		Ext.require('Ext.data.proxy.Rest');
		Ext.define('Request', {
			extend: 'Ext.data.Model',
			proxy: {
				type: 'rest',
				url: '/webresources/test',
				format: 'json',
				reader: {
					type: 'json',
					root: 'data'
				},
				writer: {
					type: 'json'
				}
			},
			fields: [
				'FirstName',
				'LastName',
				'EmailAddress',
				'TelNumberCode',
				'TelNumber',
				'RequestDetails',
				'RequestType'
			]
		});
		var requestData = {
			FirstName: 'Joe',
			LastName: 'Bloggs',
			EmailAddress: 'info@swarmonline.com',
			TelNumberCode: '0777',
			TelNumber: '7777777',
			RequestDetails: 'This is some Request Detail body text',
			RequestType: {
				type1: true,
				type2: false,
				type3: false,
				type4: true,
				type5: true,
				type6: false
			}
		};

		var requestModel = Ext.create('Request');
		var formPanel = Ext.create('Ext.form.Panel', {
			title: 'Support Ticket Request',
			id: 'formPanel',
			width: 650,
			height: 550,
			renderTo: Ext.getBody(),
			style: 'margin: 50px',
			items: [{
					xtype: 'container',
					layout: 'hbox',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'First Name',
							name: 'FirstName',
							labelAlign: 'top',
							cls: 'field-margin',
							flex: 1
						}, {
							xtype: 'textfield',
							fieldLabel: 'Last Name',
							name: 'LastName',
							labelAlign: 'top',
							cls: 'field-margin',
							flex: 1
						}]},
				{
					xtype: 'container',
					layout: 'column',
					items: [{
							xtype: 'textfield',
							fieldLabel: 'Email Address',
							name: 'EmailAddress',
							labelAlign: 'top',
							cls: 'field-margin',
							columnWidth: 0.6
						}, {
							xtype: 'fieldcontainer',
							layout: 'hbox',
							fieldLabel: 'Tel. Number',
							labelAlign: 'top',
							cls: 'field-margin',
							columnWidth: 0.4,
							items: [{
									xtype: 'textfield',
									name: 'TelNumberCode',
									style: 'margin-right: 5px;',
									flex: 2
								}, {
									xtype: 'textfield',
									name: 'TelNumber',
									flex: 4
								}]
						}]
				},
				{
					xtype: 'container',
					layout: 'hbox',
					items: [{
							xtype: 'textarea',
							fieldLabel: 'Request Details',
							name: 'RequestDetails',
							labelAlign: 'top',
							cls: 'field-margin',
							height: 250,
							flex: 2
						}, {
							xtype: 'checkboxgroup',
							name: 'RequestType',
							fieldLabel: 'Request Type',
							labelAlign: 'top',
							columns: 1,
							cls: 'field-margin',
							vertical: true,
							items: [{
									boxLabel: 'Type 1',
									name: 'type1',
									inputValue: '1'
								}, {
									boxLabel: 'Type 2',
									name: 'type2',
									inputValue: '2'
								}, {
									boxLabel: 'Type 3',
									name: 'type3',
									inputValue: '3'
								}, {
									boxLabel: 'Type 4',
									name: 'type4',
									inputValue: '4'
								}, {
									boxLabel: 'Type 5',
									name: 'type5',
									inputValue: '5'
								}, {
									boxLabel: 'Type 6',
									name: 'type6',
									inputValue: '6'
								}],
							flex: 1
						}]

				},
				{
					xtype: 'filefield',
					cls: 'field-margin',
					fieldLabel: 'Attachment',
					width: 300
				}
			]

		});
		formPanel.getForm().loadRecord(requestModel);
	}
});
