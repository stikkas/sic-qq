/**
 * Панелька "Выдача документа" формы "Исполнение запроса"
 */

Ext.define('qqext.view.exec.VDeliveryOfDocuments', {
	alias: 'VDeliveryOfDocuments',
//	extend: 'qqext.view.StyledPanel',
	extend: 'Ext.container.Container',
	requires: [
		'qqext.factory.HandlerButton',
		'qqext.model.DeliveryAction',
		'qqext.model.UsedMaterial',
		'qqext.cmp.Container',
		'qqext.cmp.FieldSet',
		'hawk_common.cmp.DateField',
		'qqext.cmp.Text',
		'qqext.factory.PanelGrid',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Number'
	],
	title: 'Выдача документов',
	loadRecord: function() {
//		this._docs.loadRecord();
//		this._mats.getStore().sync();
	},
	updateRecord: function() {
//		this._docs.updateRecord();
//		this._mats.getStore().sync();
	},
//	initComponent: function() {
//		var me = this,
//				createCmp = Ext.create,
//				ns = qqext,
////				mat = ns.usedMaterial,
//				delAction = ns.delAction;
	/*
	 usedMaterialGrid = me._mats = createCmp('Ext.grid.Panel', {
	 store: createCmp('Ext.data.Store', {
	 model: 'qqext.model.UsedMaterial',
	 proxy: {
	 url: '/qq-web/rest/usedmaterial'
	 }
	 }),
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
	 */

	/*
	 Ext.applyIf(me, {
	 items: [me._docs = createCmp('DeliveryContainer'),
	 createCmp('FieldSet', {
	 title: 'Используемые материалы',
	 items: [usedMaterialGrid],
	 collapsible: true
	 })
	 ]
	 });
	 */
//		me.callParent();
//	},
	createPanel: function() {
		var createCmp = Ext.create,
				ns = qqext,
				delAction = ns.delAction,
				deliveryEditor = createCmp('Ext.form.field.ComboBox', {
					store: delAction.type[0],
					displayField: 'name',
					valueField: 'id',
					editable: false
				});
		this.items.add(createCmp('FPanelGrid', qqext.request.deliveryactions(),
				'DeliveryActionModel',
				{defaults: {
						sortable: false,
						menuDisabled: true
					}, items: [
						{
							text: delAction.type[1],
							dataIndex: delAction.type[0],
							flex: 1,
							editor: deliveryEditor,
							renderer: function(value) {
								return value ? deliveryEditor.getRawValue() : '';
							}
						},
						{
							text: delAction.count[1],
							dataIndex: delAction.count[0],
							editor: {xtype: 'numberfield', minValue: 1}
						}
					]
				}));
	}
});
