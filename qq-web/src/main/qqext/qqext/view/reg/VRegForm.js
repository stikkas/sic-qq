/**
 * Форма "Регистрация запроса" карточки запроса. Эта форма владеет кнопками меню
 * "Редактировать", "Сохранить", "Удалить", "Регистрировать".
 */

Ext.define('qqext.view.reg.VRegForm', {
	alias: 'VRegForm',
	xtype: 'vregform',
	extend: 'qqext.cmp.Container',
	requires: [
		'qqext.view.reg.VInboxDoc',
		'qqext.view.reg.VQuery',
		'qqext.view.reg.VApplicant',
		'qqext.view.reg.VQueryObject',
		'qqext.model.Question',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
		'qqext.Menu'
	],
	mixins: ['qqext.cmp.DisableButtons'],
	disabledCls: '',
	maskOnDisable: false,
	disabled: null,
	region: 'center',
	overflowY: 'auto',
	overflowX: 'hidden',
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private;
	 */
	_idx: 3,
	listeners: {
		activate: function (me, prev) {
			var ns = qqext,
					model;
			ns.switchArticleButton(ns.getButton(ns.btns.reg));
			ns.Menu.setEditMenu(me._idx);
			if (ns.creq.q === null) {
				// Значит событие случилось по нажатию на кнопку "Добавить"
				// Очищаем форму
				me.items.each(function (form) {
					form.reset();
				});
				// Сбрасываем статус
				ns.statusPanel.setStatus('');

				model = ns.creq.q = Ext.create('qqext.model.Question');
				//Кнопки "Редактировать" "Печать" и "Удалить"
				me._disableButtons(true, 0, 2, 3);
				//Кнопки "Сохранить" и "Регистрировать"
				me._disableButtons(false, 1, 4);
				// Устанавливаем режим редактирования
				me.setViewOnly(false);
				// Литера
				model.set('litera', ns.orgId);
				if (!ns.isSIC)
					model.set('execOrg', ns.orgId);
				me.loadRecord();
				ns.initRequired(me);
				me.query.pd.setViewOnly(true);
			} else if (prev === ns.searchForm || prev === ns.jvkForm) {
				// Значит пришли по двойному клику на существуещем запросе, (открыли существующий запрос)
				// не ресетим всю форму, а только те элементы у которых есть слушатели change
				me.applicant.appType.setValue(null);
				me.query.vz.setValue(null);
				me.inbox.executor.setValue(null);

				model = ns.creq.q;
				me._disableButtons(true, 1, 3, 4);

				var hasRegRule = ns.reg,
						wantedStatus = model.get('status') === ns.statsId[ns.stats.onreg],
						belongToCreator = model.get('litera') === ns.orgId;

				me._disableButtons(!(hasRegRule && wantedStatus && belongToCreator ||
						(!wantedStatus && ns.visor)), 0); // Редактировать
				me._disableButtons(!(hasRegRule && !wantedStatus && belongToCreator), 2); // Печать
				me.setViewOnly(true);
				me.loadRecord();
				ns.initRequired(me);
			}

			if (!ns.isSIC) {
				// Скрываем выбор исполнителя
				var executor = me.inbox.executor;
				executor.setViewOnly(true);
				executor.viewOnly = true;
			}

		}
	},
	/**
	 * Сохраняет модель Question
	 * Глобалная ссылка на модель устанавливается после сохранения Question на сервере и получения
	 * @param {Function} success будет вызвана в случае успеха
	 * @param {Boolean} inEditMode в режиме редактирования уже зарегистрированого запроса
	 * @private
	 */
	_saveModel: function (success, inEditMode) {
		var me = this,
				ns = qqext,
				files = me.files;

		files.getForm().submit({
			clientValidation: false,
			url: 'rest/question',
			method: 'POST',
			params: {
				deletedFiles: Ext.encode(files.deletedFiles),
				model: Ext.encode(ns.creq.q.getData())
			},
			success: function (form, action) {
				var data = action.result.data;
				ns.creq.q = Ext.create('qqext.model.Question', data);
				ns.creq.q.files = data.files;
				me.loadRecord();
				ns.statusPanel.setStatus(ns.creq.q.get('status'));
				ns.infoChanged = true;
				success();
			},
			failure: function (form, action) {
				ns.showError("Ошибка сохранения", action.response.responseText);
				files.showFiles();
				if (inEditMode) {
					me._disableButtons(false, 1);
					me.setAdminMode();
				} else {
					me._disableButtons(false, 1, 4);
					me.setViewOnly(false);
				}
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
			if (!ns.checkDates([me.query.pd, me.applicant.dt]))
				return;
			var currentStatus = ns.creq.q.get('status'),
					inEditMode = currentStatus && currentStatus !== ns.statsId[ns.stats.onreg];

			if (inEditMode && !me.validate())
				return;

			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 3, 4);
			me.setViewOnly(true);
			me.updateRecord();

			me._saveModel(function () {
				me._disableButtons(false, 0);
			}, inEditMode);
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			ns.creq.q.destroy({
				callback: function (recs, operation) {
					if (operation.success) {
						me.files.remove();
						ns.infoChanged = true;
						ns.getButton(ns.btns.toSearch).fireEvent('click');
					} else {
						ns.showError("Ошибка удаления записи", operation.getError());
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
			if (!ns.checkDates([me.query.pd, me.applicant.dt]))
				return;
			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 3, 4);
			me.setViewOnly(true);
			me._setPD();
			var model = ns.creq.q,
					status;
			if (me.validate()) {
				var now = new Date();
				/*
				 if (me.query.mr.getValue()) { // Добавляем один день к плановой дате, если отказ
				 var plannedDateCombo = me.query.pd,
				 plannedDate = plannedDateCombo.getValue();
				 plannedDate.setDate(plannedDate.getDate() + 1);
				 plannedDateCombo.setValue(plannedDate)
				 }
				 */
				// Заполняем обязательные поля:

				if (me.query.mr.value) {
					status = ns.stats.exec;
					me.query.pd.setValue(now);
				} else
					status = ns.stats.reg;

				me.updateRecord();

				model.set('status', ns.statsId[status]);
				if (ns.isSIC) {
//				if (model.get('litera') === ns.sicId) {
					if (model.get('execOrg') === ns.sicId)
						model.set('notiStatus', ns.notiStatsId[ns.notiStats.none]);
					else
						model.set('notiStatus', ns.notiStatsId[ns.notiStats.noexec]);
				}
				model.set('registrator', ns.userId);
				model.set('regDate', now);

				me._saveModel(function () {
					ns.turnOnArticles(ns.btns.notify, ns.btns.trans);
					me._disableButtons(false, 2);
				});
			} else { // Валидация не прошла
				me._disableButtons(false, 1, 3, 4);
				me.setViewOnly(false);
			}
		}
		// Выполняет печать (переправку пользователся на открытие документа) выписки создания запроса
		function print() {
			var model = ns.creq.q;
			window.open(ns.urls.vypiska + '?prefix=' + model.get('prefix') +
					'&sufix=' + model.get('sufix') + '&litera=' + model.get('litera'));
		}
		//----------------------------------------------
		var me = this,
				ns = qqext,
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
						text: labels.print,
						action: print,
						opts: {
							hidden: !ns.isSIC,
							cls: 'print_btn'
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
				me.inbox = createCmp('VInboxDoc'),
				me.query = createCmp('VQuery'),
				me.applicant = createCmp('VApplicant'),
				me.target = createCmp('VQueryObject', {
					hidden: true
				}),
				me.files = createCmp('FAttachedFiles', 'Документы заявителя',
						'Q_VALUE_FILE_TYPE_APP_DOCS', 'rest/files', {
							allowBlank: ns.isSIC ? false : true,
							border: true,
							collapsible: true,
							collapsed: true,
							titleCollapse: true,
							animCollapse: true,
							hideCollapseTool: true,
							disabledCls: '',
							cls: 'collapse_section attached_section',
							header: {
								icon: 'images/transp.png'
							}
						})
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(0, menu);
	},
	/**
	 * Метод для выполнения операций loadRecord и updateRecord
	 * @param {String} action операция для выполнения
	 * @private
	 */
	_mAction: function (action) {
		var me = this,
				model = qqext.creq.q;
		[me.inbox, me.query, me.target].forEach(function (f) {
			f[action](model);
		});
		me.applicant[action](model);
		me.files[action](model.files);
	},
	/**
	 * Загружает данные из модели на форму
	 */
	loadRecord: function () {
		this._mAction('loadRecord');
	},
	/**
	 * Сохраняет данные формы в модели
	 */
	updateRecord: function () {
		this._mAction('updateRecord');
	},
	/**
	 * Проверяет форму на валидность (для прохождения регистрации).
	 * @returns {Boolean} показывает ошибку и возвращает false в случае не правильного заполнения формы
	 */
	validate: function () {
		var errors = [];
		this.items.each(function (form) {
			if (!(form.isHidden() || form.isValid()))
				errors.push(form.getErrors());
		});
		if (errors.length > 0) {
			qqext.showError("Форма заполнена неправильно", errors.join(''));
			return false;
		}
		return true;
	},
	/**
	 * Устанавливает плановую дату исполнения запроса.
	 * Вызывается только при регистрации запроса, перед проверкой.
	 * @private
	 */
	_setPD: function () {
		var me = this,
				date,
				pd = me.query.pd,
				vz = me.query.vz,
				value;
		if (me.inbox.executor.getValue() === qqext.sicId) {
			date = new Date();
			date.setDate(date.getDate() + 14);
			pd.setValue(date);
		} else {
			value = vz.getValue();
			if (value) {
				date = new Date();
				if (vz.getStore().getById(value).get('code') === 'Q_VALUE_QUEST_TYPE_SOCIAL') {
					date.setDate(date.getDate() + 29);
				} else {
					date.setDate(date.getDate() + 89);
				}
				pd.setValue(date);
			}
		}
	},
	/**
	 * Устанавливает определенные поля доступными для редактирования в режиме супервизора.
	 */
	setAdminMode: function () {
		this.applicant.items.getRange(1, 8).forEach(function (it, i) {
			if (i !== 4)
				it.setViewOnly(false);
		});
		this.target.items.each(function (it) {
			it.setViewOnly(false);
		});
	}
});
