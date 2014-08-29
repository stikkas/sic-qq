/**
 * Служит для переопределения стандартных и назначения новых методов классам, которые
 * унаследовали от классов extjs. Что-то вроде множественного наследования.
 *
 * Имеется набор базовых классов Ext, мы от них наследуем, и потом с помощью данного класса
 * переопределяем нужные методы, а не переопределяем их в каждом новом классе, т.к.
 * в большинстве своем переопределяемые методы идентичны. Эта схема сделана для обеспечения
 * необходимого поведения при переключении режимов (редактирование/просмотр) отображения элементов формы.
 *
 * Не предназначен для создания элементов. Используется как namespace.
 *
 *	# Пример использования:
 *
 * 		Ext.define('myComboBox', {
 * 			extend: 'Ext.form.field.ComboBox',
 * 			// Другие параметры...
 * 		}, function(){
 * 			qqext.cmp.Base.c(this.prototype);
 * 		});
 *
 * @author С. Благодатских
 */
Ext.define('qqext.cmp.Base', {
	statics: {
		/**
		 * Переопределяет методы setDisabled, onRender, initComponent для '`combobox`'
		 * @param {Object} proto объект-прототип (prototype object) переопределяемого класса
		 */
		c: function(proto) {
			var setDisabled = proto.setDisabled,
					onRender = proto.onRender,
					initComponent = proto.initComponent;

			proto.setDisabled = function() {
				var me = this;
				setDisabled.apply(me, arguments);
				if (me.disabled) {
					if (me.triggerEl)
						me.triggerEl.hide();
					if (me.triggerWrap)
						me.triggerWrap.removeCls('x-form-trigger-wrap');
				} else {
					if (me.triggerEl)
						me.triggerEl.show();
					if (me.triggerWrap)
						me.triggerWrap.addCls('x-form-trigger-wrap');
				}
			};
			proto.onRender = function() {
				var me = this;
				onRender.apply(me, arguments);
				if (!me.rendered) {
					return;
				}
				var t = me.getValue(), displayValue = t;
				if (t) {
					var storeObj = me.getStore().getById(t);
					if (storeObj)
						displayValue = storeObj.data[me.displayField];
				}
				if (me.disabled) {
					me.triggerEl.hide();
					me.triggerWrap.removeCls('x-form-trigger-wrap');
				} else {
					me.triggerEl.show();
					me.triggerWrap.addCls('x-form-trigger-wrap');
				}
				me.label.setText(displayValue);
			};
			proto.changeListener = function(combo, nVal, oVal, eopts) {
				var storeObj = combo.getStore().getById(nVal);
				if (storeObj) {
					var displayText = storeObj.data[combo.displayField];
					if (displayText === '&nbsp') {
						displayText = '';
					}
					if (combo.label) {
						combo.label.setText(displayText);
					}
				} else {
					if (combo.label)
						combo.label.setText('Не выбрано');
				}
			};
			proto.initComponent = function() {
				initComponent.apply(this, arguments);
				this.addListener('change', this.changeListener);
			};
		}
	}
});
