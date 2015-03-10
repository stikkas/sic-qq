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
			if (ns.request === null) {
				// Значит событие случилось по нажатию на кнопку "Добавить"
				me.clear();
				model = me.initModel();
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
				me.clear();
				model = me.initModel(ns.request);
				me._disableButtons(true, 1, 3, 4);

				var hasRegRule = ns.reg,
						wantedStatus = model.get('status') === ns.statsId[ns.stats.onreg],
						belongToCreator = model.get('litera') === ns.orgId;

				me._disableButtons(!(hasRegRule && wantedStatus && belongToCreator ||
						(!wantedStatus && ns.visor)), 0); // Редактировать
				me._disableButtons(!(hasRegRule && !wantedStatus && belongToCreator), 2); // Печать

				model.getAppl({
					callback: function () {
						me.setViewOnly(true);
						me.loadRecord();
					}
				});
				ns.initRequired(me);
			}

			if (!ns.isSIC) {
				var executor = me.inbox.executor;
				executor.setViewOnly(true);
				executor.viewOnly = true;
			}

		}
	},
	/**
	 * Сохраняет модель Question с Applicant
	 * Глобалная ссылка на модель устанавливается после сохранения Question на сервере и получения
	 * id от сервера.
	 * @param {Function} success будет вызвана в случае полного успеха, т.е. после сохранения Applicant
	 * @param {Function} fail1 будет вызвана в случае несохранения Question, т.е. ничего не сохранилось
	 * @param {Function} fail2 будет вызвана в случае несохранения Applicant, т.е. Question сохранилось
	 * @param {Boolean} inEditMode в режиме редактирования уже зарегистрированого запроса
	 * @private
	 */
	_saveModel: function (success, fail1, fail2, inEditMode) {
		var me = this,
				model = me.model,
				ns = qqext;
		model.save({
			callback: function (record, operation, status) {
				if (status) {
					qqext.model.Question.load(record.get('id'), {callback: function (model) {
							ns.request = me.model = model;
//							model.getAppl().set('id', model.get('id'));

							// Полный успех. Сохраняем файлы
							me.loadRecord(true);
							me.files.loadRecord(model.files(), true);
							me.files.save(model.get('id'), function () {
								success();
								ns.statusPanel.setStatus();
								ns.infoChanged = true;
							}, function () {
								if (inEditMode)
									me.setAdminMode();
								else
									me.setViewOnly(false);
								// Провал на втором уровне
								fail2();
							});
						}});

				} else {
					ns.showError("Ошибка сохранения запроса", operation.getError());
					if (inEditMode)
						me.setAdminMode();
					else
						me.setViewOnly(false);
					// Провал на первом уровне
					fail1();
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
			var model = me.model,
					now = new Date(),
					year = now.getYear() + 1900,
					currentStatus = model.get('status'),
					inEditMode = currentStatus && currentStatus !== ns.statsId[ns.stats.onreg];

			if (inEditMode && !me.validate())
				return;

			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 3, 4);
			me.setViewOnly(true);
			me.updateRecord();

			if (!inEditMode)
				model.set('status', ns.statsId[ns.stats.onreg]);
			// Заполняем обязательные поля:
			if (!model.get('id')) { // Только для новых моделей
				model.set('createOrg', ns.orgId);
				me._saveModel(function () {
					me._disableButtons(false, 0);
				}, function () {
					me._disableButtons(false, 1, 4);
				}, function () {
					me._disableButtons(false, 1, 3, 4);
				});
			} else {
				me._saveModel(function () {
					me._disableButtons(false, 0);
				}, function () {
					if (inEditMode)
						me._disableButtons(false, 1);
					else
						me._disableButtons(false, 1, 4);
				}, function () {
					if (inEditMode)
						me._disableButtons(false, 1);
					else
						me._disableButtons(false, 1, 3, 4);
				}, inEditMode);
			}
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			//			var me = this;
			me.model.destroy({
				callback: function (recs, operation) {
					if (operation.success) {
						me.files.remove();
						me.model = ns.request = null;
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
			var model = me.model,
					status;
			if (me.validate()) {
				var userId = ns.userId,
						now = new Date();
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
				if (model.get('litera') === ns.sicId) {
					if (model.get('execOrg') === ns.sicId)
						model.set('notifyStatus', ns.notiStatsId[ns.notiStats.none]);
					else
						model.set('notifyStatus', ns.notiStatsId[ns.notiStats.noexec]);
				}
				model.set('registrator', userId);
				model.set('regDate', now);

				me._saveModel(function () {
					ns.turnOnArticles(ns.btns.notify, ns.btns.trans);
					me._disableButtons(false, 2);
				}, function () { // Не смогли сохранить ничего
					me._disableButtons(false, 1, 4);
				}, function () { // Не смогли сохранить заявителя
					me._disableButtons(false, 1, 3, 4);
				});
//					}
			} else { // Валидация не прошла
				me._disableButtons(false, 1, 3, 4);
				me.setViewOnly(false);
			}
		}
		// Выполняет печать (переправку пользователся на открытие документа) выписки создания запроса
		function print() {
			var model = me.model;
			window.open(ns.urls.vypiska + '?prefix=' + model.get('prefixNum') +
					'&sufix=' + model.get('sufixNum') + '&litera=' + model.get('litera'));
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
						'Q_VALUE_FILE_TYPE_APP_DOCS', ns.atpaths.fappl,
						ns.atpaths.uappl, {
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
	 * @param {Boolean} withoutFiles не загружать модель файлов
	 * @private
	 */
	_mAction: function (action, withoutFiles) {
		var me = this,
				model = me.model;
		[me.inbox, me.query,
			me.target
		].forEach(function (f) {
			f[action](model);
		});
		if (!withoutFiles) {
			me.applicant[action](model.getAppl());
			me.files[action](model.files());
		}
	},
	/**
	 * Загружает данные из модели на форму
	 * @param {Boolean} withoutFiles не загружать модель файлов
	 */
	loadRecord: function (withoutFiles) {
		this._mAction('loadRecord', withoutFiles);
	},
	/**
	 * Сохраняет данные формы в модели
	 */
	updateRecord: function () {
		this._mAction('updateRecord');
	},
	/**
	 * Инициализирует модель для формы, если глобальная модель не задана, то создается новая
	 * @param {qqext.model.Question} model если задана то модель формы инициализируется ей
	 * @returns {qqext.model.Question} модель
	 */
	initModel: function (model) {
		var me = this;
		if (model)
			return me.model = model;
		var createCmp = Ext.create,
				model = me.model = createCmp('QuestionModel');
		model.setAppl(createCmp('ApplicantModel'));
		return model;
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
	 * Сбрасывает все ошибки
	 */
	reset: function () {
		this.items.each(function (form) {
			form.reset();
		});
	},
	/**
	 * Приводит форму к первоначальному состоянию,
	 * без данных
	 */
	clear: function () {
		var me = this;
		me.reset();
		me.target.hide();
		me.applicant.appType.setValue(null);
		qqext.statusPanel.setStatus('');
		me.doLayout();
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
