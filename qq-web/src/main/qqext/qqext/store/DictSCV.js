/** 
 * Хранилище с моделью DictSCV
 */
Ext.define('qqext.store.DictSCV', {
	extend: 'Ext.data.Store',
	model: 'qqext.model.DictSCV',
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
