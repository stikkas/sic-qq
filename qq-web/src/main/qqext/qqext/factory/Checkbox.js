/**
 * Фабрика для создания обобщенного Checkbox.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.Checkbox', {
	extend: 'qqext.cmp.Checkbox',
	mixins: ['qqext.factory.Base'],
	alias: 'FCheckbox',
	/**
	 * Создает объект типа FCheckbox
	 * @param {String} fieldLabel (required) Заголовок
	 * @param {String} name (required) наименование элемента формы
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(fieldLabel, name, viewmode, opts) {
		this.fieldLabel = fieldLabel;
		this.name = name;
		this._config(viewmode, opts);
	}
});
