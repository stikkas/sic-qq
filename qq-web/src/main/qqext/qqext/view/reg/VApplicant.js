/**
 * Форма для заполнения данных по заявителю
 */
Ext.define('qqext.view.reg.VApplicant', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.TextField',
		'qqext.factory.TextArea',
		'qqext.factory.ComboBox',
		'hawk_common.fix.FixedFieldSet',
		'qqext.factory.DateField'
	],
	title: 'Заявитель',
	disabledCls: '',
	layout: 'vbox',
	curCode: null,
	initComponent: function() {
		var
				me = this,
				factory = qqext.factory,
				TextField = factory.TextField,
				ComboBox = factory.ComboBox,
				surname = new TextField('Фамилия', 'surname'),
				name = new TextField('Имя', 'name'),
				fatherName = new TextField('Отчество', 'fatherName'),
				org = new factory.TextArea('Организация', 'applicantObject');

		Ext.applyIf(me, {
			items: [
				new ComboBox('Тип заявителя', Ext.getStore('applicantType'), 'applicantType').cfg({
					listeners: {
						select: function(cb, selected) {
							var code = selected[0].data.code;
							switch (selected[0].data.code) {
								case 'Q_VALUE_APP_TYPE_FFACE' :
									if (me.curCode === 'Q_VALUE_APP_TYPE_JURFACE') {
										me.remove(org, false);
									}
									if (!me.curCode || me.curCode === 'Q_VALUE_APP_TYPE_JURFACE') {
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
				new ComboBox('Категория заявителя', Ext.getStore('applicantCategory'), 'applicantCategory'),
				new TextField('Страна', 'country'),
				new TextField('Адрес', 'address'),
				new TextField('Телефон', 'phone'),
				Ext.create('Ext.form.FieldSet', {
					title: 'Дополнительные сведения',
					collapsible: true,
					items: [
						new TextField('№ входящего документа', 'inboxDocNum').cfg({
							width: 200
						}),
						new factory.DateField('Дата', 'inboxDocDate').cfg({
							width: 200
						}),
						new TextField('ФИО юр. лица (кто подписал)', 'nameOfJurPerson').cfg({
							width: 300
						}),
						new TextField('Приложения', 'addendum').cfg({
							width: 350
						})
					]
				})
			]
		});
		me.callParent(arguments);
	}
});
