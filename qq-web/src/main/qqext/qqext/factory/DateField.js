/**
 * Фабрика для создания обобщенного DateField.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.DateField', {
	extend: 'qqext.factory.Base',
	requires: [
		'Ext.form.field.Date',
		'hawk_common.fix.FixedDateField'
	],
	/**
	 * Возвращает объект типа datefield
	 * @param {String} fieldLabel метка для виджета
	 * @param {String} name имя (скорее всего для формы)
	 * @returns {Object} объект, на основе которого ExtJS сделает Date
	 */
	constructor: function(fieldLabel, name) {
		return this._config({
			xtype: 'datefield',
			fieldLabel: fieldLabel,
			name: name
		});
	}
});


