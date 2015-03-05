/**
 * Фабрика для создания обобщенного ComboBox.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.ComboBox', {
	extend: 'qqext.cmp.ComboBox',
	mixins: ['qqext.factory.Base'],
	alias: 'FComboBox',
	/**
	 * Создает объект типа FComboBox.
	 * По умолчанию назначаются значения для displayField = 'name' и valueField = 'id'
	 * если надо другое, то передайте их в параметре opts
	 * @param {String} fieldLabel (required) Метка селектора
	 * @param {String/Ext.data.Store} store (required) id хранилища или само хранилище
	 * @param {String} name (required) имя поля формы
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function (fieldLabel, store, name, viewmode, opts) {
		var me = this;
		me.fieldLabel = fieldLabel;
		me.store = store;
		me.name = name;
//		me.displayField = 'name';
		me.valueField = 'id';
		me._config(viewmode, opts);
	}
});


