/**
 *  Компонент TextArea, позволяющий вводить текстовые данные
 *  и может находится как в режиме редактирования, так и в режиме просмотра.
 *
 */
Ext.define('qqext.cmp.TextArea', {
	extend: 'Ext.form.field.TextArea',
	xtype: 'textareafieldcmp',
	/**
	 * Здесь проще определить метод с таким же названием, чтобы поддерживал
	 * одинаковый интерфейс со всеми.
	 * @param {Boolean} mode режим отображения: true - просмотр только, false - редактирование
	 */
	setViewOnly: function(mode) {
		if (this._viewMode !== mode) {
			this.inputEl.dom.disabled = mode;
			this._viewMode = mode;
		}
	}
//	,
//	// Может быть в будущем понадобится другое отображение содержимого textarea
//	// так что возможна и такая реализация:
//	mixins: ['qqext.cmp.EditViewMode'],
//	_before: 'inputEl',
//	/**
//	 * Создает метку для отображения значения в режиме просмотра.
//	 * Вызывается только один раз и перед всеми манипуляциями с режимами,
//	 * поэтому в этом методе можно назначить поля для часто используемых объектов.
//	 * Потом, сейчас не буду.
//	 * @private
//	 */
//	_initLabel: function() {
//		var me = this,
//				label = document.createElement('textarea'),
//				dom = me[me._before].dom,
//				attrs = dom.attributes,
//				i = 0, max = attrs.length, atr;
//		for (; i < max; ++i) {
//			atr = attrs[i];
//			label.setAttribute(atr.name, atr.value);
//		}
//		label.style.display = 'none';
//		label.disabled = true;
//		me.bodyEl.dom.insertBefore(label, dom);
//		me._label = label;
//	}
});
