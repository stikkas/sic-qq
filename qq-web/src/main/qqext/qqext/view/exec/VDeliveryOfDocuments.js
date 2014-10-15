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
		'qqext.factory.ComboColumn',
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
	 * Возвращает ошибки
	 */
	getErrors: function () {
		var me = this,
				error = me._df.getErrors() + me._uf.getErrors();
		if (me._errors.length)
			error += "<p>" + me._errors.join('') + "</p>";
		return error;


	},
	/**
	 * Проверяет правильность заполнения формы
	 * @returns {Boolean} если ошибок нет то true
	 */
	isValid: function () {
		var me = this,
				errors = me._errors = [],
				result = true;
		// проверяем все, только потом возвращаем результат
		if (me._df.getStore().count() === 0) {
			errors.push("Должен быть указан хоть один документ");
			result = false;
		}
		if (!me._df.isValid())
			result = false;
		if (!me._uf.isValid())
			result = false;

		return result;
	},
	/**
	 * Обновляет данные на сервере
	 */
	sync: function () {
		[this._df.getStore(), this._uf.getStore()].forEach(function (v) {
			v.sync({callback: function () {
					v.load();
				}});
		});
	},
	/**
	 * Загружает данные в форму
	 */
	loadRecord: function () {
		this._df.getStore().load();
		this._uf.getStore().load();
	},
	/**
	 * Устанавливает хранилища для своих таблиц. Хранилища берутся
	 * из ассоциаций текущего запроса.
	 */
	setStorage: function () {
		var model = qqext.request.getExec();
		this._df.reconfigure(model.deliveryactions());
		this._uf.reconfigure(model.usedmaterials());
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				ns = qqext,
				mat = ns.usedMaterial,
				delAction = ns.delAction;
		Ext.applyIf(me, {
			items: [me._df = createCmp('FPanelGrid', 'DeliveryActionModel', {
					defaults: {
						sortable: false,
						menuDisabled: true
					}, items: [
						createCmp('ComboColumn', delAction.type[1], delAction.type[0],
								delAction.type[0], 1),
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
					cls: 'collapse_section inner_section',
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
