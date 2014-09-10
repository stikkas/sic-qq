/**
 * Добавляет к компоненту возможность быть доступным в режиме просмотра
 * или в режиме редактирования. В целевом компоненте может потребоваться переопределение
 * частных методов и назначение частных полей. Подразумевается что целевой компонент в DOM выглядит
 * примерно так:
 *
 * 	<anytag class='any-bodyEl'><anytag class='any-insertBeforeTag'>...</anytag></anytag>
 *
 * Переопределенные компоненты:
 *
 * - Ext.form.field.Text
 * - Ext.form.field.Date
 * - Ext.form.field.ComboBox
 * - Ext.form.field.Number
 * - Ext.form.field.Checkbox
 *
 * подходят под это определение.
 *
 * # Пример использования:
 *
 *  	Ext.define('EditableViewClass', {
 *  		extend: 'Ext.form.field.Text',
 *  		mixins: ['qqext.cmp.EditViewMode'],
 *  		_before: 'inputEl',
 *  		// другие параметры...
 *  	});
 *
 *  	var comp = Ext.create('EditableViewClass');
 *  	comp.show();
 *  	// Включаем режим просмотра
 *  	comp.setViewOnly(true);
 *  	// Включаем режим редактирования
 *  	comp.setViewOnly(false);
 *
 *	Если требуется изначально чтобы объект был доступен только для чтения, то
 *	следует определить listener, примерно так
 *
 *		Ext.define('MyViewOnlyClass', {
 *			extend: 'Ext.form.field.ComboBox',
 *			mixins: ['qqext.cmp.EditViewMode'],
 *			listeners: {
 *				afterrender: function() {
 *					this.setViewOnly(true);
 *				}
 *			}//... другие параметры
 *		});
 *
 * @author С. Благодатских
 */
Ext.define('qqext.cmp.EditViewMode', {
	/**
	 * Включает или выключает режим просмотра
	 * @param {Boolean} mode true - режим просмотра , false - обычный режим (редактирование)
	 */
	setViewOnly: function(mode) {
		var me = this;
		// выполняется только первый раз для созданного объекта
		me._initLabel();
		// сохраняем оригинальное значение метода, тоже один раз
		me._setValueE = me.setValue;
		me.setViewOnly = me._setViewOnly;
		me._setViewOnly(mode);
	},
	/**
	 * Вызывается все повторные разы
	 * @private
	 * @param {Boolean} mode
	 */
	_setViewOnly: function(mode) {
		if (mode !== this._viewMode) {
			if (mode)
				this._setViewMode();
			else
				this._setEditMode();
			this._viewMode = mode;
		}
	},
	/**
	 * @private
	 * Отображает данные в режиме просмотра
	 */
	_label: null,
	/**
	 * @private
	 * Где вставлять метку
	 */
	_before: 'triggerWrap',
	/**
	 * @private
	 * текущий режим: false - редактирование разрешено
	 */
	_viewMode: false,
	/**
	 * @property {Boolean} viewOnly
	 * Устанавливается сразу после создания объекта, если необходимо, чтобы объект
	 * был всегда доступен только для чтения.
	 */
	viewOnly: false,
	/**
	 * Устанавливает режим для редактирования
	 * @private
	 */
	_setEditMode: function() {
		var me = this;
		if (!me.viewOnly) {
			me._label.style.display = 'none';
			me._showInput();
			me.setValue = me._setValueE;
		}
	},
	/**
	 * Устанавливает режим для просмотра только.
	 * FIXME: Сейчас настроено так, что если поле на проходит валидацию, то
	 * выставляется пустое значение, нужно это или нет?
	 * @private
	 */
	_setViewMode: function() {
		var me = this,
				lbl = me._label;
		lbl.style.display = '';
		lbl.innerHTML = me.isValid() ? me._getValue() : '';
		me._hideInput();
		me.setValue = me._setValueV;
	},
	/**
	 * Делает видимым элемент ввода. Стандартный для большинства, но бывают и исключения (Checkbox)
	 * @private
	 */
	_showInput: function() {
		this[this._before].setVisible(true);
	},
	/**
	 * Делает невидимым элемент ввода. Стандартный для большинства, но бывают и исключения (Checkbox)
	 * @private
	 */
	_hideInput: function() {
		this[this._before].setVisible(false);
	},
	/**
	 * Создает метку для отображения значения в режиме просмотра.
	 * FIXME: может стоит подумать о назначении стилевых классов этой метке.
	 * @private
	 */
	_initLabel: function() {
		var me = this,
				label = document.createElement('div');
		label.setAttribute('class', 'x-form-field x-form-text');// me.inputEl.dom.getAttribute('class'));
		label.style.display = 'none';
		me.bodyEl.dom.insertBefore(label, me[me._before].dom);
		me._label = label;
	},
	/**
	 * По умолчанию возвращает значение стандартного элемента, если необходимо что-то
	 * другое, то требуется переоперделить в классе потомке.
	 * @private
	 * @returns {Object}
	 */
	_getValue: function() {
		return this.getValue();
	},
	/**
	 * Необходимо для случая когда нередактируемость выставляется перед установкой значения,
	 * или другими словами, когда требуется установка значения программным путем для
	 * компонента, находящегося в режиме просмотра.
	 * На данный момент не используется в TextArea, если понадобится такая функциональность, то
	 * следует переработать класс qqext.cmp.TextArea.
	 * @param {Number/String} value значение для поля
	 * @private
	 */
	_setValueV: function(value) {
		var me = this;
		me._setValueE(value);
		me._label.innerHTML = me.isValid() ? me._getValue() : '';
	}
	/**
	 * Используется для сохранения оригинального значения метода setValue
	 * @private
	 * @method _setValueE
	 */
});

