/**
 * Фабрика для создания обобщенного TextField.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.TextField', {
	extend: 'qqext.factory.Base',
	requires: [
		'hawk_common.fix.FixedTextField'
	],
	/**
	 * Создает виджет типа textfield
	 * @param {String} fieldLabel надпись для поля
	 * @param {String} name имя (для формы)
	 * @returns {Object} объект, на основе которого ExtJS сделает Text
	 */
	constructor: function(fieldLabel, name) {
		return {
			cfg: this._cfg,
			xtype: 'textfield',
			fieldLabel: fieldLabel,
			name: name
		};
	}
});

