/**
 * Фабрика для создания обобщенного ComboBox.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.ComboBox', {
	extend: 'qqext.factory.Base',
	requires: [
		'Ext.form.field.ComboBox',
		'hawk_common.fix.FixedField'
	],
	/**
	 * Создает объект типа combobox
	 * @param {String} fieldLabel Метка селектора
	 * @param {String} store алиас хранилища
	 * @param {String} name имя поля формы (не обязательно)
	 * @param {String} displayedField поле хранилища для отображения (не обязательно)
	 * @param {String} valueField поле хранилища для значения (не обязательно)
	 * @returns {Object} объект, на основе которого ExtJS сделает ComboBox
	 */
	constructor: function(fieldLabel, store, name, displayedField, valueField) {
		var obj = {
			xtype: 'combobox',
			fieldLabel: fieldLabel,
			displayField: displayedField || 'name',
			valueField: valueField || 'id',
			store: store
		};
		if (name)
			obj.name = name;
		return this._config(obj);
	}
});


