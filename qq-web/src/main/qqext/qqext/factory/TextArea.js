/**
 * Фабрика для создания обобщенного TextArea.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.TextArea', {
	extend: 'qqext.factory.Base',
	requires: [
		'qqext.cmp.TextArea'
	],
	/**
	 * Возвращает объект типа textareafield
	 * @param {String} fieldLabel Заголовок
	 * @param {String} name наименование элемента формы
	 * @returns {Object} объект, на основе которого ExtJS сделает TextArea
	 */
	constructor: function(fieldLabel, name) {
		return this.c({
			xtype: 'textareafieldcmp',
			fieldLabel: fieldLabel,
			name: name
		});
	}
});
