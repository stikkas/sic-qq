/**
 * Компонент для выбора одного значения из списка. Отличается от стандартного
 * {@link Ext.form.field.ComboBox} поведением при переключении режимов редактирования
 * и просмотра.
 *
 * 	# Пример использования:
 *
 * 		Ext.create('qqext.cmp.ComboBox' {
 * 			fieldLabel: 'ComboBox',
 * 			displayField: 'name',
 * 			valueField: 'id',
 * 			store: 'someRegisteredStoreId',
 * 			renderTo: Ext.getBody()
 * 		}
 *
 * @author С. Благодатских
 */
Ext.define('qqext.cmp.ComboBox', {
	extend: 'Ext.form.field.ComboBox',
	requires: ['qqext.cmp.Base'],
	/**
	 * @property {Boolean} disabled
	 * указывает в каком состоянии находится компонент
	 */
	/**
	 * @cfg name
	 * Наименование поля формы
	 */
	name: 'fixedComboBox',
	/**
	 * @cfg {String} divId
	 * идентификатор элемента DOM
	 */
	editable: false,
	xtype: 'comboboxcmp'
},
function() {
	qqext.cmp.Base.c(this.prototype);
});
