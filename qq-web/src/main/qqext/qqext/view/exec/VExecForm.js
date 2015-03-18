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
		'qqext.model.Execution',
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
		activate: function (me) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.exec));
			ns.Menu.setEditMenu(me._idx);
			if (!ns.creq.e) {
				// Значит новый запрос (не тот который был до этого)
				ns.model.Execution.load(ns.creq.q.get('id'), {
					success: function (record) {
						var status = record.get('status');
						ns.creq.e = record;
						ns.creq.e.files = record.files;
						me._initData();
						me._disableButtons(!((record.get('executor') === ns.userId || (
								ns.superex &&
								(ns.creq.q.get('execOrg') === ns.orgId))) &&
								(status === ns.statsId[ns.stats.onexec] || status === ns.statsId[ns.stats.exec])), 0);
					},
					failure: function (record, operation) {
						ns.showError("Ошибка получения данных", operation.getError());
					}
				});
				me._disableButtons(true, 1, 2, 3);
				ns.initRequired(me);
				var store = Ext.getStore(ns.stIds.queryType);
				if (ns.creq.q.get('questionType') ===
						store.getAt(store.find('code', 'Q_VALUE_QUEST_TYPE_SOCIAL')).get('id'))
					me._ef.df2.show();
				else
					me._ef.df2.hide();
				me.setViewOnly(true);
			}
//			ns.viewport.doLayout();
		}
	},
	_initData: function () {
		var me = this,
				model = qqext.creq.e;
		// Очистим все ошибки
		me.items.each(function (it) {
			it.reset();
		});
		me._ef.loadRecord(model);
		if (model.get('prolongDate')) {
			me._ef.df2.viewOnly = true;
			me._prodlen = true;
		} else {
			me._ef.df2.viewOnly = false;
			me._prodlen = false;
		}

		[me._df, me._cf, me._mf].forEach(function (v) {
			v.setStorage();
		});
		me._mf.loadRecord(model);
		me._df.loadRecord();
		me._cf.loadRecord();
	},
	_saveData: function (success, failure) {
		var me = this,
				ns = qqext,
				files = me._mf._ff,
				model = ns.creq.e;
		if (!ns.checkDates([me._ef.df1, me._ef.df2]))
			return;
		me.setViewOnly(true);
		me._disableButtons(true, 0, 1, 2, 3);
		me.updateRecord();

		if (!me._prodlen && model.get('prolongDate'))
			model.set('planDate', model.get('planDate').valueOf() + 30 * ns.msPday);

		files.getForm().submit({
			clientValidation: false,
			url: 'rest/execution',
			method: 'POST',
			params: {
				deletedFiles: Ext.encode(files.deletedFiles),
				model: Ext.encode(ns.creq.e.getData())
			},
			success: function (form, action) {
				var data = action.result.data;
				ns.creq.e = Ext.create('qqext.model.Execution', data);
				ns.creq.e.files = data.files;
				me._df.save();
				me._cf.save();
				me._mf.save();
				files.loadRecord(data.files);
				ns.infoChanged = true;
				// Синхронизируем с вкладкой регистрации
				ns.regForm.query.pd.setValue(new Date(data.planDate));
				me._disableButtons(false, 0);
				success();
			},
			failure: function (form, action) {
				ns.showError("Ошибка сохранения", action.response.responseText);
				files.showFiles();
				failure();
			}
		});
	},
	initComponent: function () {
		//----------обработчики для кнопок меню---------

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 * @returns {undefined}
		 */
		function save() {
			me._saveData(function () {
			}, function () {
				if (qqext.creq.e.get('status') === ns.statsId[ns.stats.exec]) {
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
			ns.creq.e.destroy({
				callback: function (r, o) {
					if (o.success) {
						ns.infoChanged = true;
						ns.creq.e = null;
						me.fireEvent('activate', me);
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
					model = ns.creq.q;
			if (!issueNumberField.getValue()) {
				issueNumberField.setValue(model.get('prefix') + '/' + model.get('sufix'));
			}
			if (me.validate()) {
				var status = ns.statsId[ns.stats.exec];
				ns.creq.e.set('status', status);
				me._saveData(function () {
					ns.statusPanel.setStatus(status);
					// На всякий случай синхронизируем 
					ns.creq.q.set('status', status);
					if (ns.creq.n)
						ns.creq.n.set('status', status);
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
				menu = createCmp('HButtonMenu', [{
						text: labels.edit,
						action: ns.edit,
						opts: {
							cls: 'edit_btn'
						}
					}, {
						text: labels.save,
						action: save,
						opts: {
							cls: 'save_btn'
						}
					}, {
						text: labels.remove,
						action: remove,
						opts: {
							cls: 'remove_btn'
						}
					}, {
						text: labels.register,
						action: book,
						opts: {
							cls: 'reg_btn'
						}
					}],
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
		var model = qqext.creq.e;
		this._ef.updateRecord(model);
		this._mf.updateRecord(model);
	},
	/**
	 * Проверяет форму на валидность (для прохождения регистрации).
	 * @returns {Boolean} показывает ошибку и возвращает false в случае не правильного заполнения формы
	 */
	validate: function () {
		var forms = this.items,
				i = 0,
				max = forms.length,
				errors = [],
				form;
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
