/**
 * Фабрика для создания обобщенного DateField.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.DateField', {
	extend: 'qqext.factory.Base',
	requires: [
		'qqext.cmp.Date'
	],
	/**
	 * Возвращает объект типа datefield
	 * @param {String} fieldLabel метка для виджета
	 * @param {String} name имя для поля формы
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @returns {Object} объект, на основе которого ExtJS сделает Date
	 */
	constructor: function(fieldLabel, name, viewmode) {
		return this.c({
			xtype: 'datefieldcmp',
			fieldLabel: fieldLabel,
			name: name
		}, viewmode);
	}
});


