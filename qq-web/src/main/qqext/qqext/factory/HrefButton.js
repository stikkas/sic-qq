/**
 * Фабрика для создания обобщенного Button.
 * Используется когда необходимо использовать ссылку кнопки вместо handler.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.HrefButton', {
	extend: 'Ext.button.Button',
	alias: 'FHrefButton',
	/**
	 * Создает объект типа button
	 * @param {String} text Надпись на кнопке
	 * @param {String} href Адрес, куда будет отправлен запрос при нажатии
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(text, href, opts) {
		this.text = text;
		this.href = href;
		this.callParent([opts]);
	}
});

