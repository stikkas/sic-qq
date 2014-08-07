/**
 * 
 */
Ext.define('qqext.view.exec.VDeliveryMethod', {
			extend : 'Ext.form.Panel',
			title : 'Способ отправки',
			mOdel : null,
			margin : '10 10 0 0',
			minHeight : 60,

			comboTrashConfig : {
				store : 'answerForm',
				comboLabel : 'Способ отправки',
				dateLabel : 'Дата'
			},
			remove : function() {
				var me = this;
				var index = me.items.indexOf(arguments[0]);
				var delSendMethod = me.mOdel.sendActions().getAt(index-1);
				me.mOdel.sendActions().remove(delSendMethod);
				me.callParent(arguments);
			},
			loadRecord : function(model) {
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
			updateRecord : function() {
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

			initComponent : function() {
				var me = this;
				var addBtn = Ext.create('Ext.Button', {
							text : 'add',
							handler : function() {
								var t = Ext.create(
										'qqext.view.exec.cmp.ComboDateTrash',
										me.comboTrashConfig);
								me.insert(me.items.length - 5, t);
								me.mOdel.sendActions().add(Ext
										.create('qqext.model.qq.SendAction'));
							}
						});

				var sep = Ext.create('Ext.Component', {
							autoEl : 'hr'
						});

				var postponemenNotify = Ext.create('Ext.form.field.Date', {
							fieldLabel : 'Уведомление о переносе сроков',
							name : 'renewalNotice'
						})

				var outboxNum = Ext.create('Ext.form.field.Text', {
							fieldLabel : 'Исходящий №',
							name : 'ref_num'
						});

				var addendum = Ext.create('Ext.form.field.TextArea', {
							fieldLabel : 'Примечание',
							name : 'note',
							width : 600,
							labelWidth : 100
						})

				var fs = Ext.create('Ext.form.FieldSet', {
							title : 'Ответ',
							collapsible : true,
							items : [Ext.create('hawk_common.cmp.FileList')]
						})

				Ext.apply(me, {
							items : [addBtn, sep, postponemenNotify, outboxNum,
									addendum, fs]
						});

				me.callParent(arguments);
			}
		})