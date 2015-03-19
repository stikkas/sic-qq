/**
 * Форма для заполнения данных по заявителю
 */
Ext.define('qqext.view.reg.VApplicant', {
	alias: 'VApplicant',
	extend: 'qqext.view.StyledPanel',
	fieldDefaults: {
		validateOnChange: false,
		blankText: 'Обязательно для заполнения'
	},
	requires: [
		'qqext.factory.TextField',
		'qqext.factory.TextArea',
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.cmp.FieldSet'
	],
	title: 'Заявитель',
	disabledCls: '',
	layout: 'vbox',
	curCode: null,
	/**
	 * @property {qqext.cmp.FieldSet} _adds поля для "Дополнительные сведения"
	 */
	initComponent: function () {
		var
				me = this,
				ns = qqext,
				createCmp = Ext.create,
				surname, name, fatherName, appCat, org,
				allusers, fisic, uric,
				typef = 'Q_VALUE_APP_TYPE_FFACE';
		Ext.applyIf(me, {
			items: [
				me.appType = createCmp('FComboBox', 'Тип заявителя', ns.stIds.apltype, 'applType', {
					allowBlank: false,
					width: 320,
					labelWidth: 150,
					listeners: {
						change: function (cb, newv) {
							if (newv)
								switchTypeUser(cb.getStore().getById(newv).get('shortValue'));
							else {
								allusers.forEach(function (v) {
									v.hide();
								});
							}
						}
					}
				}),
				surname = createCmp('FTextField', 'Фамилия', 'lName', {
					hidden: true, labelWidth: 150
				}),
				name = createCmp('FTextField', 'Имя', 'fName', {
					hidden: true, labelWidth: 150
				}),
				fatherName = createCmp('FTextField', 'Отчество', 'mName', {
					hidden: true, labelWidth: 150
				}),
				org = createCmp('FTextArea', 'Организация', 'orgName',
						{width: 950, labelWidth: 150, hidden: true}),
				appCat = createCmp('FComboBox', 'Категория заявителя',
						ns.stIds.aplcat, 'applCat', {
							hidden: true,
							width: 410,
							labelWidth: 150
						}),
				createCmp('FTextField', 'Страна', 'country', {
					allowBlank: false,
					width: 350,
					labelWidth: 150
				}),
				createCmp('FTextField', 'Адрес', 'adres', {
					width: 950, labelWidth: 150}),
				createCmp('FTextField', 'Телефон', 'phone', {
					width: 500,
					labelWidth: 150}),
				me._adds = createCmp('FieldSet', {
					title: 'Дополнительные сведения',
					collapsible: true,
					cls: 'collapse_section',
					hidden: true,
					width: 900,
					collapsed: true,
					items: [
						createCmp('FTextField', '№ исходящего документа', 'issueDocNum', {
							width: 500, labelWidth: 150
						}),
						me.dt = createCmp('FDateField', 'Дата', 'issueDocDate', {
							width: 270, labelWidth: 150
						}),
						createCmp('FTextField', 'ФИО юр. лица (кто подписал)', 'issueDocFio', {
							width: 350,
							labelWidth: 150
						}),
						createCmp('FTextField', 'Приложения', 'apps', {
							width: 500, labelWidth: 150
						})
					]
				})
			]
		});

		allusers = [surname, name, fatherName, org, appCat, me._adds];
		uric = [org, appCat];
		fisic = [surname, name, fatherName];
		// Переключает тип пользователя
		function switchTypeUser(type) {
			if (typef === type) { // Выбрано физическое лицо
				fisic.forEach(function (v) {
					v.show();
					if (v !== fatherName)
						v.setRequired(true);
				});
				uric.forEach(function (u) {
					u.hide();
					u.setValue();
					u.setRequired(false);
				});
				me._adds.hide();
				me._adds.setValue('');
			} else {  // Выбрано юридическое лицо
				fisic.forEach(function (v) {
					v.hide();
					v.setValue('');
					v.setRequired(false);
				});
				uric.forEach(function (u) {
					u.show();
					u.setRequired(true);
				});
				me._adds.show().collapse();
			}
		}
		me.callParent();
	}
});

