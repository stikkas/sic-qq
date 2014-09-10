/**
 *  Форма поиска
 */

Ext.define('qqext.view.search.VSearchForm', {
	alias: 'VSearchForm',
	extend: 'Ext.container.Container',
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
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				me._form = Ext.create('VSearchParams'),
				Ext.create('VSearchResult')
			]
		});
		me.callParent(arguments);
	},
	/**
	 * Очищает все поля формы
	 * и результаты поиска. Приводит форму в первоначальное состояние.
	 */
	reset: function() {
		Ext.getStore('searchResults').removeAll();
		this._form.getForm().reset();
	},
	/**
	 * Запускает поиск по параметрам первого элемента контейнера
	 * 'searchResult' store связан с сеткой для поиска {@link #qqext.view.search.VSearchResult},
	 * так что при обновлении данных в хранилище (по вызову load) будут обновляться данные и
	 * в сетке.
	 */
	exec: function() {
		Ext.getStore('searchResults').load({
			params: {q: Ext.encode(this._form.getValues(false, true))}
		});
	}
});
