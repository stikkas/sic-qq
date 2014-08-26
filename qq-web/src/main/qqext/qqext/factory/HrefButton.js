/**
 * Фабрика для создания обобщенного Button.
 * Используется когда необходимо использовать ссылку кнопки вместо handler.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.HrefButton', {
	extend: 'qqext.factory.Base',
	requires: [
		'Ext.button.Button'
	],
	/**
	 * Создает объект типа button
	 * @param {String} text Надпись на кнопке
	 * @param {String} href Адрес, куда будет отправлен запрос при нажатии
	 * @returns {Object} объект, на основе которого ExtJS сделает Button
	 */
	constructor: function(text, href) {
		return  this._config({
			xtype: 'button',
			text: text,
			href: href
		});
	}
});

