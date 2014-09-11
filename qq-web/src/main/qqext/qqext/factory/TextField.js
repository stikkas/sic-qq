/**
 * Фабрика для создания обобщенного TextField. Расширяю а не использую qqext.cmp.Text
 * для того чтобы можно было вынести qqext.cmp.Text в библиотеку, а тут я переопределяю
 * конструктор, который больше подходит именно для этого приложения.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.TextField', {
	extend: 'qqext.cmp.Text',
	mixins: ['qqext.factory.Base'],
	alias: 'FTextField',
	/**
	 * Создает виджет типа textfieldcmp
	 * @param {String} fieldLabel (required) надпись для поля
	 * @param {String} name (required)  имя поля формы
	 * @param {Boolean} viewmode режим просмотра (опционально, по умолчанию - редактирование)
	 * @param {Object} opts дополнительные параметры для компонента
	 */
	constructor: function(fieldLabel, name, viewmode, opts) {
		this.fieldLabel = fieldLabel;
		this.name = name;
		this._config(viewmode, opts);
	}
});

