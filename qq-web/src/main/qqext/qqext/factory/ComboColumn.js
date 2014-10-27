/**
 * Колонка с возможностью редактировать значения ячеек посредством ComboBox
 */
Ext.define('qqext.factory.ComboColumn', {
	extend: 'Ext.grid.column.Column',
	alias: 'ComboColumn',
	requires: ['Ext.form.field.ComboBox'],
	sortable: false,
	menuDisabled: true,
	/**
	 * Конструктор
	 * @param {String} text заголовок
	 * @param {String} dataIndex идентификатор ячейки
	 * @param {String} storeId идентификатор хранилища для ComboBox
	 * @param {Number} flex (optional) фактор для растягивания
	 * @param {String} displayField (optional) поле хранилища для отображения в ComboBox
	 * (по умолчанию - `name`)
	 * @param {String} valueField (optional) поле хранилища для значения (по умолчанию - `id`)
	 */
	constructor: function (text, dataIndex, storeId,
			flex, displayField, valueField) {
		var me = this;
		displayField = displayField || 'name';
		valueField = valueField || 'id';
		me.text = text;
		me.dataIndex = dataIndex;
		me.editor = Ext.create('Ext.form.field.ComboBox', {
			store: storeId,
			displayField: displayField,
			valueField: valueField,
			editable: false
		});
		me.flex = flex;
		me.renderer = function rend(value) {
			var store = Ext.getStore(storeId),
					record = store.getById(value);
			if (record) {
				return record.get(displayField);
			}
			return '';
		};
		me.callParent();
	}
});

