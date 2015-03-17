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
	/**
	 * Удаляем соисполнителей
	 */
	clearExecs: function () {
		while (this._execs.length > 1)
			this._execs.pop().destroy();
		this._coex = 2; // индекс, с которого начинаются поля для соисполнителей
	},
	/**
	 * Выставляем списки для исполнителей
	 */
	setRightStore: function () {
		var store = this.store;
		this.items.each(function (fc) {
			if (fc.$className !== 'qqext.cmp.FieldContainer')
				return false;
			fc.items.getAt(0).bindStore(store);
		});
	},
	/**
	 * Обновляет данные формы после удачной загрузки
	 * @param {qqext.model.Transmission} model данные для обновления
	 * @param {Boolean} clearBefore удалить соисполнителей перед обновлением
	 */
	update: function (model, clearBefore) {
		var me = this;
		if (clearBefore)
			me.clearExecs();
		me.loadRecord(model);
		me.loadAssistants(model);
		me.setViewOnly(true);
	},
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.trans));
			ns.Menu.setEditMenu(me._idx);
			if (!ns.creq.t) {
				// Значит новый запрос (не тот который был до этого)
				me.clearExecs();

				var execOrg = ns.creq.q.get('execOrg');
				me.store = (ns.isSIC && execOrg !== ns.sicId) ? ns.stIds.allexecs : ns.stIds.execs;

				// Выставляем список правильных пользователей для исполнителей.
				me.setRightStore();

				ns.model.Transmission.load(ns.creq.q.get('id'), {
					success: function (r) {
						ns.creq.t = r;
						me.update(r);
						me._disableButtons(true, 1, 2, 3);
						var stats = ns.stats,
								statsId = ns.statsId,
								status = ns.creq.q.get('status');
						me._disableButtons(!(ns.coor &&
								status === statsId[stats.reg] &&
								ns.orgId === execOrg ||
								((status === statsId[stats.onexec] ||
										status === statsId[stats.exec]) && ns.visor)), 0);
					},
					failure: function (record, operation) {
						ns.showError("Ошибка получения данных", operation.getError());
					}
				});
				ns.initRequired(me);
			}
			me.collapseAdds();
