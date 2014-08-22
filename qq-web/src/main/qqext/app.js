Ext.Loader.setConfig({
	enabled: true,
	paths: {qqext: 'qqext'}
});
/**
 * Стандартная точка входя для ExtJS приложения.
 * @param {Object} различные установки для приложения
 */
Ext.application({
	name: 'qqext',
	appFolder: 'qqext',
	autoCreateViewport: false,
	requires: [
		'Ext.layout.container.Card',
		'Ext.data.proxy.LocalStorage',
		'qqext.view.search.VSearchParams',
		'qqext.Menu',
		'qqext.view.VTitleBar',
		'qqext.view.VLeftMenu',
		'qqext.view.search.VSearchForm',
		'qqext.view.search.FioFieldContainer',
		'qqext.view.search.VSearchResult',
		'hawk_common.cmp.DateField',
		'qqext.store.DictValuesStore',
		'qqext.store.CustomStore',
		'qqext.view.Viewport',
		'qqext.view.search.VSearchForm',
		'hawk_common.fix.FixedTextField',
		'hawk_common.fix.FixedField',
		'hawk_common.fix.FixedFormPanel',
		'hawk_common.fix.FixedNumberField',
		'hawk_common.fix.FixedFieldContainer',
		'hawk_common.fix.FixedBaseField',
		'hawk_common.fix.FixedFieldSet',
		'hawk_common.fix.FixedDateField',
		'Ext.form.Label',
		'Ext.form.field.ComboBox',
		'Ext.layout.container.Border',
		'hawk_common.model.User',
		'hawk_common.store.UserLocalStorage'
	],
	controllers: ['qqext.controller.Main'],
	launch: function() {

		// Временно для отладки. В рабочей версии убрать
		Ext.create('qqext.view.Viewport', {});
		return;
		Ext.Ajax.request({
			url: '/qq-web/Rules',
			success: function(response) {
				var
						authRes = Ext.decode(response.responseText),
						user = Ext.create('hawk_common.model.User'),
						userStore = Ext.create('hawk_common.store.UserLocalStorage');

				user.set('id', 'current');
				user.set('name', authRes.msg);
				user.set('access', authRes.access);
				userStore.add(user);
				userStore.sync();

				Ext.create('qqext.view.Viewport', {});
			},
			failure: function(response) {
				Ext.Msg.show({
					title: 'Ошибка',
					msg: response.responseText,
					buttons: Ext.Msg.OK,
					icon: Ext.Msg.ERROR,
					cls: 'err_msg',
					maxWidth: 1000
				});
			}
		});
	}
});
