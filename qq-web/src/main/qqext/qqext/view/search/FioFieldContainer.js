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
	 * @param {String} (required) surname фамилия
	 * @param {String} (required) name имя
	 * @param {String} (required) fathername отчество
	 * @param {Boolean} viewmode режим просмотра
	 * @param {Object} opts дополнительные параметры
	 */
	constructor: function(surname, name, fathername, viewmode, opts) {
		var me = this;
		me.surName = surname;
		me.name = name;
		me.fatherName = fathername;
		me._config(viewmode, opts);
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create;
		Ext.applyIf(me, {
			items: [
				createCmp('FTextField', 'Фамилия', me.surName),
				createCmp('FTextField', 'Имя', me.name, {labelAlign: 'right'}),
				createCmp('FTextField', 'Отчество', me.fatherName, {labelAlign: 'right'})
			]
		});
		me.callParent();
	}
});
