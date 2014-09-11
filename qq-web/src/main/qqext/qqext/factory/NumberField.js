/**
 * Фабрика для создания обобщенного Number.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.NumberField', {
	extend: 'qqext.cmp.Number',
	mixins: ['qqext.factory.Base'],
	alias: 'FNumberField',
	/**
	 * Создает компонент FNumberField
	 * @param {String} fieldLabel надпись
	 * @param {String} name наименование поля формы
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(fieldLabel, name, viewmode, opts) {
		this.fieldLabel = fieldLabel;
		this.name = name;
		this._config(viewmode, opts);
	}
});


