/**
 * Форма для заполнения данных по заявителю
 */
Ext.define('qqext.view.reg.VApplicant', {
	alias: 'VApplicant',
	extend: 'qqext.view.StyledPanel',
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
				applicants = ns.applicants,
				createCmp = Ext.create,
				surname = createCmp('FTextField', applicants.surname[1], applicants.surname[0]),
				name = createCmp('FTextField', applicants.name[1], applicants.name[0]),
				fatherName = createCmp('FTextField', applicants.fatherName[1], applicants.fatherName[0]),
				org = createCmp('FTextArea', applicants.applicantObject[1], applicants.applicantObject[0],
						{width: 400});
		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', applicants.applicantType[1],
						applicants.applicantType[0], applicants.applicantType[0], {
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
				createCmp('FComboBox', applicants.applicantCategory[1],
						applicants.applicantCategory[0], applicants.applicantCategory[0]),
				createCmp('FTextField', applicants.country[1], applicants.country[0]),
				createCmp('FTextField', applicants.address[1], applicants.address[0]),
				createCmp('FTextField', applicants.phone[1], applicants.phone[0]),
				createCmp('FieldSet', {
					title: 'Дополнительные сведения',
					collapsible: true,
					items: [
						createCmp('FTextField', applicants.inboxDocNum[1], applicants.inboxDocNum[0], {
							width: 200
						}),
						createCmp('FDateField', applicants.inboxDocDate[1], applicants.inboxDocDate[0], {
							width: 200
						}),
						createCmp('FTextField', applicants.nameOfJurPerson[1], applicants.nameOfJurPerson[0], {
							width: 300
						}),
						createCmp('FTextField', applicants.addendum[1], applicants.addendum[0], {
							width: 350
						})
					]
				})
			]
		});
		me.callParent();
	}
});

