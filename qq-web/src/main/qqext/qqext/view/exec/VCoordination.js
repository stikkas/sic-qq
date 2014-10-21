/**
 * Панель "Согласование документа"
 */
Ext.define('qqext.view.exec.VCoordination', {
	alias: 'VCoordination',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.PanelGrid',
		'qqext.factory.ComboColumn',
		'qqext.model.Coordination',
		'Ext.form.field.ComboBox',
		'Ext.form.field.Date',
		'qqext.cmp.FieldSet',
		'Ext.Date',
		'hawk_common.cmp.DateField'
	],
	/**
	 * @property {qqext.factory.PanelGrid} _cf Таблица для согласования документа
	 * @private
	 */
	/**
	 * Возвращает ошибки
	 */
	getErrors: function() {
		return this._cf.getErrors();
	},
	/**
	 * Проверяет правильность заполнения формы
	 * @returns {Boolean} если ошибок нет то true
	 */
	isValid: function() {
		return this._cf.isValid();
	},
	/**
	 * Обновляет данные на сервере
	 */
	sync: function() {
		var store = this._cf.getStore();
		store.sync({callback: function() {
				store.load();
			}});
	},
	/**
	 * Загружает данные в форму
	 */
	loadRecord: function() {
		this._cf.getStore().load();
	},
	/**
	 * Устанавливает хранилища для своих таблиц. Хранилища берутся
	 * из ассоциаций текущего запроса.
	 */
	setStorage: function() {
		this._cf.reconfigure(qqext.request.getExec().coordinations());
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				coor = qqext.coordination;

		Ext.applyIf(me, {
			items: [createCmp('FieldSet', {
					collapsible: true,
					collapsed: true,
					cls: 'collapse_section',
					title: 'Согласование документа',
					items: [me._cf = createCmp('FPanelGrid', 'CoordinationModel', {
							defaults: {
								sortable: false,
								menuDisabled: true
							}, items: [
								createCmp('ComboColumn', coor.stage[1], coor.stage[0],
										'coordinationStage', 1),
								{
									text: coor.date[1],
									dataIndex: coor.date[0],
									editor: {xtype: 'hawkDateField'},
									renderer: function(value) {
										return Ext.Date.format(value, 'd.m.Y');
									}
								}
							]
						})
					]})
			]});
		me.callParent();
	}
});
