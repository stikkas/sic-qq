/**
 * Отрисовывает значение ComboBox когда тот является редактором для Grid панели
 */
Ext.define('qqext.factory.ComboRenderer', {
	alias: 'FComboRenderer',
	/**
	 * Конструктор возвращает функцию, которая впоследствии будет вызываться на событие
	 * отрисовки в Grid панели
	 * @param {String} storeId идентификатор для хранилища ComboBox редактора
	 * @param {String} displayField (optional) поле для отображения (по-умолчанию name)
	 * @param {String} valueField (optional) поле со значением (по-умолчанию id)
	 */
	constructor: function(storeId, displayField, valueField) {
		displayField = displayField || 'name';
		valueField = valueField || 'id';
		return function rend(value) {
			var store = Ext.getStore(storeId),
					record = store.getById(value);
			if (record) {
//				rend.value = value;
				return record.get(displayField);
			}
			return '';/*else if (rend.value) {
			 return store.getById(rend.value).get(displayField);
			 } else {
			 record = store.getAt(0);
			 rend.value = record.get(valueField);
			 return record.get(displayField);
			 }
			 */
		};

	}
});



