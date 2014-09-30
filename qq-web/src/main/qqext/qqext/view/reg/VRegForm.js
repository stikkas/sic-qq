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
	 * @private
	 */
	_idx: 3,
	listeners: {
		activate: function(me, prev) {
			var ns = qqext, model;
			ns.Menu.setEditMenu(me._idx);
			if (ns.request === null) {
				// Значит событие случилось по нажатию на кнопку "Добавить"
				var
						inbox = me.inbox,
						user = ns.user,
						orgId = user.get('organization');
				me.clear();
				model = me.initModel();
				//Кнопки "Редактировать" и "Удалить"
				me._disableButtons(true, 0, 2);
				//Кнопки "Сохранить" и "Регистрировать"
				me._disableButtons(false, 1, 3);
				// Устанавливаем режим редактирования
				me.setViewOnly(false);
				// Литера
				model.set('litera', orgId);
				if (!ns.isSIC) {
					var executor = inbox.executor;
					executor.setViewOnly(true);
					executor.viewOnly = true;
					model.set('execOrg', orgId);
				}
				me.loadRecord();
			} else if (prev === ns.searchForm || prev === ns.jvkForm) {
// Значит пришли по двойному клику на существуещем запросе, (открыли существующий запрос)
				me.clear();
				model = me.initModel(ns.request);
				me._disableButtons(true, 1, 2, 3);
				me._disableButtons(!(ns.user.isAllowed(ns.rules.reg) &&
						model.get('status') === ns.getStatusId(ns.stats.onreg)), 0);
				model.getAppl({callback: function() {
						me.setViewOnly(true);
						me.loadRecord();
					}});
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
	 * @private
	 */
	_saveModel: function(success, fail1, fail2) {
		var me = this, model = me.model,
				ns = qqext;
		model.save({callback: function(recs, operation, status) {
				if (status) {
					if (!model.get('id')) { // Новая модель(загружаем, чтобы правильно работали ассоциации)
						ns.model.Question.load(operation.response.responseText,
								{success: function(record) {
										record.getAppl().save({callback: function(r, o, s) {
												if (!s) {
													ns.showError("Данные о заявители не сохранены",
															o.getError());
													me.setViewOnly(false);
													// Провал на втором уровне
													fail2();
												} else {
													// Полный успех. Сохраняем файлы
													me.files.loadRecord(record.files(), true);
													me.files.save(record.get('id'), function() {
														success();
														ns.statusPanel.setStatus();
													}, function() {
														me.setViewOnly(false);
														// Провал на втором уровне
														fail2();
													});
												}
											}});

										ns.request = me.model = record;
									},
									failure: function(r, o) {
										ns.showError("Ошибка загрузки нового запроса", o.getError());
										me.setViewOnly(false);
										fail2();
									}});
					} else {
						model.getAppl().save({callback: function(r, o, s) {
								if (!s) {
									ns.showError("Данные о заявители не сохранены",
											o.getError());
									me.setViewOnly(false);
									// Провал на втором уровне
									fail2();
								} else {
									// Полный успех. Сохраняем файлы
									me.files.save(model.get('id'), function() {
										success();
										ns.statusPanel.setStatus();
									}, function() {
										me.setViewOnly(false);
										// Провал на втором уровне
										fail2();
									});
								}
							}
						});
					}
				} else {
					ns.showError("Ошибка сохранения запроса", operation.getError());
					me.setViewOnly(false);
					// Провал на первом уровне
					fail1();
				}
			}
		});
	},
	initComponent: function() {
		//----------обработчики для кнопок меню---------
		//sc - контекст для обработчика

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 * @returns {undefined}
		 */
		function save() {
			var me = this,
					model = me.model,
					user = ns.user,
					userId = user.get('userId'),
					now = new Date();
			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			me.updateRecord();
			// Заполняем обязательные поля:
			if (!model.get('id')) { // Только для новых моделей
				model.set('insertUser', userId);
				model.set('insertDate', now);
				model.set('createOrg', user.get('organization'));
			}
			model.set('updateUser', userId);
			model.set('updateDate', now);
			model.set('status', ns.getStatusId(ns.stats.onreg));
			me._saveModel(function() {
				me._disableButtons(false, 0);
			}, function() {
				me._disableButtons(false, 1, 3);
			}, function() {
				me._disableButtons(false, 1, 2, 3);
			});
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			var me = this;
			me.model.destroy({
				callback: function(recs, operation) {
					if (operation.success) {
						me.files.remove();
						me.model = ns.request = null;
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
			// Кнопки сохранить, удалить и регистрировать
			me._disableButtons(true, 1, 2, 3);
			me.setViewOnly(true);
			var model = me.model, status;
			if (me.validate()) {
				var userId = ns.user.get('userId'),
						now = new Date();
				me.updateRecord();
				// Заполняем обязательные поля:

				if (model.get('litera') !== model.get('execOrg'))
					status = ns.stats.trans;
				else
					status = ns.stats.reg;
				model.set('status', ns.getStatusId(status));
				if (!ns.request) {// Еще не сохраненная модель
					model.set('insertUser', userId);
					model.set('insertDate', now);
				}

				model.set('updateUser', userId);
				model.set('updateDate', now);
				model.set('registrator', userId);
				model.set('regDate', now);
				me._saveModel(function() {
					me.loadRecord(true);
					ns.turnOnArticles(ns.btns.notify, ns.btns.trans);
				}, function() { // Не смогли сохранить ничего
					me._disableButtons(false, 1, 3);
				}, function() { // Не смогли сохранить заявителя
					me._disableButtons(false, 1, 2, 3);
				});
			} else { // Валидация не прошла
				me._disableButtons(false, 1, 2, 3);
				me.setViewOnly(false);
			}
		}
//----------------------------------------------
		var me = this,
				ns = qqext,
				labels = ns.labels,
				createCmp = Ext.create,
				menu = createCmp('HButtonMenu', [
					{text: labels.edit, action: ns.edit, opts: {cls: 'edit_btn'}},
					{text: labels.save, action: save, opts: {cls: 'save_btn'}},
					{text: labels.remove, action: remove, opts: {cls: 'remove_btn'}},
					{text: labels.register, action: book, opts: {cls: 'reg_btn'}}],
						'ToolButton', me);
		Ext.applyIf(me, {items: [
				me.inbox = createCmp('VInboxDoc'),
				me.query = createCmp('VQuery'),
				me.applicant = createCmp('VApplicant'),
				me.target = createCmp('VQueryObject', {hidden: true}),
				me.files = createCmp('FAttachedFiles', 'Документы заявителя',
						'Q_VALUE_FILE_TYPE_APP_DOCS', ns.atpaths.fappl,
						ns.atpaths.uappl, {
							border: true,
							collapsible: true,
							collapsed: true,
							titleCollapse: true,
							animCollapse: true,
							hideCollapseTool: true,
							disabledCls: '',
							cls: 'collapse_section',
							header: {
								icon: 'images/transp.png'
							}
						})
			]});
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
	_mAction: function(action, withoutFiles) {
		var me = this,
				model = me.model;
		[me.inbox, me.query,
			me.target].forEach(function(f) {
			f[action](model);
		});
		me.applicant[action](model.getAppl());
		if (!withoutFiles)
			me.files[action](model.files());
	},
	/**
	 * Загружает данные из модели на форму
	 * @param {Boolean} withoutFiles не загружать модель файлов
	 */
	loadRecord: function(withoutFiles) {
		this._mAction('loadRecord', withoutFiles);
	},
	/**
	 * Сохраняет данные формы в модели
	 */
	updateRecord: function() {
		this._mAction('updateRecord');
	},
	/**
	 * Инициализирует модель для формы, если глобальная модель не задана, то создается новая
	 * @param {qqext.model.Question} model если задана то модель формы инициализируется ей
	 * @returns {qqext.model.Question} модель
	 */
	initModel: function(model) {
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
	validate: function() {
		var errors = [];
		this.items.each(function(form) {
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
	reset: function() {
		this.items.each(function(form) {
			form.reset();
		});
	},
	/**
	 * Приводит форму к первоначальному состоянию,
	 * без данных
	 */
	clear: function() {
		var me = this;
		me.reset();
		me.target.hide();
		me.applicant.appType.setValue(null);
		me.applicant.collapseAdds();
		qqext.statusPanel.setStatus('');
		me.doLayout();
	}
});
