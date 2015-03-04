/** 
 * Общие настройки хранилища ЖВК
 */
Ext.define('qqext.store.Jvk', {
	requires: ['qqext.proxy.Table'],
	extend: 'Ext.data.Store',
	pageSize: 25,
	remoteSort: true,
	remoteFilter: true
});

