/**
 * Форма для отображения в горизонтальном порядке ФИО
 */
Ext.define('qqext.view.search.FioFieldContainer', {
	extend: 'Ext.form.FieldContainer',
	requires: [
		'qqext.factory.TextField'
	],
	layout: 'hbox',
	xtype: 'fiofieldcontainer',
	height: 30,
	initComponent: function() {
		var me = this,
				TextField = qqext.factory.TextField;
		Ext.applyIf(me, {
			items: [
				new TextField('Фамилия', me.nSurname),
				new TextField('Имя', me.nName).cfg({labelAlign: 'right'}),
				new TextField('Отчество', me.nFatherName).cfg({labelAlign: 'right'})
			]
		});
		me.callParent(arguments);
	}
});
