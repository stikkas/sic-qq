/**
 * Используется для создания табличных данных в закладке "Исполнение запроса".
 * А именно: Выдача документов, Используемы материалы, Согласование документа,
 * Способ отправки.
 * Имеет возможность проверки себя на валидность. Проверка проводится по модели.
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
        width:650,
        cls:'tbl_cls',
	overflowY: 'auto',
	/**
	 * Возвращает ошибки, которые записываются в _errors
	 * @returns {String} описание ошибок
	 */
	getErrors: function () {
		if (this._errors.length)
			return "<p>" + this._errors.join('<br>') + "</p>";
		return '';
	},
	/**
	 * Проверяет правильность заполнения формы
	 * @returns {Boolean} если ошибок нет то true
	 */
	isValid: function () {
		var errors = this._errors = [];
		this.getStore().data.each(function (item) {
			item.validate().each(function (it) {
				errors.push(it.message);
			});
		});
		return !errors.length;
	},
	/**
	 * Создает таблицу
	 * @param {Ext.data.Model} model модель для использования в хранилище сетки
	 * @param {Object[]} columns колонки для сетки, см. Ext.grid.Panel
	 */
	constructor: function (model, columns) {
		var me = this,
				createCmp = Ext.create;
		me.plugins = [{ptype: 'cellediting', clicksToEdit: 1}];
//		me.plugins = 'cellediting';
		me.dockedItems = [
			createCmp('Ext.container.Container', {
				layout: 'hbox',
				items: [createCmp('FHandlerButton', 'Добавить', function () {
						me.getStore().add(createCmp(model));
//						me.getSelectionModel().select(record).fireEvent('click');
//						var editor = me.getEditor(record);
//						editor.startedit(record, 0);
					},
							{cls: 'add_small_btn'}),
					createCmp('FHandlerButton', 'Удалить', function () {
						var sm = me.getSelectionModel();
						if (sm.hasSelection())
							me.getStore().remove(sm.getSelection());
					},
							{cls: 'del_small_btn'})
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
	_bh: function () {
		return false;
	},
	setViewOnly: function (state) {
		var me = this;
		// 0 - заголовки таблицы, 1 - контейнер с кнопками
		me.dockedItems.getAt(1).setDisabled(state);
		if (state)
			me.on('beforeedit', me._bh);
		else
			me.removeListener('beforeedit', me._bh);
	}
});


