/** 
 * Хранилище для комбобоксов
 */
Ext.define('qqext.store.Dict', {
	extend: 'Ext.data.Store',
	model: 'qqext.model.Dict',
	alias: 'StoreDict',
	requires: ['qqext.proxy.Combo'],
	autoLoad: true,
	proxy: {
		type: 'combo',
		reader: 'json'
	},
	/**
	 * Конструктор
	 * @param {String} urlId путь для получения данных / идентификатор хранилища
	 * @param {Object} conf дополнительные параметры
	 */
	constructor: function (urlId, conf) {
		if (conf instanceof Object)
			for (var o in conf)
				this[o] = conf[o];

		this.storeId = urlId;
		this.proxy.url = 'rest/dict/' + urlId;
		this.callParent();
	}
});


