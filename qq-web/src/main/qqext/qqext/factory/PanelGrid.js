/**
 * Используется для создания табличных данных в закладке "Исполнение запроса".
 * А именно: Выдача документов, Используемы материалы, Согласование документа,
 * Способ отправки
 */

Ext.define('qqext.factory.PanelGrid', {
	extend: 'Ext.grid.Panel',
	requires: [
		'Ext.grid.plugin.CellEditing',
		'Ext.data.proxy.Rest',
		'Ext.container.Container',
		'qqext.factory.HandlerButton'
	],
	alias: 'FPanelGrid',
	maxHeight: 200,
	overflowY: 'auto',
	/**
	 * Создает таблицу
	 * @param {Ext.data.Model} model модель для использования в хранилище сетки
	 * @param {Object[]} columns колонки для сетки, см. Ext.grid.Panel
	 */
	constructor: function(model, columns) {
		var me = this,
				createCmp = Ext.create;
		me.plugins = 'cellediting';
		me.dockedItems = [
			createCmp('Ext.container.Container', {
				layout: 'hbox',
				items: [createCmp('FHandlerButton', 'Добавить', function() {
						me.getStore().add(createCmp(model));
					}),
					createCmp('FHandlerButton', 'Удалить', function() {
						var sm = me.getSelectionModel();
						if (sm.hasSelection())
							me.getStore().remove(sm.getSelection());
					})
				]
			})];
		me.columns = columns;
		me.callParent();
		me.getSelectionModel().setSelectionMode('MULTI');
	},
	/**
	 * Обработчик события beforeedit в режиме просмотра
	 * @returns {Boolean} false - запретить редактирование
	 */
	_bh: function() {
		return false;
	},
	setViewOnly: function(state) {
		var me = this;
		// 0 - заголовки таблицы, 1 - контейнер с кнопками
		me.dockedItems.getAt(1).setDisabled(state);
		if (state)
			me.on('beforeedit', me._bh);
		else
			me.removeListener('beforeedit', me._bh);
	}
});


