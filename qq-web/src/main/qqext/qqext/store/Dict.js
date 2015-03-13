/** 
 * Хранилище для комбобоксов.
 * Приходится для каждой модели создавать новый класс хранилища,
 * почему-то сенча иницилизирует всех наследников хранилища первой моделью,
 * с которой создается хранилище. Mixins тоже не помагают. На данный момент
 * единственный рабочий вариант: одно хранилище - одна модель.
 */
Ext.define('qqext.store.Dict', {
	extend: 'Ext.data.Store',
	model: 'qqext.model.Dict',
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


