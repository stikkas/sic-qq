/**
 *  Компонент Checkbox, позволяющий отмечать или снимать отметку на определенных полях
 *  и может находится как в режиме редактирования, так и в режиме просмотра.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.cmp.Checkbox', {
	extend: 'Ext.form.field.Checkbox',
//	_before: 'inputEl',
//	mixins: ['qqext.cmp.EditViewMode'],
	xtype: 'checkboxfieldcmp',
	/**
	 * По требования заказчика требуется такое поведение
	 */
	setViewOnly: function (mode) {
		if (this._viewMode !== mode) {
			this.inputEl.dom.disabled = mode;
			this._viewMode = mode;
		}
	}//,
//	_getValue: function () {
//		return this.getValue() ? "да" : "нет";
//	},
	/**
	 * Создает метку для отображения значения в режиме просмотра.
	 * Вызывается только один раз и перед всеми манипуляциями с режимами,
	 * поэтому в этом методе можно назначить поля для часто используемых объектов.
	 * Потом, сейчас не буду.
	 * @private
	 */
//	_initLabel: function () {
//		var me = this,
//				label = document.createElement('span');
//		label.style.display = 'none';
//		me.bodyEl.dom.insertBefore(label, me[me._before].dom);
//		me._label = label;
//	},
	/**
	 * Скрывает поле ввода
	 * @private
	 */
//	_hideInput: function () {
//		var me = this;
//		me[me._before].dom.style.display = 'none';
//		me.labelEl.dom.onclick = me._onClick;
//	},
	/**
	 * Показывает поле ввода
	 * @private
	 */
//	_showInput: function () {
//		this[this._before].dom.style.display = '';
//		this.labelEl.dom.onclick = null;
//	},
	/**
	 * Отменяет обычное действие на событие для DOM. Нужно для отмены
	 * переключения checkbox в невидимом режиме по щелчку на метку.
	 * @private
	 */
//	_onClick: function (ev) {
//		ev.preventDefault();
//	}
});
