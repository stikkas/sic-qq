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
	 * @private
	 */
	initComponent: function () {
		var
				me = this,
				ns = qqext,
				applicant = ns.applicant,
				createCmp = Ext.create,
				surname, name, fatherName, appCat, org,
				allusers, fisic, uric,
				typef = 'Q_VALUE_APP_TYPE_FFACE';
		Ext.applyIf(me, {
			items: [
				me.appType = createCmp('FComboBox', applicant.applicantType[1],
						ns.stIds.apltype, applicant.applicantType[0], {
					allowBlank: false,
					width: 450,
					labelWidth: 150,
					listeners: {
						change: function (cb, newv) {
							if (newv)
								switchTypeUser(cb.getStore().getById(newv).get('code'));
							else {
								allusers.forEach(function (v) {
									v.hide();
								});
							}
						}
					}
				}),
				surname = createCmp('FTextField', applicant.lastName[1], applicant.lastName[0], {
					hidden: true, labelWidth: 150
				}),
				name = createCmp('FTextField', applicant.firstName[1], applicant.firstName[0], {
					hidden: true, labelWidth: 150
				}),
				fatherName = createCmp('FTextField', applicant.middleName[1], applicant.middleName[0], {
					hidden: true, labelWidth: 150
				}),
				org = createCmp('FTextArea', applicant.organization[1], applicant.organization[0],
						{width: 950, labelWidth: 150, hidden: true}),
				appCat = createCmp('FComboBox', applicant.applicantCategory[1],
						ns.stIds.aplcat, applicant.applicantCategory[0], {
					hidden: true,
					width: 410,
					labelWidth: 150
				}),
				createCmp('FTextField', applicant.country[1], applicant.country[0], {
					allowBlank: false,
					width: 350,
					labelWidth: 150
				}),
				createCmp('FTextField', applicant.address[1], applicant.address[0], {
					width: 950, labelWidth: 150}),
				createCmp('FTextField', applicant.phone[1], applicant.phone[0], {
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
						createCmp('FTextField', applicant.issueDocNum[1], applicant.issueDocNum[0], {
							width: 500, labelWidth: 150
						}),
						me.dt = createCmp('FDateField', applicant.issueDocDate[1], applicant.issueDocDate[0], {
							width: 270, labelWidth: 150
						}),
						createCmp('FTextField', applicant.fioJurPerson[1], applicant.fioJurPerson[0], {
							width: 350,
							labelWidth: 150
						}),
						createCmp('FTextField', applicant.appends[1], applicant.appends[0], {
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

