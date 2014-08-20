/**
 * Панелька "Выдача документа" формы "Исполнение запроса"
 */

Ext.define('qqext.view.exec.VDeliveryOfDocuments', {
	extend: 'Ext.form.Panel',
	requires: [
		'qqext.view.exec.cmp.DeliveryTypeCount',
		'Ext.button.Button',
		'qqext.model.qq.DeliveryAction',
		'Ext.grid.Panel',
		'Ext.grid.plugin.CellEditing',
		'Ext.form.FieldContainer',
		'qqext.model.qq.DeliveryAction',
		'Ext.form.FieldSet'
	],
	title: 'Выдача документов',
	// height:'auto',
	minHeight: 60,
	margin: '10 10 0 0',
	mOdel: null,
	grid: null,
	loadRecord: function(model) {
		this.mOdel = model;
		this.grid.reconfigure(this.mOdel.usedMaterials());
		for (var i = 0; i < this.mOdel.delActions().getCount(); i++) {
			var t = Ext.create('qqext.view.exec.cmp.DeliveryTypeCount');
			t.loadRecord(this.mOdel.delActions().getAt(i));
			this.insert(this.items.length - 1, t);
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
		var me = this;
		var addButton = Ext.create('Ext.button.Button', {
			text: 'add',
			handler: function() {
				var old = me.getHeight();
				var addComp = Ext
						.create('qqext.view.exec.cmp.DeliveryTypeCount');
				this.ownerCt.insert(this.ownerCt.items.length - 1,
						addComp);
				var tm = Ext.create('qqext.model.qq.DeliveryAction');
				me.mOdel.delActions().add(tm);
			}
		});

		var usedMaterialGrid = Ext.create('Ext.grid.Panel', {
			minHeight: 120,
			plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
					clicksToEdit: 1
				})],
			// forceFit : true,
			dockedItems: [Ext.create('Ext.form.FieldContainer', {
					layout: {
						type: 'hbox'
					},
					items: [{
							xtype: 'button',
							text: 'add',
							handler: function() {
								var um = Ext.create('qqext.model.qq.UsedMaterial');
								usedMaterialGrid.getStore().add(um);
							}
						}, {
							xtype: 'button',
							text: 'del',
							handler: function() {
								var sm = usedMaterialGrid
										.getSelectionModel();
								if (sm.hasSelection()) {
									var selectedUsedMaterial = sm
											.getSelection()[0];
									var selectedIndex = usedMaterialGrid
											.getStore()
											.indexOf(selectedUsedMaterial);
									console.log('selected index: '
											+ selectedIndex);

									usedMaterialGrid
											.getStore()
											.remove(selectedUsedMaterial);

									if (selectedIndex > 0) {
										selectedIndex--;
									}
									sm.select(selectedIndex);
								}
							}
						}]
				})],
			columns: [{
					text: '№ фонда',
					dataIndex: 'fundNum',
					editor: {
						xtype: 'textfield'
					}
				}, {
					text: '№ описи',
					dataIndex: 'seriesNum',
					editor: {
						xtype: 'textfield'
					}
				}, {
					text: '№ ед. хранения',
					dataIndex: 'storageUnitNum',
					editor: {
						xtype: 'textfield'
					}
				}, {
					text: '№ листов',
					dataIndex: 'listNum',
					editor: {
						xtype: 'textfield'
					}
				}]
		});

		me.grid = usedMaterialGrid;
		var fieldSet = Ext.create('Ext.form.FieldSet', {
			title: 'Используемые материалы',
			items: [usedMaterialGrid],
			collapsible: true
		});

		Ext.applyIf(me, {
			items: [addButton, fieldSet]
		});
		me.callParent(arguments);
	}
});