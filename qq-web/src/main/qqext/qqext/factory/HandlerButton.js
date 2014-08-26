/**
 * Фабрика для создания обобщенного Button.
 * Используется когда следуте задать handler для кнопки.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.HandlerButton', {
	extend: 'qqext.factory.Base',
	requires: [
		'Ext.button.Button'
	],
	/**
	 * Создает объект типа button
	 * @param {String} text Надпись на кнопке
	 * @param {Function} handler Функция реагирования на нажатие кнопки
	 * @returns {Object} объект, на основе которого ExtJS сделает Button
	 */
	constructor: function(text, handler) {
		return  this._config({
			xtype: 'button',
			text: text,
			handler: handler
		});
	}
});
