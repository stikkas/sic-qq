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
	 * @param {Ext.data.Store} store хранилище нужно брать из зпароса,
	 * чтобы автоматом прописывался id запроса
	 * @param {Ext.data.Model} model модель для использования в хранилище сетки
	 * @param {Object[]} columns колонки для сетки, см. Ext.grid.Panel
	 * @param {Boolean} viewonly только для чтения
	 */
	constructor: function(store, model, columns, viewonly) {
		var me = this,
				createCmp = Ext.create;
		me.store = store;
		if (!viewonly) {
			me.plugins = 'cellediting';
			me.dockedItems = [
				createCmp('Ext.container.Container', {
					layout: 'hbox',
					items: [createCmp('FHandlerButton', 'Добавить', function() {
							store.add(createCmp(model));
						}),
						createCmp('FHandlerButton', 'Удалить', function() {
							var sm = me.getSelectionModel();
							if (sm.hasSelection()) {
								store.remove(sm.getSelection());
							}
						})
					]
				})];
		}
		me.columns = columns;
		me.callParent();
		me.getSelectionModel().setSelectionMode('MULTI');
	}
});


