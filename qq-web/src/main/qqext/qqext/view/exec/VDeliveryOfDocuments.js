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
			errors.push("<p>Выдача документов: Должен быть указан хоть один документ<br/></p>");
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
	save: function () {
		this._df.save();
		this._uf.save();
	},
	/**
	 * Загружает данные в форму
	 */
	loadRecord: function () {
		this._df.store.load();
		this._uf.store.load();
	},
	/**
	 * Устанавливает хранилища для своих таблиц. Хранилища берутся
	 * из ассоциаций текущего запроса.
	 */
	setStorage: function () {
		var id = qqext.creq.e.get('id');
		this._df.changeUrl(id);
		this._uf.changeUrl(id);
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				ns = qqext;
		Ext.applyIf(me, {
			items: [me._df = createCmp('FPanelGrid', 'qqext.model.DeliveryAction', 'rest/delaction/', {
					defaults: {
						sortable: false,
						menuDisabled: true
					},
					items: [
						createCmp('ComboColumn', 'Тип документов', 'docType',
								ns.stIds.doctype, 1),
						{
							text: 'Количество документов',
							dataIndex: 'docCount',
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
						me._uf = createCmp('FPanelGrid', 'qqext.model.UsedMaterial', 'rest/usedmaterial/', {
							defaults: {
								sortable: false,
								menuDisabled: true,
								flex: 1
							}, items: [
								{
									text: '№ фонда',
									dataIndex: 'fondNum',
									editor: {xtype: 'textfield'}
								},
								{
									text: '№ описи',
									dataIndex: 'opisNum',
									editor: {xtype: 'textfield'}
								},
								{
									text: '№ ед. хранения',
									dataIndex: 'storeUnitNum',
									editor: {xtype: 'textfield'}
								},
								{
									text: '№ листов',
									dataIndex: 'seriesNum',
									editor: {xtype: 'textfield'}
								},
								{
									text: 'примечание',
									dataIndex: 'remark',
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
