/**
 * В режиме просмотра (запрещено редактировать) отображается
 * дата заданного формата в виде текстовой метки.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.cmp.DateField', {
	override: 'Ext.form.field.Date',
	requires: ['Ext.form.Label'],
	/**
	 * @cfg {String} name
	 * Наименование поля формы (используется как имя параметра при посылке
	 * формы на сервер)
	 */
	name: 'fixedDateField',
	/**
	 * Устанавливает дату для поля и для скрытой метки.
	 */
	setValue: function() {
		var me = this;
		me.callParent(arguments);
		if (me.label) {
			var formattedValue = Ext.Date.format(me.getValue(), me.format);
			me.label.setText(formattedValue);
		}
	},
	/**
	 * Изменяет режим доступа компонента
	 */
	changeMode: function() {
		var me = this;
		if (!me.rendered) {
			return;
		}
		if (!me.label) {
			return;
		}
		if (me.disabled) {
			me.inputEl.addCls('display-false');
			var formattedDate = Ext.Date.format(me.getValue(), me.format);
			me.label.setText(formattedDate);
			me.label.show();
			me.triggerEl.hide();
			me.triggerWrap.removeCls('x-form-trigger-wrap');
		} else {
			me.label.hide();
			me.inputEl.dom.disabled = false;
			me.inputEl.removeCls('display-false');
			me.triggerEl.show();
			me.triggerWrap.addCls('x-form-trigger-wrap');
		}
	},
	/**
	 * При перерисовывании компонента создается новая метка.
	 */
	onRender: function() {
		var me = this;
		me.callOverridden(arguments);
		if (!me.rendered) {
			return;
		}
		me.label = Ext.create('Ext.form.Label', {
			renderTo: me.valueLabelDivId,
			text: '',
			hidden: true
		});
		me.changeMode();
	}
});
