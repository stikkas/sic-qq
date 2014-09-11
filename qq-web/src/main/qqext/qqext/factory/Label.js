/**
 * Фабрика для создания обобщенного Label.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.Label', {
	extend: 'Ext.form.Label',
	mixins: ['qqext.factory.Base'],
	alias: 'FLabel',
	/**
	 * Возвращает объект типа FLabel
	 * @param {String} text надпись
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(text, opts) {
		this.text = text;
		this._config(opts);
	}
});

