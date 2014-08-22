/**
 * Форма для заполнения данных по заявителю
 */
Ext.define('qqext.view.reg.VApplicant', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'Ext.form.field.Text',
		'Ext.form.field.TextArea',
		'Ext.form.field.ComboBox',
		'Ext.form.FieldSet',
		'Ext.form.field.Date'
	],
	title: 'Заявитель',
	disabledCls: '',
	layout: 'vbox',
	curCode: null,
	initComponent: function() {
		var
				me = this,
				surname = Ext.create('Ext.form.field.Text', {
					name: 'surname',
					fieldLabel: 'Фамилия'
				}),
				name = Ext.create('Ext.form.field.Text', {
					name: 'name',
					fieldLabel: 'Имя'
				}),
				fatherName = Ext.create('Ext.form.field.Text', {
					name: 'fatherName',
					fieldLabel: 'Отчество'
				}),
				org = Ext.create('Ext.form.field.TextArea', {
					name: 'applicantObject',
					fieldLabel: 'Организация'
				});

		Ext.applyIf(me, {
			items: [
				Ext.create('Ext.form.field.ComboBox', {
					fieldLabel: 'Тип заявителя',
					name: 'applicantType',
					store: Ext.getStore('applicantType'),
					displayField: 'name',
					valueField: 'id',
					listeners: {
						select: function(combo, selected) {
							var code = selected[0].data.code;
							switch (selected[0].data.code) {
								case 'Q_VALUE_APP_TYPE_FFACE' :
									if (me.curCode === 'Q_VALUE_APP_TYPE_JURFACE') {
										me.remove(org, false);
									}
									if (!me.curCode ||
											me.curCode === 'Q_VALUE_APP_TYPE_JURFACE') {
										me.insert(1, surname);
										me.insert(2, name);
										me.insert(3, fatherName);
									}
									break;
								case 'Q_VALUE_APP_TYPE_JURFACE' :
									if (me.curCode === 'Q_VALUE_APP_TYPE_FFACE') {
										me.remove(surname, false);
										me.remove(name, false);
										me.remove(fatherName, false);
									}
									if (!me.curCode
											|| me.curCode === 'Q_VALUE_APP_TYPE_FFACE') {
										me.insert(1, org);
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
				}),
				Ext.create('Ext.form.field.ComboBox', {
					name: 'applicantCategory',
					store: Ext.getStore('applicantCategory'),
					displayField: 'name',
					valueField: 'id',
					fieldLabel: 'Категория заявителя'
				}),
				Ext.create('Ext.form.field.Text', {
					name: 'country',
					fieldLabel: 'Страна'
				}),
				Ext.create('Ext.form.field.Text', {
					name: 'address',
					fieldLabel: 'Адрес'
				}),
				Ext.create('Ext.form.field.Text', {
					name: 'phone',
					fieldLabel: 'Телефон'
				}),
				Ext.create('Ext.form.FieldSet', {
					title: 'Дополнительные сведения',
					collapsible: true,
					items: [
						Ext.create('Ext.form.field.Text', {
							fieldLabel: '№ входящего документа',
							name: 'inboxDocNum',
							width: 200
						}), Ext.create('Ext.form.field.Date', {
							name: 'inboxDocDate',
							fieldLabel: 'Дата',
							width: 200
						}), Ext.create('Ext.form.field.Text', {
							fieldLabel: 'ФИО юр. лица (кто подписал)',
							name: 'nameOfJurPerson',
							width: 300
						}), Ext.create('Ext.form.field.Text', {
							fieldLabel: 'Приложения',
							name: 'addendum',
							width: 350
						})
					]
				})
			]
		});
		me.callParent(arguments);
	}
});