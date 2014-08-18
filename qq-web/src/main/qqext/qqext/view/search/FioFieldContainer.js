/**
 * Форма для отображения в горизонтальном порядке ФИО
 */
Ext.define('qqext.view.search.FioFieldContainer', {
	extend: 'Ext.form.FieldContainer',
	layout: 'hbox',
	xtype: 'fiofieldcontainer',
	height: 30,
	/**
	 * Создает виджет типа textfield
	 * @param {String} fieldLabel надпись для поля
	 * @param {String} name имя (для формы)
	 * @param {String} [align='left'] align выравнивание надписи
	 * @returns {Object} объект, на основе которого ExtJS сделает Text
	 */
	createText: function(fieldLabel, name, align) {
		return {
			xtype: 'textfield',
			fieldLabel: fieldLabel,
			labelAlign: align || 'left',
			name: name
		}
	},
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				me.createText('Фамилия', me.nSurname),
				me.createText('Имя', me.nName, 'right'),
				me.createText('Отчество', me.nFatherName, 'right')
			]
		});
		me.callParent(arguments);
	}
});