/** 
 * Хранилище для комбобоксов
 */
Ext.define('qqext.store.Dict', {
	extend: 'Ext.data.Store',
	model: 'qqext.model.Dict',
	alias: 'StoreDict',
	requires: ['qqext.proxy.Combo'],
	proxy: {
		type: 'combo',
		reader: 'json'
	},
	/**
	 * Конструктор
	 * @param {String} urlId путь для получения данных / идентификатор хранилища
	 */
	constructor: function(urlId) {
		this.storeId = urlId;
		this.callParent();
		this.getProxy().setUrl('api/dict/' + urlId);
	}
});


