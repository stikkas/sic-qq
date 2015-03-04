/** 
 * Хранилище для ЖВК СИЦ
 */
Ext.define('qqext.store.SicJvk', {
	extend: 'qqext.store.Jvk',
	model: 'qqext.model.SicJvk',
	proxy: {
		type: 'table',
		url: 'api/jvk/sic'
	}
});