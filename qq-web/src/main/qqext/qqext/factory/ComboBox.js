/**
 * Фабрика для создания обобщенного ComboBox.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.ComboBox', {
	extend: 'qqext.factory.Base',
	requires: [
		'qqext.cmp.ComboBox'
	],
	/**
	 * Создает объект типа combobox
	 * @param {String} fieldLabel Метка селектора
	 * @param {String} store алиас хранилища
	 * @param {String} name имя поля формы (не обязательно)
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @param {String} displayField поле хранилища для отображения (не обязательно)
	 * @param {String} valueField поле хранилища для значения (не обязательно)
	 * @returns {Object} объект, на основе которого ExtJS сделает ComboBox
	 */
	constructor: function(fieldLabel, store, name, viewmode, displayField, valueField) {
		var obj = {
			xtype: 'comboboxcmp',
			fieldLabel: fieldLabel,
			displayField: displayField || 'name',
			valueField: valueField || 'id',
			store: store
		};
		if (name)
			obj.name = name;
		return this.c(obj, viewmode);
	}
});


