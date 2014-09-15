/**
 * Панелька "Выдача документа" формы "Исполнение запроса"
 */

Ext.define('qqext.view.exec.VDeliveryOfDocuments', {
	alias: 'VDeliveryOfDocuments',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.view.exec.cmp.DeliveryTypeCount',
		'qqext.factory.HandlerButton',
		'qqext.model.qq.DeliveryAction',
		'qqext.model.qq.UsedMaterial',
		'Ext.grid.Panel',
		'Ext.grid.plugin.CellEditing',
		'qqext.cmp.FieldContainer',
		'qqext.cmp.FieldSet',
		'hawk_common.cmp.DateField',
		'qqext.cmp.Text'
	],
	title: 'Выдача документов',
	// height:'auto',
	minHeight: 60,
	mOdel: null,
	grid: null,
	loadRecord: function(model) {
		var me = this,
				actions = model.delActions(),
				max = actions.getCount();
		me.mOdel = model;
		me.grid.reconfigure(model.usedMaterials());
		for (var i = 0; i < max; ++i) {
			var t = Ext.create('qqext.view.exec.cmp.DeliveryTypeCount');
			t.loadRecord(actions.getAt(i));
			me.insert(me.items.length - 1, t);
		}
	},
	updateRecord: function(model) {
		for (var i = 0; i < model.delActions().getCount(); i++) {
			this.items.getAt(i + 1).updateRecord(model.delActions().getAt(i));
		}
	},
	remove: function() {
		var me = this;
		var index = me.items.indexOf(arguments[0]);
		var delDeliveryAction = me.mOdel.delActions().getAt(index - 1);
		me.mOdel.delActions().remove(delDeliveryAction);
		me.callParent(arguments);
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				mat = qqext.usedMaterial;
		var addButton = createCmp('FHandlerButton', 'add',
				function() {
					var old = me.getHeight();
					var addComp = createCmp('qqext.view.exec.cmp.DeliveryTypeCount');
					this.ownerCt.insert(this.ownerCt.items.length - 1, addComp);
					var tm = createCmp('DeliveryActionModel');
					me.mOdel.delActions().add(tm);
				}
		);

		var usedMaterialGrid = createCmp('Ext.grid.Panel', {
			minHeight: 120,
			plugins: [
				createCmp('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})
			],
			// forceFit : true,
			dockedItems: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						createCmp('FHandlerButton', 'add', function() {
							usedMaterialGrid.getStore().add(createCmp('UsedMaterialModel'));
						}),
						createCmp('FHandlerButton', 'del', function() {
							var sm = usedMaterialGrid
									.getSelectionModel();
							if (sm.hasSelection()) {
								var selectedUsedMaterial = sm
										.getSelection()[0];
								var selectedIndex = usedMaterialGrid
										.getStore()
										.indexOf(selectedUsedMaterial);
								usedMaterialGrid
										.getStore()
										.remove(selectedUsedMaterial);

								if (selectedIndex > 0) {
									selectedIndex--;
								}
								sm.select(selectedIndex);
							}
						})
					]
				})],
			columns: [
				{
					text: mat.fond[1],
					dataIndex: mat.fond[0],
					editor: {xtype: 'textfieldcmp'}
				},
				{
					text: mat.opis[1],
					dataIndex: mat.opis[0],
					editor: {xtype: 'textfieldcmp'}
				},
				{
					text: mat.storage[1],
					dataIndex: mat.storage[0],
					editor: {xtype: 'textfieldcmp'}
				},
				{
					text: mat.pages[1],
					dataIndex: mat.pages[0],
					editor: {xtype: 'textfieldcmp'}
				},
				{
					text: mat.remark[1],
					dataIndex: mat.remark[0],
					editor: {xtype: 'textfieldcmp'}
				}

			]
		});

		me.grid = usedMaterialGrid;
		var fieldSet = createCmp('FieldSet', {
			title: 'Используемые материалы',
			items: [usedMaterialGrid],
			collapsible: true
		});

		Ext.applyIf(me, {
			items: [addButton, fieldSet]
		});
		me.callParent();
	}
});
