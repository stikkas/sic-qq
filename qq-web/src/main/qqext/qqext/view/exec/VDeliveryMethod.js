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
		'Ext.Component',
		'Ext.Date',
		'qqext.cmp.FieldSet',
		'hawk_common.cmp.FileList',
		'hawk_common.cmp.DateField'
	],
	title: 'Способ отправки',
	/**
	 * Обновляет данные на сервере
	 */
	sync: function() {
		var store = this._sf.getStore();
		store.sync({callback: function() {
				store.load();
			}});
	},
	/**
	 * Загружает данные в форму
	 */
	loadRecord: function(model) {
		this._sf.getStore().load();
		this.callParent([model]);
	},
	/**
	 * Устанавливает хранилища для своих таблиц. Хранилища берутся
	 * из ассоциаций текущего запроса.
	 */
	setStorage: function() {
		this._sf.reconfigure(qqext.request.sendactions());
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create,
				way = qqext.wayToSend,
				action = qqext.sendAction,
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
							renderer: function(value) {
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
							renderer: function(value) {
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
					items: [createCmp('hawk_common.cmp.FileList')]
				})
			]
		});

		me.callParent();
	}
});
