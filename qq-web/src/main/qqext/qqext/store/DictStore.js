/**
 * Store for dictionaries.
 */
Ext.define('qqext.store.DictStore', {
	alias: 'DictStore',
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Rest'
	],
	fields: ['id', 'name', 'code', 'shortValue'],
	autoLoad: true,
	/**
	 * Конструктор
	 * @param {String} storeId идентификатор хранлища
	 * @param {String} dict последняя часть адреса, по которому будет отправлен запрос серверу
	 * @param {Number} org идентификатор организации, которой будет ограничен запрос
	 * @param {Object} opts дополнительные настройки для Ext.data.Store
	 */
	constructor: function (storeId, dict, org, opts) {
		var me = this;
		me.storeId = storeId;
		me.proxy = {
			type: 'rest',
			url: '/qq-web/rest/dict/' + dict,
			reader: 'json',
			writer: 'json'
		};
		if (org) {
			if (org instanceof Object) {
				me.callParent([org]);
			} else {
				me.proxy.extraParams = {organization: org};
				if (opts)
					me.callParent([opts]);
				else
					me.callParent();
			}
		} else {
			me.callParent();
		}
	}
});
