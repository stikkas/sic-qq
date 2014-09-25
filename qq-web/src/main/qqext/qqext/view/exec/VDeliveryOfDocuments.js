/**
 * Панелька "Выдача документа" формы "Исполнение запроса"
 */

Ext.define('qqext.view.exec.VDeliveryOfDocuments', {
	alias: 'VDeliveryOfDocuments',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.model.DeliveryAction',
		'qqext.model.UsedMaterial',
		'qqext.factory.PanelGrid',
		'qqext.cmp.FieldSet',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Text',
		'Ext.form.field.Number'
	],
	title: 'Выдача документов',
	/**
	 * @property {qqext.factory.PanelGrid} _df Таблица для выданных документов
	 * @private
	 */
	/**
	 * @property {qqext.factory.PanelGrid} _uf Таблица для используемых материалов
	 * @private
	 */

	/**
	 * Обновляет данные на сервере
	 */
	sync: function() {
		[this._df.getStore(), this._uf.getStore()].forEach(function(v) {
			v.sync({callback: function() {
					v.load()
				}});
		});
	},
	/**
	 * Загружает данные в форму
	 */
	loadRecord: function() {
		this._df.getStore().load();
		this._uf.getStore().load();
	},
	/**
	 * Устанавливает хранилища для своих таблиц. Хранилища берутся
	 * из ассоциаций текущего запроса.
	 */
	setStorage: function() {
		var request = qqext.request;
		this._df.reconfigure(request.deliveryactions());
		this._uf.reconfigure(request.usedmaterials());
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				ns = qqext,
				mat = ns.usedMaterial,
				delAction = ns.delAction,
				storeId = delAction.type[0];

		Ext.applyIf(me, {
			items: [me._df = createCmp('FPanelGrid', 'DeliveryActionModel', {
					defaults: {
						sortable: false,
						menuDisabled: true
					}, items: [
						{
							text: delAction.type[1],
							dataIndex: delAction.type[0],
							flex: 1,
							editor: {
								xtype: 'combobox',
								store: storeId,
								displayField: 'name',
								valueField: 'id',
								editable: false
							},
							renderer: function(value) {
								var v = Ext.getStore(storeId).getById(value);
								if (v)
									return v.get('name');
								return value;
							}
						},
						{
							text: delAction.count[1],
							dataIndex: delAction.count[0],
							editor: {xtype: 'numberfield', minValue: 1}
						}
					]
				}),
				createCmp('FieldSet', {
					title: 'Используемые материалы',
					collapsible: true,
					collapsed: true,
					items: [
						me._uf = createCmp('FPanelGrid', 'UsedMaterialModel', {
							defaults: {
								sortable: false,
								menuDisabled: true,
								flex: 1
							}, items: [
								{
									text: mat.fond[1],
									dataIndex: mat.fond[0],
									editor: {xtype: 'textfield'}
								},
								{
									text: mat.opis[1],
									dataIndex: mat.opis[0],
									editor: {xtype: 'textfield'}
								},
								{
									text: mat.storage[1],
									dataIndex: mat.storage[0],
									editor: {xtype: 'textfield'}
								},
								{
									text: mat.pages[1],
									dataIndex: mat.pages[0],
									editor: {xtype: 'textfield'}
								},
								{
									text: mat.remark[1],
									dataIndex: mat.remark[0],
									editor: {xtype: 'textfield'},
									flex: 2
								}
							]
						})
					]
				})
			]});
		me.callParent();
	}
});
