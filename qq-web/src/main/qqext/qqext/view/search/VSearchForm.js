/**
 *  Форма поиска
 */

Ext.define('qqext.view.search.VSearchForm', {
	alias: 'VSearchForm',
	extend: 'Ext.container.Container',
	cls: 'srch',
	requires: [
		'qqext.view.search.VSearchParams',
		'qqext.view.search.VSearchResult'
	],
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 1,
	id: 'VSearchForm',
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.Menu.editMenu.items.getAt(0).items.getAt(1).show();
			ns.Menu.editMenu.items.getAt(0).items.getAt(2).show();
			ns.switchArticleButton(ns.getButton(ns.btns.search));
			ns.updateInfo();
		}
	},
	initComponent: function () {
		var me = this,
				onlyExecutor,
				ns = qqext,
				create = Ext.create;
		me._fltrs = []; // Фильтры для поиска
		Ext.applyIf(me, {
			items: [
				me._form = create('VSearchParams'),
				me._grid = create('VSearchResult')
			]
		});
		me.callParent();
		// Флаг определяющий был ли произведен поиск.
		// когда поменялась информация по какому-нибудь запросу
		// если этот флаг установлен, т.е. был поиск, то следует обновить 
		// результаты поиска иначе ничего не делать
		me._inSearch = false;

		// Если пользователь чистый исполнитель, то выводим запросы только назначеные ему
		if (onlyExecutor = (ns.exec && !ns.coor && !ns.reg)) {
			me._fltrs.push(create('Ext.util.Filter', {
				property: 'executor',
				value: ns.userId
			}));
		}

		me.store = me._grid.store;
		me.store.addFilter(me._fltrs, false);
	},
	// Обновляет результаты поиска
	reload: function () {
		if (this._inSearch)
			this._grid.store.reload();
	},
	/**
	 * Очищает все поля формы
	 * и результаты поиска. Приводит форму в первоначальное состояние.
	 */
	reset: function () {
		var me = this;
		me._inSearch = false;
		me.store.removeAll();
		me.store.sorters.clear();
		me._form.getForm().reset();
		me._grid.dockedItems.getAt(2).onLoad();
	},
	/**
	 * Запускает поиск по параметрам первого элемента контейнера.
	 * Вызывается по кнопке "Поиск".
	 * Загружает первую страницу.
	 */
	exec: function () {
		var me = this,
				store = me.store,
				values = me._form.getValues(false, true),
				filters = [];
		me._inSearch = true;
		// Устанавливаем критерии поиска
		for (var o in values) {
			filters.push(Ext.create('Ext.util.Filter', {
				property: o,
				value: values[o]
			}));
		}
		store.filters.clear();
		filters = filters.concat(me._fltrs);
		store.addFilter(filters, false);
		store.loadPage(1);
	}
});
