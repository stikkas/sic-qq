
Ext.application({
	name: 'qqlogin',
	autoCreateViewport: false,
	launch: function() {
		Ext.Ajax.request({
			url: 'Rules',
			success: function(response) {
				var authRes = Ext.decode(response.responseText),
						user = Ext.create('qqlogin.model.User'),
						userStore = Ext.create('qqlogin.store.UserLocalStorage');

				user.set('id', 'current');
				user.set('name', authRes.msg);
				user.set('access', authRes.access);
				userStore.add(user);
				userStore.sync();

			},
			failure: function() {
				console.log(arguments);
			}
		});

	}
});
