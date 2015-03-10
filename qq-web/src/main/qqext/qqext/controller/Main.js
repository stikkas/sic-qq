/**
 * Основной контроллер нашего приложения.
 */
Ext.define('qqext.controller.Main', {
	extend: 'Ext.app.Controller',
	views: ['qqext.view.VTitleBar'],
	requires: [
		'qqext.model.SearchResultItem',
		'qqext.store.DictValuesStore',
		'qqext.store.CustomStore',
		'hawk_common.store.UserLocalStorage'
	],
	/**
	 * Активная модель, иницилизируется в {@link qqext.Menu} после создания.
	 * Функция вызывается при нажатии на кнопку 'Добавить' в верхнем меню.
	 */
	currentModel: null,
	searchParams: null,
	init: function () {
		var createCmp = Ext.create;

		createCmp('qqext.store.CustomStore', {
			storeId: 'searchResults',
			url: '/qq-web/api/Search',
			pageSize: 12,
			model: 'qqext.model.SearchResultItem',
			remoteSort: true
		});
	}
});
