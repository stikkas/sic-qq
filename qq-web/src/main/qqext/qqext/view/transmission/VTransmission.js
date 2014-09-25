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
		activate: function(me, prev) {
			var ns = qqext;
			ns.Menu.setEditMenu(me._idx);
			if (ns.request !== me.model) {
				// Значит новый запрос (не тот который был до этого)
				var model = me.model = ns.request;
				model.getTrans({callback: function(r) {
						me.loadRecord(r);
						me.setViewOnly(true);
						me._disableButtons(true, 1, 2, 3);
						me._disableButtons(!(ns.user.isAllowed(ns.rules.crd) &&
								model.get('status') === ns.getStatusId(ns.stats.reg)), 0);
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
	initComponent: function() {
		//----------обработчики для кнопок меню---------
		//sc - контекст для обработчика

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 */
		function save() {
			var me = this,
					trans = me.model.getTrans();
			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			me.updateRecord(trans);
			trans.save({callback: function(rec, op, suc) {
					if (suc) {
						me._disableButtons(false, 0);
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
			me.model.getTrans().destroy({callback: function(recs, operation) {
					if (!operation.success)
						ns.showError("Ошибка удаления данных", operation.getError());
					else
						me._disableButtons(true, 2);
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
			var me = this,
					model = me.model,
					trans = model.getTrans();
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			if (me.isValid()) {
				me.updateRecord(trans);
				trans.save({callback: function(r, o, s) {
						if (s) {
							model.set('status', ns.getStatusId(ns.stats.onexec));
							model.save({callback: function(rec, op, suc) {
									if (suc) {
										ns.statusPanel.setStatus();
										ns.turnOnArticles(ns.btns.exec);
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
// scope for buttons
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
			{text: labels.edit, action: ns.edit},
			{text: labels.save, action: save},
			{text: labels.remove, action: remove},
			{text: labels.register, action: book}],
				'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						createCmp('FComboBox', trans.bossExecutor[1], 'allUsers',
								trans.bossExecutor[0], {allowBlank: false}),
						createCmp('FDateField', trans.bossExecutionDate[1], trans.bossExecutionDate[0],
								configForDate)
					]
				}),
				createCmp('FieldContainer', {
					layout: 'hbox',
					items: [
						createCmp('FComboBox', trans.executor[1], 'allUsers', trans.executor[0],
								{allowBlank: false}),
						createCmp('FDateField', trans.executionDate[1], trans.executionDate[0],
								configForDate)
					]
				}),
				createCmp('FCheckbox', trans.control[1], trans.control[0]),
				createCmp('FDateField', trans.controlDate[1], trans.controlDate[0], {allowBlank: false}),
				me._adds = createCmp('FieldSet', {
					collapsible: true,
					title: 'Дополнительная информация',
					layout: 'vbox',
					items: [
						createCmp('FTextField', trans.resolutionAuthor[1], trans.resolutionAuthor[0]),
						createCmp('FComboBox', trans.storageTerritory[1], 'storageTerritory',
								trans.storageTerritory[0]),
						createCmp('FTextField', trans.storageName[1], trans.storageName[0])
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
	collapseAdds: function() {
		this._adds.collapse();
	}
});
