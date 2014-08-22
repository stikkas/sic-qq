/**
 * Фабрика для создания обобщенного ComboBox.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.ComboBox', {
	/**
	 * Создает объект типа combobox
	 * @param {String} fieldLabel Метка селектора
	 * @param {String} store алиас хранилища
	 * @param {String} name имя поля формы
	 * @param {String} displayedField поле хранилища для отображения (не обязательно)
	 * @param {String} valueField поле хранилища для значения (не обязательно)
	 * @returns {Object} объект, на основе которого ExtJS сделает ComboBox
	 */
	constructor: function(fieldLabel, store, name, displayedField, valueField) {
		return {
			xtype: 'combobox',
			fieldLabel: fieldLabel,
			displayField: displayedField || 'name',
			valueField: valueField || 'id',
			store: store,
			name: name
		};
	}
});


