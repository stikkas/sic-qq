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
		'hawk_common.fix.FixedFieldSet',
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
				factory = ns.factory,
				TextField = factory.TextField,
				ComboBox = factory.ComboBox,
				surname = Ext.create('qqext.cmp.Text',
						new TextField(applicants.surname[1], applicants.surname[0])),
				name = Ext.create('qqext.cmp.Text',
						new TextField(applicants.name[1], applicants.name[0])),
				fatherName = Ext.create('qqext.cmp.Text',
						new TextField(applicants.fatherName[1], applicants.fatherName[0])),
				org = Ext.create('qqext.cmp.TextArea',
						new factory.TextArea(applicants.applicantObject[1], applicants.applicantObject[0]).
						cfg({width: 400}));

		Ext.applyIf(me, {
			items: [
				new ComboBox(applicants.applicantType[1],
						applicants.applicantType[0], applicants.applicantType[0]).cfg({
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
				new ComboBox(applicants.applicantCategory[1],
						applicants.applicantCategory[0], applicants.applicantCategory[0]),
				new TextField(applicants.country[1], applicants.country[0]),
				new TextField(applicants.address[1], applicants.address[0]),
				new TextField(applicants.phone[1], applicants.phone[0]),
				Ext.create('FieldSet', {
					title: 'Дополнительные сведения',
					collapsible: true,
					items: [
						new TextField(applicants.inboxDocNum[1], applicants.inboxDocNum[0]).cfg({
							width: 200
						}),
						new factory.DateField(applicants.inboxDocDate[1], applicants.inboxDocDate[0]).cfg({
							width: 200
						}),
						new TextField(applicants.nameOfJurPerson[1], applicants.nameOfJurPerson[0]).cfg({
							width: 300
						}),
						new TextField(applicants.addendum[1], applicants.addendum[0]).cfg({
							width: 350
						})
					]
				})
			]
		});
		me.callParent(arguments);
	}
});

