/**
 * 
 */
Ext.define('qqext.view.reg.VInboxDoc', {
	extend : 'Ext.form.Panel',
	disabledCls:'',
	maskOnDisable:false,
	title : 'Входящий документ',
	initComponent : function() {
		var me = this;
		var fields = new Array();
		var litera, fieldCont, num1, num2, regDate, deliveryType, execOrg, registrator;

		litera = Ext.create('Ext.form.field.ComboBox', {
					fieldLabel : 'Литера',
					width : 190,
					name:'litera',
					store:'literas',
					displayField:'name',
					valueField:'id'
				});
		num1 = Ext.create('Ext.form.field.Text', {
					fieldLabel : '№ Входящего документа',
					labelAlign : 'right',
					labelWidth : 200,
					name:'inboxNum',
					width : 245
				});

		num2 = Ext.create('Ext.form.field.Text', {
					fieldLabel : '/',
					labelWidth : 5,
					width : 50
				});

		fields[fields.length] = fieldCont = Ext.create(
				'Ext.form.FieldContainer', {
					layout : 'hbox',
					items : [litera, num1, num2]
				});

		fields[fields.length] = regDate = Ext.create('Ext.form.field.Date', {
					fieldLabel : 'Дата регистрации',
					name:'regDate'
				});

		
		fields[fields.length] = deliveryType = Ext.create('Ext.form.field.ComboBox', {
								fieldLabel : 'Способ передачи',
								name:'transferType',
								displayField : 'name',
								valueField : 'id',
								store : Ext
										.getStore('inboxDocDeliveryType')
							});



		fields[fields.length] = execOrg = Ext.create('Ext.form.field.ComboBox',
				{
					fieldLabel : 'Исполняющая организация',
					displayField : 'name',
					name:'execOrg',
					valueField : 'id',
					store : Ext.getStore('inboxDocExecOrg')
				});

		fields[fields.length] = registrator = Ext.create('Ext.form.field.Text',
				{
					fieldLabel : 'ФИО регистратора',
					disabled:true,
					name:'registrator',
					value : 'Только для чтения',
					setDisabled:function(){
						return this;
					}
				});

		Ext.applyIf(me, {
					items : fields
				});
		me.callParent(arguments);
	}
});