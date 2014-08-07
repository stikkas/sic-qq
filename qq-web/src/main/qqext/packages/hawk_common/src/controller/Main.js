Ext.define('hawk_common.controller.Main', {
    extend: 'Ext.app.Controller',
    refs:
    	[
    	 {
    		 ref: 'userLabel',
    		 selector: '#userLabel'
    	 }
    	],
    ajaxException: function(response)
    {
    	//В случае исключения при сабмите формы поле response.status почему-то пустое
    	//Из-за этого приходится определять соответствие статусу таким вот кривым образом
    	var checkStatus = function(status)
    	{
    		if (response.status)
    			return response.status == status;
    		else
    			return response.responseText.indexOf(status) >= 0;
    	};
		
		if (checkStatus(500))
			Ext.Msg.show(
					{
						title: 'Ошибка',
						msg: 'С сервера пришла следующая ошибка:<br><br>' + response.responseText,
						buttons: Ext.Msg.OK,
						icon: Ext.Msg.ERROR,
						cls:'err_msg',
						maxWidth: 1000
					});
    },
    init:function()
    {
    	var me = this;
    	Ext.util.Observable.observe(Ext.data.Connection,
    			{
    				requestexception: function(conn, resp)
    				{
    					me.ajaxException(resp);
    				}
    			});
    	Ext.util.Observable.observe(Ext.form.Basic,
    			{
    				actionfailed: function(form, action)
    				{
    					me.ajaxException(action.response);
    				}
    			});
    	this.control(
    			{
    				'loginform':
    					{
    						auth: this.setUser
    					},
    				'#quit':
    					{
    						click: this.quit
    					}
    		   	});
    },
    //Если нужно использовать cookie вместо localStorage, достаточно изменить код
    //сохранения и загрузки модели в функциях setUser, getUser, cleanUser
    setUser: function(authRes)
    {
    	var user = Ext.create('hawk_common.model.User');
    	user.set('id', 'current');
    	user.set('userId', authRes.userId);
    	user.set('name', authRes.msg);
    	user.set('access', authRes.access);
    	
    	var userStore = Ext.create('hawk_common.store.UserLocalStorage');
    	userStore.add(user);
    	userStore.sync();
    },
    getUser: function()
    {
    	var userStore = Ext.create('hawk_common.store.UserLocalStorage');
    	userStore.load();
    	return userStore.getById('current');
    },
    cleanUser: function()
    {
    	var userStore = Ext.create('hawk_common.store.UserLocalStorage');
    	userStore.load();
    	userStore.removeAll();
    	userStore.sync();
    },
    quit : function() {
    	var me = this;
		Ext.Ajax.request({
					url : '../ramlogin/Auth',
					method : 'POST',
					params : {
						action : 'logout'
					},
					success : function(response) {
						var responseValue = Ext.decode(response.responseText);
						if (responseValue.success) {
							me.cleanUser();
							window.location = "../ramlogin/";
						} else {
							Ext.Msg.alert('Ошибка', responseValue.responseText);
						}
					},
					failure : function(response) {
						Ext.Msg.alert('Ошибка',response.responseText);
					}
				});
	},
	getAccessRules: function()
	{
		var user = this.getUser();
		if (!user)
			return null;
		
		var access = {};
		var accessRaw = user.get('access');
		for (ind in accessRaw)
			access[accessRaw[ind].toLowerCase()] = true;
		return access;
	}
});
