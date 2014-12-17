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
		var me = this;
		Ext.applyIf(me, {
			items: [
				me._form = Ext.create('VSearchParams'),
				me._grid = Ext.create('VSearchResult')
			]
		});
		me.callParent();
		if (!qqext.isSIC) {
			var combo = me._cmb = me._form.items.getAt(0);
			combo.setValue(me._org = qqext.user.get('organization'));
			combo.hide();
		}
	},
	/**
	 * Очищает все поля формы
	 * и результаты поиска. Приводит форму в первоначальное состояние.
	 */
	reset: function () {
//		Ext.getStore('searchResults').loadData([], false);
		var me = this;
		me._grid.store.removeAll();
		me._form.getForm().reset();
		if (!qqext.isSIC)
			me._cmb.setValue(me._org);
		me._grid.dockedItems.getAt(2).onLoad();
	},
	/**
	 * Запускает поиск по параметрам первого элемента контейнера
	 * 'searchResult' store связан с сеткой для поиска {@link #qqext.view.search.VSearchResult},
	 * так что при обновлении данных в хранилище (по вызову load) будут обновляться данные и
	 * в сетке.
	 */
	exec: function () {
		var values = this._form.getValues(false, true),
				ns = qqext,
				user = ns.user,
				rules = ns.rules;
//		if (ns.isSIC)
//			values.litera = ns.user.get('organization');

		if (user.isAllowed(rules.exec) && !user.isAllowed(rules.crd)
				&& !user.isAllowed(rules.reg))
			values.executor = user.get('userId');

		Ext.getStore('searchResults').loadPage(1, {
			params: {q: Ext.encode(values)}
		});
	}
});
