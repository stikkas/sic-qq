/**
 * Форма для отображения в горизонтальном порядке ФИО
 */
Ext.define('qqext.view.search.FioFieldContainer', {
	alias: 'FioFieldContainer',
	extend: 'qqext.cmp.FieldContainer',
	requires: [
		'qqext.factory.TextField'
	],
	mixins: ['qqext.factory.Base'],
	layout: 'hbox',
	xtype: 'fiofieldcontainer',
	height: 30,
	/**
	 * Создает объект типа FioFieldContainer
	 * @param {String} (required) lastname фамилия
	 * @param {String} (required) firstname имя
	 * @param {String} (required) middlename отчество
	 * @param {Boolean} viewmode режим просмотра
	 * @param {Object} opts дополнительные параметры
	 */
	constructor: function (lastname, firstname, middlename, viewmode, opts) {
		var me = this;
		me.lastname = lastname;
		me.firstname = firstname;
		me.middlename = middlename;
		me._config(viewmode, opts);
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [
				createCmp('FTextField', 'Фамилия', me.lastname, {labelWidth:150}),
				createCmp('FTextField', 'Имя', me.firstname, {labelAlign: 'right'}),
				createCmp('FTextField', 'Отчество', me.middlename, {labelAlign: 'right'})
			]
		});
		me.callParent();
	}
});
