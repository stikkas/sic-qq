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
		'qqext.factory.ComboColumn',
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
		if (!this._ff.isValid())
			result = false;
		return result;
	},
	/**
	 * Обновляет данные на сервере для таблицы
	 */
	sync: function () {
		var store = this._sf.getStore();
		store.sync({callback: function () {
				store.load();
			}});
	},
	/**
	 * Сохраняет данные из таблицы и прикрепленных файлов на сервер
	 * @param {Number/String} id идентификатор запроса
	 * @param {Function} success функция для вызова в случае удачного сохранения файлов
	 * @param {Function} fail функция для вызова в случае ошибки при сохранении файлов
	 */
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
				action = ns.sendAction;

		Ext.apply(me, {
			items: [
				me._sf = createCmp('FPanelGrid', 'SendActionModel', {
					defaults: {
						sortable: false,
						menuDisabled: true
					}, items: [
						createCmp('ComboColumn', action.type[1], action.type[0],
								ns.stIds.sendType, 1),
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
				me._in = createCmp('FTextField', way.number[1], way.number[0], {
					width: 270,
					labelWidth: 150
				}),
				me._rm = createCmp('FTextArea', way.remark[1], way.remark[0], {
					width: 800,
					labelWidth: 150
				}),
				me._ff = createCmp('FAttachedFiles', 'Ответ',
						'Q_VALUE_FILE_TYPE_ANSWER', ns.atpaths.fsend,
						ns.atpaths.usend, {
							allowBlank: ns.isSIC ? false : true,
							collapsible: true,
							collapsed: true,
							cls: 'collapse_section attached_section'
						})

						/*
						 createCmp('FieldSet', {
						 title: 'Ответ',
						 collapsible: true,
						 collapsed: true,
						 cls: 'collapse_section attached_section legend70',
						 items: [me._ff = createCmp('FAttachedFiles', '',
						 'Q_VALUE_FILE_TYPE_ANSWER', ns.atpaths.fsend,
						 ns.atpaths.usend, {
						 allowBlank: ns.isSIC ? false : true
						 })]
						 })
						 */
			]
		});

		me.callParent();
	},
	/**
	 * Устанвливаеть таблицу "Способ отправки" и поля "Исходящий №" и "Примечание"
	 * в режим редактирования при статусе запроса - исполнен.
	 */
	setEditMode: function () {
		var me = this;
		[me._sf, me._in, me._rm].forEach(function (it) {
			it.setViewOnly(false);
		});
	}
});
