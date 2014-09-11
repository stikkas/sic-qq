/**
 * Фабрика для создания обобщенного TextArea.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.TextArea', {
	extend: 'qqext.cmp.TextArea',
	mixins: ['qqext.factory.Base'],
	alias: 'FTextArea',
	/**
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
