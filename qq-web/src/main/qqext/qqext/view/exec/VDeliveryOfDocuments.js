/**
 * Панелька "Выдача документа" формы "Исполнение запроса"
 */

Ext.define('qqext.view.exec.VDeliveryOfDocuments', {
	alias: 'VDeliveryOfDocuments',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.view.exec.cmp.DeliveryTypeCount',
		'qqext.view.exec.cmp.DeliveryContainer',
		'qqext.factory.HandlerButton',
		'qqext.model.DeliveryAction',
		'qqext.model.UsedMaterial',
		'Ext.grid.Panel',
		'Ext.grid.plugin.CellEditing',
		'qqext.cmp.Container',
		'qqext.cmp.FieldSet',
		'hawk_common.cmp.DateField',
		'qqext.cmp.Text'
	],
	title: 'Выдача документов',
	// height:'auto',
	minHeight: 60,
	loadRecord: function() {
		this._docs.loadRecord();
		this._mats.getStore().sync();
	},
	updateRecord: function() {
		this._docs.updateRecord();
		this._mats.getStore().sync();
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				mat = qqext.usedMaterial,
				usedMaterialGrid = me._mats = createCmp('Ext.grid.Panel', {
					minHeight: 120,
					plugins: [
						createCmp('Ext.grid.plugin.CellEditing', {
							clicksToEdit: 1
						})
					],
					store: createCmp('Ext.data.Store', {
						model: 'qqext.model.UsedMaterial',
						proxy: {
							type: 'rest',
							writer: 'json',
							reader: 'json',
							url: '/qq-web/rest/usedmaterial'
						}
					}),
					// forceFit : true,
					dockedItems: [
						createCmp('Container', {
							layout: 'hbox',
							items: [
								createCmp('FHandlerButton', 'Добавить', function() {
									usedMaterialGrid.getStore().add(createCmp('UsedMaterialModel'));
								}),
								createCmp('FHandlerButton', 'Удалить', function() {
									var sm = usedMaterialGrid.getSelectionModel();
									if (sm.hasSelection()) {
										var store = usedMaterialGrid.getStore(),
												selectedUsedMaterial = sm.getSelection()[0],
												selectedIndex = store.indexOf(selectedUsedMaterial);
										store.remove(selectedUsedMaterial);

										if (selectedIndex > 0)
											sm.select(--selectedIndex);
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


		Ext.applyIf(me, {
			items: [me._docs = createCmp('DeliveryContainer'),
				createCmp('FieldSet', {
					title: 'Используемые материалы',
					items: [usedMaterialGrid],
					collapsible: true
				})
			]
		});
		me.callParent();
	}
});
