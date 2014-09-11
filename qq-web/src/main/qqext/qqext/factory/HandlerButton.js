/**
 * Фабрика для создания обобщенного Button.
 * Используется когда следуте задать handler для кнопки.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.HandlerButton', {
	extend: 'Ext.button.Button',
	mixins: ['qqext.factory.Base'],
	alias: 'FHandlerButton',
	/**
	 * Создает объект типа button
	 * @param {String} text Надпись на кнопке
	 * @param {Function} handler Функция реагирования на нажатие кнопки
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(text, handler, opts) {
		this.text = text;
		this.handler = handler;
		this._config(opts);
	}
});