//			me.doLayout();
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
			if (!qqext.checkDates(Ext.ComponentQuery.query('datefield', me)))
				return;

			var trans = ns.creq.t,
					status = trans.get('status'),
					inEditMode = (status === ns.statsId[ns.stats.onexec] ||
							status === ns.statsId[ns.stats.exec]);
			if (inEditMode && !me.validate())
				return;
			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			me.updateRecord(trans);
			me.updateAssistants(trans);
			trans.save({
				params: {assistants: Ext.encode(trans.assistants)},
				callback: function (rec, op, suc) {
					if (suc) {
						me._disableButtons(false, 0);
						ns.creq.t = rec;
						me.update(rec, true);
						ns.infoChanged = true;
					} else {
						qqext.showError("Ошибка сохранения данных", op.getError());
						if (inEditMode) {
							me.setAdminMode();
							me._disableButtons(false, 1);
						} else {
							me.setViewOnly(false);
							me._disableButtons(false, 1, 2, 3);
						}
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
			ns.creq.t.destroy({
				callback: function (recs, operation) {
					if (!operation.success)
						ns.showError("Ошибка удаления данных", operation.getError());
					else {
						me._disableButtons(true, 2);
						me.clearExecs();
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
			if (!qqext.checkDates(Ext.ComponentQuery.query('datefield', me)))
				return;

			var trans = ns.creq.t,
					status = ns.statsId[ns.stats.onexec];
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			if (me.validate()) {
				me.updateRecord(trans);
				me.updateAssistants(trans);
				trans.set('status', status);
				ns.creq.q.set('status', status); // Перестраховка на всякий случай
				trans.save({
					params: {assistants: Ext.encode(trans.assistants)},
					callback: function (r, o, s) {
						if (s) {
							ns.creq.t = r;
							me.update(r, true);
							ns.statusPanel.setStatus(status);
							ns.turnOnArticles(ns.btns.exec);
							ns.infoChanged = true;
						} else {
							ns.showError("Ошибка сохранения данных", o.getError());
							me._disableButtons(false, 1, 2, 3);
							me.setViewOnly(false);
						}
					}
				});
			} else {
				me._disableButtons(false, 1, 2, 3);
				me.setViewOnly(false);
			}
		}
		//----------------------------------------------
		var me = this,
				ns = qqext,
				labels = ns.labels,
				createCmp = Ext.create,
				configForDate = {
					labelAlign: 'right',
					margin: '6 0 0 0'
				},
		menus = createCmp('HButtonMenu', [{
				text: labels.edit,
				action: ns.edit,
				opts: {cls: 'edit_btn'}
			}, {
				text: labels.save,
				action: save,
				opts: {cls: 'save_btn'}
			}, {
				text: labels.remove,
				action: remove,
				opts: {cls: 'remove_btn'}
			}, {
				text: labels.register,
				action: book,
				opts: {cls: 'reg_btn'}
			}],
				'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				createCmp('FieldContainer', {
					layout: 'hbox',
					cls: 'right_date',
					items: [
						me._be = createCmp('FComboBox', 'Ответственный за исполнение', ns.stIds.execs,
								'bossExec', {
									allowBlank: false,
									width: 450,
									labelWidth: 150
								}),
						createCmp('FDateField', 'Дата', 'bossExecDate', configForDate)
					]
				}),
				createCmp('FieldContainer', {
					layout: 'hbox',
					cls: 'right_date coexec',
					items: [
						me._ex = createCmp('FComboBox', 'ФИО исполнителя', ns.stIds.execs, 'executor', {
							allowBlank: false,
							width: 450,
							labelWidth: 150,
							listeners: {
								editmode: function () {
									Ext.ComponentQuery.query('button', me).forEach(function (it) {
										it.show();
									});
								},
								viewmode: function () {
									Ext.ComponentQuery.query('button', me).forEach(function (it) {
										it.hide();
									});
								}
							}
						}),
						createCmp('FDateField', 'Дата', 'execDate',
								configForDate),
						createCmp('Ext.button.Button', {
							cls: 'add_btn exec_fld_cls',
							handler: me.addExecutor,
							scope: me
						})
					]
				}),
				createCmp('FCheckbox', 'Контроль', 'control', {
					listeners: {
						change: function (cb, value) {
							if (value)
								me._cd.show();
							else {
								me._cd.hide();
								me._cd.reset();
							}
							me._cd.setRequired(value);
						}
					}
				}),
				me._cd = createCmp('FDateField', 'Контрольная дата исполнения', 'controlDate', {
					width: 250,
					hidden: true,
					labelWidth: 150
				}),
				me._adds = createCmp('FieldSet', {
					collapsible: true,
					title: 'Дополнительная информация',
					cls: 'collapse_section',
					layout: 'vbox',
					items: [
						createCmp('FTextField', 'Автор резолюции', 'resAuthor', {
							width: 450,
							labelWidth: 150
						}),
						createCmp('FComboBox', 'Территория хранилища', ns.stIds.storage,
								'storeTeritory', {
									width: 450,
									labelWidth: 150
								}),
						createCmp('FTextField', 'Название хранилища', 'storeName', {
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
		// Нужно для режима суперпользователя, который может править уже зарегестрированные
		me._execs = [me.items.getAt(1)];
	},
	/**
	 * Скрывает дополнительные сведения.
	 * Изначально в конструкторе опция collapsed: true - не работает (extjs не может
	 * правильно пересчитать размер), поэтому приходится делать это руками, после
	 * того как форма будет активирована (afterrender тоже слишком рано)
	 */
	collapseAdds: function () {
		this._adds.collapse();
	},
	/**
	 * Устанавливает определенные поля доступными для редактирования в режиме супервизора.
	 */
	setAdminMode: function () {
		this._execs.forEach(function (it) {
			it.setViewOnly(false);
		});
		this._be.setViewOnly(false);
		//		На закладке "Передача на исполнение" поля "ФИО исполнителя", "Соисполнитель".
	},
	/**
	 * Добавляет поля ввода для соисполнителя
	 */
	addExecutor: function () {
		var create = Ext.create,
				me = this,
				ns = qqext,
				assistant = arguments[0],
				store = me.store,
				cb, df,
				configForDate = {
					labelAlign: 'right',
					margin: '6 0 0 0'
				};

		if (assistant instanceof Ext.button.Button) {
			assistant = null;
			store = ns.stIds.execs;
		}

		var container = create('FieldContainer', {
			layout: 'hbox',
			cls: 'right_date coexec',
			items: [
				cb = create('FComboBox', 'Соисполнитель', store, 'coexec' + me._coex, {
					width: 450,
					labelWidth: 150
				}),
				df = create('FDateField', 'Дата', 'coexecDate' + me._coex, configForDate),
				create('Ext.button.Button', {
					cls: 'remove_btn exec_fld_cls',
					hidden: assistant ? true : false,
					handler: function () {
						me._execs.splice(me._execs.indexOf(container), 1);
						me.remove(container);
						me._coex--;
					}
				})
			]
		});
		me.insert(me._coex++, container);
		me._execs.push(container);
		if (assistant) {
			cb.setValue(assistant.user);
			df.setValue(new Date(assistant.execDate));
		}
	},
	validate: function () {
		if (!this.isValid()) {
			qqext.showError("Форма заполнена неправильно", this.getErrors());
			return false;
		}
		return true;
	},
	/**
	 * Добавляет соисполнителей в модель
	 * @param {qqext.model.Transmission}  model модель для передачи на сервер
	 */
	updateAssistants: function (model) {
		var assistants = model.assistants = [];
		this._execs.forEach(function (it, i) {
			if (i !== 0) {
				var items = it.items,
						user = items.getAt(0).getValue();
				if (user && !exist(assistants, user)) // молча пропускаем пустой элемент и повторяющийся
					assistants.push({
						user: user,
						execDate: items.getAt(1).getValue()
					});
			}
		});
		function exist(array, user) {
			for (var i = 0; i < array.length; ++i) {
				if (user === array[i].user)
					return true;
			}
			return false;
		}
	},
	/**
	 * Загружает информацию об соисполнителях в форму
	 * @param {qqext.model.Transmission} model 
	 */
	loadAssistants: function (model) {
		var me = this;
		model.assistants.forEach(function (it) {
			me.addExecutor(it);
		});
	}
});
