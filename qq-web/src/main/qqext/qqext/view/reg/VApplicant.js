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
	initComponent: function() {
		var
				me = this,
				ns = qqext,
				applicant = ns.applicant,
				createCmp = Ext.create,
				surname = createCmp('FTextField', applicant.lastName[1], applicant.lastName[0], {
					allowBlank: false
				}),
				name = createCmp('FTextField', applicant.firstName[1], applicant.firstName[0], {
					allowBlank: false
				}),
				fatherName = createCmp('FTextField', applicant.middleName[1], applicant.middleName[0], {
					allowBlank: false
				}),
				org = createCmp('FTextArea', applicant.organization[1], applicant.organization[0],
						{width: 400, allowBlank: false});

		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', applicant.applicantType[1],
						applicant.applicantType[0], applicant.applicantType[0], {
					allowBlank: false,
					listeners: {
						select: function change(cb, selected) {
							if (!change.remove) {
								change.f = []; // еще ничего не выбиралось
								change.remove = function() {
									for (var i = 0; i < change.f.length; ++i)
										me.remove(change.f[i], false);
								};
							}

							var code = selected[0].data.code;
							if (change.curCode !== code) {
								change.remove();
								if (code === 'Q_VALUE_APP_TYPE_FFACE') {
									change.f = [surname, name, fatherName];
								} else if (code === 'Q_VALUE_APP_TYPE_JURFACE') {
									change.f = [org];
								}
								change.f.forEach(function(val, idx) {
									me.insert(idx + 1, val);
								});
								change.curCode = code;
							}
						}
					}
				}),
				createCmp('FComboBox', applicant.applicantCategory[1],
						applicant.applicantCategory[0], applicant.applicantCategory[0], {
					allowBlank: false
				}),
				createCmp('FTextField', applicant.country[1], applicant.country[0]),
				createCmp('FTextField', applicant.address[1], applicant.address[0]),
				createCmp('FTextField', applicant.phone[1], applicant.phone[0]),
				createCmp('FieldSet', {
					title: 'Дополнительные сведения',
					collapsible: true,
					items: [
						createCmp('FTextField', applicant.issueDocNum[1], applicant.issueDocNum[0], {
							width: 200
						}),
						createCmp('FDateField', applicant.issueDocDate[1], applicant.issueDocDate[0], {
							width: 200
						}),
						createCmp('FTextField', applicant.fioJurPerson[1], applicant.fioJurPerson[0], {
							width: 300
						}),
						createCmp('FTextField', applicant.appends[1], applicant.appends[0], {
							width: 350
						})
					]
				})
			]
		});
		me.callParent();
	}
});

