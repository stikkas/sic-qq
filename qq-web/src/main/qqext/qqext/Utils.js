/**
 * Различные полезные функции
 */
Ext.define('qqext.Utils', {
	singleton: true,
	/**
	 * Создает кнопку с надписью и действием.
	 * @param {String} text надпись кнопки
	 * @param {String} action действие для кнопки
	 * @param {Number} width ширина кнопки (опционально)
	 * @returns {Ext.Button} объект кнопки
	 */
	createButton: function(text, action, width) {
		return Ext.create('Ext.Button', {
			text: text,
			width: width || 200,
			action: action
		});
	}
});