/**
 * Фабрика для создания обобщенного DateField.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.DateField', {
	extend: 'qqext.cmp.Date',
	mixins: ['qqext.factory.Base'],
	alias: 'FDateField',
	/**
	 * Создает объект типа FDateField
	 * @param {String} fieldLabel (required) метка для виджета
	 * @param {String} name (required) имя для поля формы
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(fieldLabel, name, viewmode, opts) {
		this.fieldLabel = fieldLabel;
		this.name = name;
		this._config(viewmode, opts);
	}
});


