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
	fieldDefaults: {
		blankText: 'Обязательно для заполнения',
		validateOnChange: false
	},
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 4,
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.notify));
			ns.Menu.setEditMenu(me._idx);
			if (ns.request !== me.model) {
				// Значит новый запрос (не тот который был до этого)
				var model = me.model = ns.request;
				model.getNoti({callback: function (r) {
						me.loadRecord(r);
						me.setViewOnly(true);
						me._disableButtons(true, 0);
						me._disableButtons(!ns.user.isAllowed(ns.rules.reg), 1);
					}});

				ns.initRequired(me);
			}
			ns.viewport.doLayout();
		}
	},
	initComponent: function () {
		//----------Обработчики кнопок меню----------
		function saveNotify() {
			if (!ns.checkDates([me._df, me._idf]))
				return;

			var model = me.model,
					noti = model.getNoti();

			me._disableButtons(true, 0, 1);
			me.setViewOnly(true);
			me.updateRecord(noti);
			if (me.isValid()) {
				noti.save({callback: function (rec, op, suc) {
						if (suc) {
							model.set('status', ns.statsId[ns.stats.notify]);
							// Обновляем модель запроса (статус)
							model.save({callback: function (record, operation, success) {
									if (success) {
										me._disableButtons(false, 1);
										ns.statusPanel.setStatus();
										ns.infoChanged = true;
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
			} else {
				ns.showError("Форма заполнена неправильно", me.getErrors());
				me.setViewOnly(false);
				me._disableButtons(false, 0);
			}
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
				stores = ns.stIds,
				menu = createCmp('HButtonMenu', [
					{text: labels.save, action: saveNotify, opts: {cls: 'save_btn'}},
					{text: labels.edit, action: editNotify, opts: {cls: 'edit_btn'}}
				], 'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', notf.executor[1], stores.users, notf.executor[0], {
					width: 450,
					labelWidth: 150,
					allowBlank: false
				}),
				createCmp('FComboBox', notf.docType[1], 'docType', notf.docType[0], {
					width: 450,
					labelWidth: 150
				}),
				me._df = createCmp('FDateField', notf.notificationDate[1], notf.notificationDate[0], {
					width: 270,
					labelWidth: 150
				}),
				createCmp('FComboBox', notf.deliveryType[1], stores.sendType, notf.deliveryType[0], {
					width: 270,
					labelWidth: 150
				}),
				me._idf = createCmp('FDateField', notf.issueDate[1], notf.issueDate[0], {
					width: 270,
					labelWidth: 150
				})
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(1, menu);
	}
});
