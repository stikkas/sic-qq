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
		'hawk_common.model.User',
		'hawk_common.store.UserLocalStorage',
		'qqext.view.Viewport'
	],
	controllers: ['qqext.controller.Main'],
	launch: function() {

		// Временно для отладки. В рабочей версии убрать
		var user = Ext.create('hawk_common.model.User'),
				userStore = qqext.Constants.userStore = Ext.create('hawk_common.store.UserLocalStorage');

		user.set('id', 'current');
		user.set('name', 'fake');
		user.set('access', 'allowall');
		userStore.add(user);
		userStore.sync();
		Ext.create('qqext.view.Viewport', {});
		return;
		//-------------------------
		Ext.Ajax.request({
			url: '/qq-web/Rules',
			success: function(response) {
				var authRes = Ext.decode(response.responseText),
						user = Ext.create('hawk_common.model.User'),
						userStore = qqext.Constants.userStore = Ext.create('hawk_common.store.UserLocalStorage');

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

