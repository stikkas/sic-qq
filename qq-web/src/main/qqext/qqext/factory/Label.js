/**
 * Фабрика для создания обобщенного Label.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.Label', {
	extend: 'qqext.factory.Base',
	requires: [
		'Ext.form.Label'
	],
	/**
	 * Возвращает объект типа label
	 * @param {String} text надпись
	 * @returns {Object} объект, на основе которого ExtJS сделает Label
	 */
	constructor: function(text) {
		return {
			cfg: this._cfg,
			xtype: 'label',
			text: text
		};
	}
});

