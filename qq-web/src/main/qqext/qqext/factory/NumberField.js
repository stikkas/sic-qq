/**
 * Фабрика для создания обобщенного Number.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.NumberField', {
	extend: 'qqext.factory.Base',
	requires: [
		'qqext.cmp.Number'
	],
	/**
	 * Возвращает объект типа numberfield
	 * @param {String} fieldLabel надпись
	 * @param {String} name наименование поля формы
	 * @returns {Object} объект, на основе которого ExtJS сделает Number
	 */
	constructor: function(fieldLabel, name) {
		return this.c({
			xtype: 'numberfieldcmp',
			fieldLabel: fieldLabel,
			name: name
		});
	}
});


