Ext.define('hawk_common.cmp.PLoginForm', {
	extend : 'Ext.form.Panel',
	xtype: 'loginform',
	height : 140,
	width : 300,
	url : 'api/Auth',
	buttonAlign : 'center',
	initComponent : function() {
		var me = this;
		this.title = 'Введите учетные данные';
		var iitems = [{
					name : 'login',
					xtype : 'textfield',
					margin : '20px 0 5px 20px',
					fieldLabel : 'Логин',
					labelSeparator:'',
					allowBlank : false,
					labelAlign : 'left'
				}, {
					xtype : 'textfield',
					name : 'pass',
					labelSeparator:'',
					inputType : 'password',
					fieldLabel : 'Пароль',
					margin : '5px 0 0 20px',
					allowBlank : false,
					labelAlign : 'left',
					enableKeyEvents: true,
					listeners:
						{
							specialkey: function(field, e)
							{
								if (e.getKey() == e.ENTER)
								{
									var btn = Ext.ComponentQuery.query('button', field.up('form'))[0];
									btn.handler();
								}
							}
						}
				}];
		var bbuttons = [{
			text : 'Вход',
			margin : '5px 0 10px 0',
			handler : function() {
				var form = this.up('form').getForm();
				if (form.isValid()) {
					form.submit({
								params : {
									action : 'login'
								},
								success : function(form, action) {
									var isSuccess = action.result.success;
									if (isSuccess) {
										// redirect to system	
										//Ext.util.Cookies.set('userName',action.result.msg);
										me.fireEvent('auth', action.result);
										window.location = "system.html";
									} else {
										Ext.Msg.alert('Success',
												action.result.msg);
									}
								},
								failure : function(form, action) {
									var msg = '';
									if (action.result){
										msg = action.result.msg;
									}else{
										msg = action.response.responseText;
									}
									Ext.Msg.show(
											{
												title: 'Ошибка',
												msg: msg,
												buttons: Ext.Msg.OK,
												icon: Ext.Msg.ERROR
											});
								}
							});
				}
			}
		}];
		Ext.applyIf(me, {
					items : iitems,
					buttons : bbuttons
				});
		me.callParent(arguments);
	}
});