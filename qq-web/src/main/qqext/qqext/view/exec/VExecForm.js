/**
 * Форма исполнения запроса
 */
Ext.define('qqext.view.exec.VExecForm', {
	alias: 'VExecForm',
	extend: 'qqext.cmp.Container',
	xtype: 'vexecform',
	requires: [
		'qqext.view.exec.VExecInfo',
		'qqext.view.exec.VDeliveryOfDocuments',
		'qqext.view.exec.VCoordination',
		'qqext.view.exec.VDeliveryMethod',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
		'qqext.model.ExecutionInfo',
		'qqext.Menu'
	],
	mixins: ['qqext.cmp.DisableButtons'],
	overflowY: 'auto',
	maxHeight: 1300,
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 6,
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.exec));
			ns.Menu.setEditMenu(me._idx);
			if (ns.request !== me.model) {
				// Значит новый запрос (не тот который был до этого)
				me.model = ns.request;
				me._disableButtons(true, 1, 2, 3);
				var status = me.model.get('status');
				me._disableButtons(!(ns.user.isAllowed(ns.rules.exec) &&
						ns.user.get('organization') === me.model.get('execOrg') &&
						(status === ns.statsId[ns.stats.onexec] || status === ns.statsId[ns.stats.exec])), 0);

				me._initData();
				ns.initRequired(me);
				var store = Ext.getStore('queryType');

				if (me.model.get('questionType') ===
						store.getAt(store.find('code', 'Q_VALUE_QUEST_TYPE_SOCIAL')).get('id'))
					me._ef.df2.show();
				else
					me._ef.df2.hide();

				me.setViewOnly(true);
			}
			ns.viewport.doLayout();
		}
	},
	_initData: function () {
		var me = this,
				model = me.model;
		// Очистим все ошибки
		me.items.each(function (it) {
			it.reset();
		});
		model.getExec({callback: function (r1) {
				me._ef.loadRecord(r1);
				if (r1.get('renewalNotice')) {
					me._ef.df2.viewOnly = true;
					me._prodlen = true;
				} else {
					me._ef.df2.viewOnly = false;
					me._prodlen = false;
				}
				r1.getWay({callback: function (r2) {
						me._mf.loadRecord(r1.files(), r2);
					}});
			}});
		[me._df, me._cf, me._mf].forEach(function (v) {
			v.setStorage();
		});
		me._df.loadRecord();
		me._cf.loadRecord();
	},
	_saveData: function (success, failure) {
		// TODO: Может стоит обновить дату и пользователя обновления запроса
		var me = this;
		if (!qqext.checkDates([me._ef.df1, me._ef.df2]))
			return;
		me.setViewOnly(true);
		me._disableButtons(true, 0, 1, 2, 3);
		var model = me.model.getExec();
		me.updateRecord();
		model.save({callback: function (r, o, s) {
				if (s) {
					model.getWay().save({callback: function (rec, op, st) {
							if (st) {
								me._df.sync();
								me._cf.sync();
								me._mf.save(model.get('id'), success, failure);
								qqext.infoChanged = true;
								if (!me._prodlen && model.get('renewalNotice')) {
									me.model.set('plannedFinishDate',
											me.model.get('plannedFinishDate').valueOf() + 30 * qqext.msPday);
									me.model.save({callback: function (rec, op, st) {
											if (st) {
												me._prodlen = true;
												me._ef.df2.viewOnly = true;
											} else {
												qqext.showError("Ошибка продления выполнения", op.getError());
												failure();
											}
										}});
								}
							} else {
								qqext.showError("Ошибка сохранение данных", o.getError());
								failure();
							}
						}
					});
				} else {
					qqext.showError("Ошибка сохранение данных", o.getError());
					failure();
				}
			}
		});
	},
	initComponent: function () {
		//----------обработчики для кнопок меню---------
		//sc - контекст для обработчика

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 * @returns {undefined}
		 */
		function save() {
			me._saveData(function () {
				me._disableButtons(false, 0);
			}, function () {
				if (me.model.get('status') === ns.statsId[ns.stats.exec]) {
					me._disableButtons(false, 1);
					me.setEditMode();
				} else {
					me._disableButtons(false, 1, 2, 3);
					me.setViewOnly(false);
				}
			});
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			var model = me.model;
			model.getExec().destroy({callback: function (r, o) {
					if (o.success) {
						me._mf.remove();
						model.setExec(createCmp('ExecutionInfoModel', {id: model.get('id')}));
						me._disableButtons(true, 0, 2);
						me._disableButtons(false, 1, 3);
						me._initData();
						ns.infoChanged = true;
					} else {
						ns.showError("Ошибка удаления записи", o.getError());
					}
				}
			});
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Регистрировать".
		 * @private
		 * @returns {undefined}
		 */
		function book() {
			function failure() {
				me._disableButtons(false, 1, 2, 3);
				me.setViewOnly(false);
			}

			var issueNumberField = me._mf._in,
					model = me.model;
			if (!issueNumberField.getValue()) {
				issueNumberField.setValue(model.get('prefixNum') + '/'
						+ model.get('sufixNum'));
			}
			if (me.validate()) {
				me._saveData(function () {
					model.set('status', ns.statsId[ns.stats.exec]);
					model.save({callback: function (r, o, s) {
							if (s) {
								ns.statusPanel.setStatus();
							} else {
								ns.showError("Ошибка обновления статуса", o.getError());
								me._disableButtons(false, 0);
							}
						}});
				}, failure);
			} else { // Валидация не прошла
				failure();
			}
		}
		//----------------------------------------------
		var ns = qqext,
				me = this,
				labels = ns.labels,
				createCmp = Ext.create,
				menu = createCmp('HButtonMenu', [
					{text: labels.edit, action: ns.edit, opts: {cls: 'edit_btn'}},
					{text: labels.save, action: save, opts: {cls: 'save_btn'}},
					{text: labels.remove, action: remove, opts: {cls: 'remove_btn'}},
					{text: labels.register, action: book, opts: {cls: 'reg_btn'}}],
						'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				me._ef = createCmp('VExecInfo'),
				me._df = createCmp('VDeliveryOfDocuments'),
				me._cf = createCmp('VCoordination'),
				me._mf = createCmp('VDeliveryMethod')
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(3, menu);
	},
	updateRecord: function () {
		var me = this, model = me.model.getExec();
		me._ef.updateRecord(model);
		me._mf.updateRecord(model.getWay());
	},
	/**
	 * Проверяет форму на валидность (для прохождения регистрации).
	 * @returns {Boolean} показывает ошибку и возвращает false в случае не правильного заполнения формы
	 */
	validate: function () {
		var forms = this.items,
				i = 0,
				max = forms.length,
				errors = [], form;
		for (; i < max; ++i) {
			form = forms.getAt(i);
			if (!form.isValid())
				errors.push(form.getErrors());
		}
		if (errors.length > 0) {
			qqext.showError("Форма заполнена неправильно", errors.join(''));
			return false;
		}
		return true;
	},
	/**
	 * Устанавливает определенные поля доступными для редактирования в режиме супервизора.
	 * (пока не используется)
	 */
	setAdminMode: function () {
	},
	/**
	 * Устанвливаеть таблицу "Способ отправки" и поля "Исходящий №" и "Примечание"
	 * в режим редактирования при статусе запроса - исполнен.
	 */
	setEditMode: function () {
		this._mf.setEditMode();
	}
});
