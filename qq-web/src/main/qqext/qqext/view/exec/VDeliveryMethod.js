/**
 * Панель формы "Способ отправки"
 */
Ext.define('qqext.view.exec.VDeliveryMethod', {
	alias: 'VDeliveryMethod',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.view.exec.cmp.ComboDateTrash',
		'qqext.factory.HandlerButton',
		'qqext.model.qq.SendAction',
		'qqext.factory.TextArea',
		'qqext.factory.TextField',
		'qqext.factory.DateField',
		'Ext.Component',
		'Ext.form.FieldSet',
		'hawk_common.cmp.FileList'
	],
	title: 'Способ отправки',
	mOdel: null,
	minHeight: 60,
	comboTrashConfig: {
		store: 'answerForm',
		comboLabel: 'Способ отправки',
		dateLabel: 'Дата'
	},
	remove: function() {
		var me = this;
		var index = me.items.indexOf(arguments[0]);
		var delSendMethod = me.mOdel.sendActions().getAt(index - 1);
		me.mOdel.sendActions().remove(delSendMethod);
		me.callParent(arguments);
	},
	loadRecord: function(model) {
		var me = this;
		me.mOdel = model;
		for (var i = 0; i < me.mOdel.sendActions().getCount(); i++) {
			var t = Ext.create('qqext.view.exec.cmp.ComboDateTrash',
					me.comboTrashConfig);
			me.insert(me.items.length - 5, t);
			t.setComboValue(me.mOdel.sendActions().getAt(i)
					.get('sendAction'));
			t.setDateValue(me.mOdel.sendActions().getAt(i)
					.get('sendDate'));
		}
		var wayToSend = model.getWayToSend();
		arguments[0] = wayToSend;
		me.callParent(arguments);
	},
	updateRecord: function() {
		var me = this;
		for (var i = 0; i < me.mOdel.sendActions().getCount(); i++) {
			var curComboTrashDate = me.items.getAt(i + 1);
			var curSendAction = me.mOdel.sendActions().getAt(i);
			curSendAction.set('sendAction', curComboTrashDate
					.getComboValue());
			curSendAction.set('sendDate', curComboTrashDate
					.getDateValue());
		}
		var wayToSend = arguments[0].getWayToSend();
		arguments[0] = wayToSend;
		me.callParent(arguments);
	},
	initComponent: function() {
		var me = this,
				factory = qqext.factory;

		Ext.apply(me, {
			items: [
				new factory.HandlerButton('add', function() {
					var t = Ext.create('ComboDateTrash', me.comboTrashConfig);
					me.insert(me.items.length - 5, t);
					me.mOdel.sendActions().add(Ext
							.create('qqext.model.qq.SendAction'));
				}),
				Ext.create('Ext.Component', {autoEl: 'hr'}),
				new factory.DateField('Уведомление о переносе сроков', 'renewalNotice'),
				new factory.TextField('Исходящий №', 'ref_num'),
				new factory.TextArea('Примечание', 'note').cfg({
					width: 600,
					labelWidth: 100
				}),
				Ext.create('Ext.form.FieldSet', {
					title: 'Ответ',
					collapsible: true,
					items: [Ext.create('hawk_common.cmp.FileList')]
				})
			]
		});

		me.callParent(arguments);
	}
});
