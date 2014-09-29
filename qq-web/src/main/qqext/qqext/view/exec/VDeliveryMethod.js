/**
 * Панель формы "Способ отправки"
 */
Ext.define('qqext.view.exec.VDeliveryMethod', {
	alias: 'VDeliveryMethod',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'Ext.form.field.ComboBox',
		'qqext.model.SendAction',
		'qqext.factory.TextArea',
		'qqext.factory.TextField',
		'qqext.factory.DateField',
		'qqext.factory.PanelGrid',
		'qqext.factory.AttachedFiles',
		'Ext.Component',
		'Ext.Date',
		'qqext.cmp.FieldSet',
		'hawk_common.cmp.FileList',
		'hawk_common.cmp.DateField'
	],
	title: 'Способ отправки',
	/**
	 * Проверяет правильность заполнения формы
	 * @returns {Boolean} если ошибок нет то true
	 */
	isValid: function () {
		var result = true;
		if (!this.callParent())
			result = false;
		if (!this._sf.isValid())
			result = false;
		return result;
	},
	/**
	 * Обновляет данные на сервере
	 */
	sync: function () {
		var store = this._sf.getStore();
		store.sync({callback: function () {
				store.load();
			}});
	},
	save: function (id, success, fail) {
		this.sync();
		this._ff.save(id, success, fail);
	},
	remove: function () {
		this._ff.remove();
		this._ff.reset();
	},
	/**
	 * Загружает данные в форму
	 * @param {Ext.data.Store} files хранилище для файлов
	 * @param {Ext.data.Model} model модель для остальных полей формы
	 */
	loadRecord: function (files, model) {
		this._sf.getStore().load();
		this.callParent([model]);
		this._ff.loadRecord(files);
	},
	/**
	 * Устанавливает хранилища для своих таблиц. Хранилища берутся
	 * из ассоциаций текущего запроса.
	 */
	setStorage: function () {
		this._sf.reconfigure(qqext.request.getExec().sendactions());
	},
	initComponent: function () {
		var me = this,
				ns = qqext,
				createCmp = Ext.create,
				way = ns.wayToSend,
				action = ns.sendAction,
				storeId = 'answerForm';

		Ext.apply(me, {
			items: [
				me._sf = createCmp('FPanelGrid', 'SendActionModel', {
					defaults: {
						sortable: false,
						menuDisabled: true
					}, items: [
						{
							text: action.type[1],
							dataIndex: action.type[0],
							flex: 1,
							editor: {
								xtype: 'combobox',
								store: storeId,
								displayField: 'name',
								valueField: 'id',
								editable: false
							},
							renderer: function (value) {
								var v = Ext.getStore(storeId).getById(value);
								if (v)
									return v.get('name');
								return value;
							}
						},
						{
							text: action.date[1],
							dataIndex: action.date[0],
							editor: {xtype: 'hawkDateField'},
							renderer: function (value) {
								return Ext.Date.format(value, 'd.m.Y');
							}
						}
					]
				}),
				createCmp('Ext.Component', {autoEl: 'hr'}),
				createCmp('FDateField', way.notice[1], way.notice[0]),
				createCmp('FTextField', way.number[1], way.number[0]),
				createCmp('FTextArea', way.remark[1], way.remark[0], {
					width: 600,
					labelWidth: 100
				}),
				createCmp('FieldSet', {
					title: 'Ответ',
					collapsible: true,
					collapsed: true,
					items: [me._ff = createCmp('AttachedFiles', '',
								'Q_VALUE_FILE_TYPE_ANSWER', ns.atpaths.fsend,
								ns.atpaths.usend)]
				})
			]
		});

		me.callParent();
	}
});
