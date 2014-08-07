/**
 * 
 */
Ext.define('qqext.view.reg.VApplicant', {
	extend : 'Ext.form.Panel',
	title : 'Заявитель',
	disabledCls : '',
	layout : 'vbox',
	curCode : null,
	initComponent : function() {
		var me = this;
		var fields = new Array();
		me.fioItems = new Array();
		fields[fields.length] = me['type'] = Ext.create(
				'Ext.form.field.ComboBox', {
					fieldLabel : 'Тип заявителя',
					name : 'applicantType',
					store : Ext.getStore('applicantType'),
					displayField : 'name',
					valueField : 'id',
					listeners : {
						select : function(combo, selected) {
							var code = selected[0].data.code;
							switch (selected[0].data.code) {
								case 'Q_VALUE_APP_TYPE_FFACE' :
									if (me.curCode == 'Q_VALUE_APP_TYPE_JURFACE') {
										me.remove(me['org'], false);
									}
									if (!me.curCode
											|| me.curCode == 'Q_VALUE_APP_TYPE_JURFACE') {
										me.insert(1, me['surname']);
										me.insert(2, me['name']);
										me.insert(3, me['fatherName']);
									}
									break;
								case 'Q_VALUE_APP_TYPE_JURFACE' :
									if (me.curCode == 'Q_VALUE_APP_TYPE_FFACE') {
										me.remove(me['surname'], false);
										me.remove(me['name'], false);
										me.remove(me['fatherName'], false);
									}
									if (!me.curCode
											|| me.curCode == 'Q_VALUE_APP_TYPE_FFACE') {
										me.insert(1, me['org']);
									}
									break;
								default :
									throw 'Неизвестный код значения справочника: '
											+ code;
									break;
							}
							me.curCode = code;
						}
					}
				});

		me['surname'] = Ext.create('Ext.form.field.Text', {
					name : 'surname',
					fieldLabel : 'Фамилия'
				});

		me['name'] = Ext.create('Ext.form.field.Text', {
					name : 'name',
					fieldLabel : 'Имя'
				});

		me['fatherName'] = Ext.create('Ext.form.field.Text', {
					name : 'fatherName',
					fieldLabel : 'Отчество'
				});

		me['org'] = Ext.create('Ext.form.field.TextArea', {
					name : 'applicantObject'
				});
		me['org'].setFieldLabel('Организация');

		fields[fields.length] = me['category'] = Ext.create(
				'Ext.form.field.ComboBox', {
					name : 'applicantCategory',
					store : Ext.getStore('applicantCategory'),
					displayField : 'name',
					valueField : 'id'
				});
		me['category'].setFieldLabel('Категория заявителя');

		fields[fields.length] = me['country'] = Ext.create(
				'Ext.form.field.Text', {
					name : 'country',
					fieldLabel : 'Страна'
				});
		fields[fields.length] = me['address'] = Ext.create(
				'Ext.form.field.Text', {
					name : 'address',
					fieldLabel : 'Адрес'
				});
		fields[fields.length] = me['phone'] = Ext.create('Ext.form.field.Text',
				{
					name : 'phone',
					fieldLabel : 'Телефон'
				});

		fields[fields.length] = me['fs'] = Ext.create('Ext.form.FieldSet', {
					title : 'Дополнительные сведения',
					collapsible : true,
					items : [Ext.create('Ext.form.field.Text', {
										fieldLabel : '№ входящего документа',
										name : 'inboxDocNum',
										width : 200
									}), Ext.create('Ext.form.field.Date', {
										name : 'inboxDocDate',
										fieldLabel : 'Дата',
										width : 200
									}), Ext.create('Ext.form.field.Text', {
										fieldLabel : 'ФИО юр. лица (кто подписал)',
										name : 'nameOfJurPerson',
										width : 300
									}), Ext.create('Ext.form.field.Text', {
										fieldLabel : 'Приложения',
										name : 'addendum',
										width : 350
									})]

				});

		Ext.applyIf(me, {
					items : fields
				});
		me.callParent(arguments);
	}
});