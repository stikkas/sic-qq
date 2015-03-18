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
	 * Проверяет правильность заполнения формы.
	 * Необходимо проверить на наличие всех ошибок.
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
	 * Сохраняет данные из таблицы  на сервер
	 */
	save: function () {
		this._sf.save();
	},
	remove: function () {
		this._ff.reset();
	},
	/**
	 * Загружает данные в форму
	 * @param {qqext.model.Execution} model модель для полей формы
	 */
	loadRecord: function (model) {
		this._sf.store.load();
		this.callParent([model]);
		this._ff.loadRecord(model.files);
	},
	/**
	 * Устанавливает хранилища для своих таблиц.
	 */
	setStorage: function () {
		this._sf.changeUrl(qqext.creq.e.get('id'));
	},
	initComponent: function () {
		var me = this,
				ns = qqext,
				createCmp = Ext.create;
		Ext.apply(me, {
			items: [
				me._sf = createCmp('FPanelGrid', 'qqext.model.SendAction', 'rest/sendaction/', {
					defaults: {
						sortable: false,
						menuDisabled: true
					}, items: [
						createCmp('ComboColumn', 'Способ отправки', 'sendType',
								ns.stIds.sendType, 1),
						{
							text: 'Дата',
							dataIndex: 'sendDate',
							editor: {xtype: 'hawkDateField'},
							renderer: function (value) {
								return Ext.Date.format(value, 'd.m.Y');
							}
						}
					]
				}),
				createCmp('Ext.Component', {autoEl: 'hr'}),
				me._in = createCmp('FTextField', 'Исходящий №', 'issueNum', {
					width: 270,
					labelWidth: 150
				}),
				me._rm = createCmp('FTextArea', 'Примечание', 'remark', {
					width: 800,
					labelWidth: 150
				}),
				me._ff = createCmp('FAttachedFiles', 'Ответ',
						'Q_VALUE_FILE_TYPE_ANSWER', 'rest/files', {
							allowBlank: ns.isSIC ? false : true,
							collapsible: true,
							collapsed: true,
							cls: 'collapse_section attached_section'
						})
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
