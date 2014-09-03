/**
 * Фабрика для создания обобщенного Checkbox.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.Checkbox', {
	extend: 'qqext.factory.Base',
	requires: [
		'qqext.cmp.Checkbox'
	],
	/**
	 * Возвращает объект типа checkboxfield
	 * @param {String} fieldLabel Заголовок
	 * @param {String} name наименование элемента формы
	 * @returns {Object} объект, на основе которого ExtJS сделает Checkbox
	 */
	constructor: function(fieldLabel, name) {
		return this.c({
			xtype: 'checkboxfieldcmp',
			fieldLabel: fieldLabel,
			name: name
		});
	}
});
