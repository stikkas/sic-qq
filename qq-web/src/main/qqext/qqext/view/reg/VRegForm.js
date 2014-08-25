/**
 * Форма "Регистрация запроса" карточки запроса
 */

Ext.define('qqext.view.reg.VRegForm', {
	extend: 'Ext.container.Container',
	requires: [
		'qqext.view.reg.VInboxDoc',
		'qqext.view.reg.VQuery',
		'qqext.view.reg.VApplicant',
		'qqext.view.reg.VQueryObject',
		'qqext.view.reg.VFiles'
	],
	disabledCls: '',
	maskOnDisable: false,
	disabled: null,
	region: 'center',
	overflowY: 'auto',
	overflowX: 'hidden',
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.reg.VInboxDoc'),
				Ext.create('qqext.view.reg.VQuery'),
				Ext.create('qqext.view.reg.VApplicant'),
				Ext.create('qqext.view.reg.VQueryObject'),
				Ext.create('qqext.view.reg.VFiles')
			]
		});
		me.callParent(arguments);
	},
	/**
	 * Устанавливает состояние доступности всех своих элементов
	 * @param {Boolean} disabled
	 */
	setDisabled: function(disabled) {
		var items = this.items, max = items.items.length;
		for (var i = 0; i < max; i++) {
			items.getAt(i).setDisabled(disabled);
		}
		this.disabled = disabled;
	},
	/**
	 *  Возвращает состояние доступности
	 * @returns {Boolean}
	 */
	isDisabled: function() {
		return this.disabled;
	},
	loadRecord: function(model) {
		var me = this;
		me.items.getAt(0).loadRecord(model); //load model into qqext.view.reg.VInboxDoc
		var applicant;

		applicant = model.getApplicant();

		me.items.getAt(1).loadRecord(applicant);

		me.items.getAt(2).loadRecord(model);
		me.items.getAt(3).loadRecord(model);
		me.items.getAt(4).loadRecord(model);
	},
	updateRecord: function(model) {
		var me = this;
		for (var i = 0; i < me.items.length; i++) {
			if (me.items.get(i).$className !== 'qqext.view.reg.VApplicant') {
				me.items.getAt(i).updateRecord(model);
			} else {
				if (model.getApplicant && model.getApplicant()) {
					console.log('обновление модели Applicant');
					me.items.getAt(i).updateRecord(model.getApplicant());
				}
			}
		}
	}
});
