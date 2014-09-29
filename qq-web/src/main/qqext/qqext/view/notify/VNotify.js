/**
 * Форма "Уведомление заявителю". Эта форма владеет верхним меню
 * из двух кнопок "Сохранить" и "Редактировать".
 *
 * @author М. Сорокин
 */
Ext.define('qqext.view.notify.VNotify', {
	alias: 'VNotify',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
		'qqext.Menu'
	],
	mixins: ['qqext.cmp.DisableButtons'],
	height: 300,
	maxHeight: 300,
	title: 'Уведомление заявителю',
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 4,
	listeners: {
		activate: function(me, prev) {
			var ns = qqext;
			ns.Menu.setEditMenu(me._idx);
			if (ns.request !== me.model) {
				// Значит новый запрос (не тот который был до этого)
				var model = me.model = ns.request;
				model.getNoti({callback: function(r) {
						me.loadRecord(r);
						me.setViewOnly(true);
						me._disableButtons(true, 0);
						me._disableButtons(!ns.user.isAllowed(ns.rules.reg), 1);
					}});
			}
			ns.viewport.doLayout();
		}
	},
	initComponent: function() {
		//----------Обработчики кнопок меню----------
		function saveNotify() {
			var model = me.model,
					noti = model.getNoti();

			me._disableButtons(true, 0, 1);
			me.setViewOnly(true);
			me.updateRecord(noti);

			noti.save({callback: function(rec, op, suc) {
					if (suc) {
						model.set('status', ns.getStatusId(ns.stats.notify));
						// Обновляем модель запроса (статус)
						model.save({callback: function(record, operation, success) {
								if (success) {
									me._disableButtons(false, 1);
									ns.statusPanel.setStatus();
								} else {
									ns.showError("Ошибка сохранения", operation.getError());
									me.setViewOnly(false);
									// Включаем кнопку сохранить
									me._disableButtons(false, 0);
									noti.destroy();
								}
							}
						});
					} else {
						ns.showError("Ошибка сохранения", op.getError());
						me.setViewOnly(false);
						me._disableButtons(false, 0);
					}
				}
			});
		}

		function editNotify() {
			me._disableButtons(true, 1);
			me._disableButtons(false, 0);
			me.setViewOnly(false);
		}

		//-------------------------------------------

		var me = this,
				ns = qqext,
				createCmp = Ext.create,
				labels = ns.labels,
				notf = ns.notification,
				menu = createCmp('HButtonMenu', [
					{text: labels.save, action: saveNotify, opts:{cls:'save_btn'}},
					{text: labels.edit, action: editNotify, opts:{cls:'edit_btn'}}
				], 'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', notf.executor[1], 'allUsers', notf.executor[0]),
				createCmp('FComboBox', notf.docType[1], 'docType', notf.docType[0]),
				createCmp('FComboBox', notf.deliveryType[1], 'answerForm', notf.deliveryType[0]),
				createCmp('FDateField', notf.notificationDate[1], notf.notificationDate[0])
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(1, menu);
	}
});
