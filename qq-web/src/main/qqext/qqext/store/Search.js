/** 
 * Общие настройки хранилища Результатов поиска по критериям
 * Не используется наследование от Jvk, т.к. при этом происходит использование той модели
 * которая была первой создана. Одним словом косяк в ExtJS.
 */
Ext.define('qqext.store.Search', {
	requires: ['qqext.proxy.Table'],
	model: 'qqext.model.Search',
	extend: 'Ext.data.Store',
	pageSize: 12,
	remoteSort: true,
	remoteFilter: true,
	storeId: 'search',
	proxy: {
		type: 'table',
		url: 'rest/jvk/search'
	},
	singleton: true
});
