/**
 * Панелька "Передача на исполнение" одноименной формы
 */

Ext.define('qqext.view.transmission.VTransmission', {
	alias: 'VTransmission',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.factory.Checkbox',
		'qqext.factory.TextField',
		'qqext.cmp.FieldContainer',
		'qqext.cmp.FieldSet',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
		'qqext.model.Transmission',
		'qqext.Menu'
	],
	mixins: ['qqext.cmp.DisableButtons'],
	title: 'Передача на исполнение',
	fieldDefaults: {
		validateOnChange: false,
		blankText: 'Обязательно для заполнения'
	},
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 5,
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.trans));
			ns.Menu.setEditMenu(me._idx);
			if (ns.request !== me.model) {
				// Значит новый запрос (не тот который был до этого)
				var model = me.model = ns.request;
				if (ns.isSIC && model.get('execOrg') !== ns.sicId) {
					me._be.bindStore(ns.stIds.allusers);
					me._ex.bindStore(ns.stIds.allusers);
				}
				model.getTrans({callback: function (r) {
						me.loadRecord(r);
						me.setViewOnly(true);
						me._disableButtons(true, 1, 2, 3);
						var stats = ns.stats,
								statsId = ns.statsId,
								status = model.get('status');
						if (ns.user.isAllowed(ns.rules.crd) &&
								(status === statsId[stats.reg] ||
										((status === statsId[stats.notify] ||
												status === statsId[stats.trans]) &&
												!ns.isSIC))
								)
							me._disableButtons(false, 0);
						else
							me._disableButtons(true, 0);

					}});

			}
			me.collapseAdds();
			me.doLayout();
		}
	},
	/**
	 * @property {qqext.cmp.FieldSet} _adds поля для "Дополнительные сведения"
	 * @private
	 */
	initComponent: function () {
		//----------обработчики для кнопок меню---------
		//sc - контекст для обработчика

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 */
		function save() {
			var me = this;
			if (!qqext.checkDates([me._df1, me._df2, me._cd]))
				return;

			var trans = me.model.getTrans();
			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			me.updateRecord(trans);
			trans.save({callback: function (rec, op, suc) {
					if (suc) {
						me._disableButtons(false, 0);
						ns.infoChanged = true;
					} else {
						qqext.showError("Ошибка сохранения данных", op.getError());
						me.setViewOnly(false);
						me._disableButtons(true, 1, 2, 3);
					}
				}
			});
		}

		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			me.model.getTrans().destroy({callback: function (recs, operation) {
					if (!operation.success)
						ns.showError("Ошибка удаления данных", operation.getError());
					else {
						me._disableButtons(true, 2);
						me.getForm().reset();
						ns.infoChanged = true;
					}
				}
			});
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Регистрировать".
		 * TODO реализовать метод
		 * @private
		 * @returns {undefined}
		 */
		function book() {
			var me = this;
			if (!qqext.checkDates([me._df1, me._df2, me._cd]))
				return;

			var model = me.model,
					trans = model.getTrans();
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			if (me.isValid()) {
				me.updateRecord(trans);
				trans.save({callback: function (r, o, s) {
						if (s) {
							model.set('status', ns.statsId[ns.stats.onexec]);
							model.save({callback: function (rec, op, suc) {
									if (suc) {
										ns.statusPanel.setStatus();
										ns.turnOnArticles(ns.btns.exec);
										ns.infoChanged = true;
									} else {
										ns.showError("Ошибка обновления статуса", op.getError());
										trans.destroy();
										me._disableButtons(false, 1, 2, 3);
										me.setViewOnly(false);
									}
								}});
						} else {
							ns.showError("Ошибка сохранения данных", o.getError());
							me._disableButtons(false, 1, 2, 3);
							me.setViewOnly(false);
						}
					}});
			} else {
				ns.showError("Форма заполнена неправильно", me.getErrors());
				me._disableButtons(false, 1, 2, 3);
				me.setViewOnly(false);
			}
		}
//----------------------------------------------
		var me = this,
				ns = qqext,
				labels = ns.labels,
				createCmp = Ext.create,
				trans = ns.transmission,
				configForDate = {
					labelAlign: 'right',
					margin: '6 0 0 0'
				},
		menus = createCmp('HButtonMenu', [
			{text: labels.edit, action: ns.edit, opts: {cls: 'edit_btn'}},
			{text: labels.save, action: save, opts: {cls: 'save_btn'}},
			{text: labels.remove, action: remove, opts: {cls: 'remove_btn'}},
			{text: labels.register, action: book, opts: {cls: 'reg_btn'}}],
				'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					cls: 'right_date',
					items: [
						me._be = createCmp('FComboBox', trans.bossExecutor[1], ns.stIds.users,
								trans.bossExecutor[0], {allowBlank: false,
							width: 450,
							labelWidth: 150
						}),
						me._df1 = createCmp('FDateField', trans.bossExecutionDate[1], trans.bossExecutionDate[0],
								configForDate)
					]
				}),
				createCmp('FieldContainer', {
					layout: 'hbox',
					cls: 'right_date',
					items: [
						me._ex = createCmp('FComboBox', trans.executor[1], ns.stIds.users, trans.executor[0],
								{allowBlank: false,
									width: 450,
									labelWidth: 150
								}),
						me._df2 = createCmp('FDateField', trans.executionDate[1], trans.executionDate[0],
								configForDate)
					]
				}),
				createCmp('FCheckbox', trans.control[1], trans.control[0], {
					listeners: {
						change: function (cb, value) {
							if (value)
								me._cd.show();
							else
								me._cd.hide();
							me._cd.allowBlank = !value;
						}
					}
				}),
				me._cd = createCmp('FDateField', trans.controlDate[1], trans.controlDate[0], {
					width: 250,
					hidden: true,
					labelWidth: 150}),
				me._adds = createCmp('FieldSet', {
					collapsible: true,
					title: 'Дополнительная информация',
					cls: 'collapse_section',
					layout: 'vbox',
					items: [
						createCmp('FTextField', trans.resolutionAuthor[1], trans.resolutionAuthor[0], {
							width: 450,
							labelWidth: 150
						}),
						createCmp('FComboBox', trans.storageTerritory[1], 'storageTerritory',
								trans.storageTerritory[0], {
							width: 450,
							labelWidth: 150
						}),
						createCmp('FTextField', trans.storageName[1], trans.storageName[0], {
							width: 450,
							labelWidth: 150
						})
					]
				})
			]
		});
		me._btns = menus.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(2, menus);
	},
	/**
	 * Скрывает дополнительные сведения.
	 * Изначально в конструкторе опция collapsed: true - не работает (extjs не может
	 * правильно пересчитать размер), поэтому приходится делать это руками, после
	 * того как форма будет активирована (afterrender тоже слишком рано)
	 */
	collapseAdds: function () {
		this._adds.collapse();
	}
});
