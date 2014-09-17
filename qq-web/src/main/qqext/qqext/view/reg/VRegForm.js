/**
 * Форма "Регистрация запроса" карточки запроса. Эта форма владеет кнопками меню
 * "Редактировать", "Сохранить", "Удалить", "Регистрировать".
 */

Ext.define('qqext.view.reg.VRegForm', {
	alias: 'VRegForm',
	extend: 'qqext.cmp.Container',
	requires: [
		'qqext.view.reg.VInboxDoc',
		'qqext.view.reg.VQuery',
		'qqext.view.reg.VApplicant',
		'qqext.view.reg.VQueryObject',
		'qqext.view.reg.VFiles',
		'qqext.model.Question',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
		'qqext.Menu'
	],
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
	// Состояние кнопок меню
	_btnstate: [],
	//Кнопки меню
	_btns: null,
	// Сохранить состояние кнопок
	_saveBtnState: function() {
		var i = 0,
				btns = this._btns,
				states = this._btnstate,
				max = btns.length;
		for (; i < max; ++i)
			states[i] = btns.getAt(i).isDisabled();
	},
	// Восстановить состояние кнопок
	_loadBtnState: function() {
		var i = 0,
				btns = this._btns,
				states = this._btnstate,
				max = btns.length;
		for (; i < max; ++i)
			btns.getAt(i).setDisabled(states[i]);
	},
	listeners: {
		activate: function(me, prev) {
			var ns = qqext;
			ns.Menu.setEditMenu(me._idx);
			if (ns.request === null) {
				// Значит событие случилось по нажатию на кнопку "Добавить"
				var
						model = me.getModel(true),
						inbox = me.inbox,
						user = ns.user,
						orgId = user.get('organization'),
						btns = ns.btns;
				//Кнопки "Редактировать" и "Удалить"
				me._disableButtons(true, 0, 2);
				//Кнопки "Сохранить" и "Регистрировать"
				me._disableButtons(false, 1, 3);
				// Устанавливаем режим редактирования
				me.setViewOnly(false);
				// Кнопки подразделов
				me._disableArticles(true, btns.notify, btns.trans, btns.exec);
				// Литера
				model.set('litera', orgId);
				if (!ns.isSIC) {
					var executor = inbox.executor;
					executor.setViewOnly(true);
					executor.viewOnly = true;
					model.set('execOrg', orgId);
				}
			} else if (prev === ns.searchForm || prev === ns.jvkForm) {
// Значит пришли по двойному клику на существуещем запросе
			} else {
// Переключаемся между вкладками одного запроса
			}
			me.loadRecord();
		}
	},
	/**
	 * Выключает/Включает кнопки левого меню
	 * @param {Boolean} status true - сделать не активным
	 * @private
	 */
	_disableArticles: function(status) {
		for (var i = 1; i < arguments.length; ++i)
			qqext.getButton(arguments[i]).setDisabled(status);
	},
	/**
	 * Устанавливает режим доступности для нескольки элементов
	 * @param {Boolean} mode режим в который установить все другие параметры метода
	 * Остальные параметры передаются индексами, которые соотвествуют this._btns
	 * @private
	 */
	_disableButtons: function(mode) {
		var i = 1, max = arguments.length, btns = this._btns;
		for (; i < max; ++i)
			btns.getAt(arguments[i]).setDisabled(mode);
	},
	initComponent: function() {
		//----------обработчики для кнопок меню---------
		//sc - контекст для обработчика
		/**
		 * Обрабатывает событие 'click' на кнопке "Редактировать"
		 * @private
		 * @returns {undefined}
		 */
		function edit() {
			//TODO: разобраться что эта функция должна делать
		}

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
					now = new Date(),
					applicant = model.getAppl();
			// Кнопки сохранить и регистрировать
			me._disableButtons(true, 1, 3);
			me.setViewOnly(true);
			me.updateRecord();
			// Заполняем обязательные поля:
			if (!model.get('id')) { // Только для новых моделей
				model.set('insertUser', userId);
				model.set('insertDate', now);
				model.set('createOrg', user.get('organization'))
			}
			model.set('updateUser', userId);
			model.set('updateDate', now);
			model.set('status', me._getStatusId('Q_VALUE_QSTAT_ONREG'));
			model.save({callback: function(recs, operation, status) {
					if (status) {
						if (!model.get('id')) {
							var id = operation.response.responseText;
							model.set('id', id)
							applicant.set('id', id);
							ns.request = model;
						}
						applicant.save({callback: function(r, o, s) {
								if (!s)
									me.showError("Данные о заявители не сохранены",
											o.getError());
								// Кнопки сохранить, удалить и регистрировать
								me._disableButtons(false, 1, 2, 3);
								me.setViewOnly(false);
							}
						});
					} else {
						me.showError("Ошибка сохранения на сервер", operation.getError());
						// Кнопки сохранить и регистрировать
						me._disableButtons(false, 1, 3);
						me.setViewOnly(false);
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
			var me = this;
			me.model.destroy({
				callback: function(recs, operation) {
					if (operation.success) {
						me.model = ns.request = null;
						ns.getButton(ns.btns.toSearch).fireEvent('click');
					} else {
						me.showError("Ошибка удаления записи", operation.getError());
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
			var model = me.model,
					applicant = model.getAppl();
			if (me.validate()) {
				var userId = ns.user.get('userId'),
						now = new Date();
				me.updateRecord();
				// Заполняем обязательные поля:
				model.set('status', me._getStatusId('Q_VALUE_QSTAT_REG'));
				if (!ns.request) {// Еще не сохраненная модель
					model.set('insertUser', userId);
					model.set('insertDate', now);
				}
				model.set('updateUser', userId);
				model.set('updateDate', now);
				model.set('registrator', userId);
				model.set('regDate', now);
				model.save({callback: function(rec, op, success) {
						if (!success) {
							me.showError("Ошибка сохранения на сервер", op.getError());
							model.set('status', me._getStatusId('Q_VALUE_QSTAT_ONREG'));
							me._disableButtons(false, 1, 2, 3);
							me.setViewOnly(false);
						} else { // Переходим на другую вкладку приналичии прав
							var id = op.response.responseText;
							if (!ns.request)
								model.set('id', id);
							me._saveApplicant(function() {
								ns.model.Question.load(id, {callback: function(record, op, status) {
										if (status) {
											applicant = model.getAppl();
											model = ns.request = me.model = record;
											model.setAppl(applicant);
											me.loadRecord();
											if (model.get('litera') !== model.get('execOrg')) {
												// Значит сотрудник из СИЦ назначил задачу архиву
												var notifyButton = ns.getButton(ns.btns.notify);
												notifyButton.setDisabled(false);
												notifyButton.fireEvent('click');
											}
											if (ns.user.isAllowed("Q_RULE_COORDINATOR")) {
												// Открываем закладку для передачи на исполнение
												var transButton = ns.getButton(ns.btns.trans);
												transButton.setDisabled(false);
												if (!notifyButton)
													transButton.fireEvent('click');
											}

										} else {
											me.showError("Ошибка получения данных", o.getError());
										}
									}
								});
							});
						}
					}});
			} else { // Валидация не прошла
				model.set('status', me._getStatusId('Q_VALUE_QSTAT_ONREG'));
				me._disableButtons(false, 1, 2, 3);
				me.setViewOnly(false);
			}
		}
//----------------------------------------------
		var me = edit.sc = save.sc = remove.sc = book.sc = this,
				ns = qqext,
				labels = ns.labels,
				createCmp = Ext.create,
				menu = createCmp('HButtonMenu', [
					{text: labels.edit, action: edit},
					{text: labels.save, action: save},
					{text: labels.remove, action: remove},
					{text: labels.register, action: book}],
						'ToolButton');
		me._forms = [me.inbox = createCmp('VInboxDoc'),
			me.query = createCmp('VQuery'),
			me.applicant = createCmp('VApplicant'),
			me.target = createCmp('VQueryObject', {hidden: true}),
			createCmp('VFiles')
		];
		Ext.applyIf(me, {items: me._forms, });
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(0, menu);
	},
	/**
	 *
	 * @param {Function} fn функция вызываемая при успешном сохранении
	 * @returns {undefined}
	 * @private
	 */
	_saveApplicant: function(fn) {
		var me = this,
				appl = me.model.getAppl();
		appl.set('id', me.model.get('id'));
		appl.save({callback: function(r, o, s) {
				if (!s) {
					me.showError("Ошибка при сохранении данных заявителя", o.getError());
					me._disableButtons(false, 1, 2, 3);
					me.setViewOnly(false);
				} else {
					fn.apply(me, []);
				}
			}
		});
	},
	_loadApplicant: function() {
		var me = this,
				id = me.model.get('id');
		qqext.model.Applicant.load(id, {callback: function(r, o, s) {
				if (s) {
					me.model.setAppl(r);
					me.loadRecord();
				}
			}
		});
	},
	/**
	 * Метод для выполнения операций loadRecord и updateRecord
	 * @param {String} action операция для выполнения
	 * @private
	 */
	_mAction: function(action) {
		var me = this,
				model = me.model;
		[me.inbox, me.query, me.target].forEach(function(f) {
			f[action](model);
		});
		me.applicant[action](model.getAppl());
	},
	/**
	 * Загружает данные из модели на форму
	 */
	loadRecord: function() {
		this._mAction('loadRecord');
	}
	,
	/**
	 * Сохраняет данные формы в модели
	 */
	updateRecord: function() {
		this._mAction('updateRecord');
	},
	/**
	 * Инициализируем модель
	 */
	initModel: function() {
		var createCmp = Ext.create,
				model = this.model = createCmp('QuestionModel');
		model.setAppl(createCmp('ApplicantModel'));
	},
	/**
	 * Выполняет дествия над всеми ассоциациями модели
	 * @param {Function} onOne функция для ассоциации hasOne
	 * @param {Function} onMany функция для ассоциации hasMany
	 */
	_onAllModels: function(onOne, onMany) {
		var associations = this.model.associations.items,
				i = 0, max = associations.length,
				association;
		for (; i < max; ++i) {
			association = associations[i];
			if (association.type === 'hasOne') {
				onOne.apply(this, [association.model]);
			} else { // Проверку не делаю, т.к. на данный момент у нас только два вида асоциации
				onMany.apply(this, [association.name]);
			}
		}
	},
	/**
	 * Отдает модель привязанную к форме
	 * @param {Boolean} create Создавать ли новую модель?
	 * @returns {qqext.model.Question} модель
	 */
	getModel: function(create) {
		if (create || !this.model)
			this.initModel();
		return this.model;
	},
	/**
	 * Проверяет форму на валидность (для прохождения регистрации).
	 * @returns {Boolean} показывает ошибку и возвращает false в случае не правильного заполнения формы
	 */
	validate: function() {
		var forms = this._forms,
				i = 0,
				max = forms.length,
				errors = [], form;
		for (; i < max; ++i) {
			form = forms[i];
			if (!(form.isHidden() || form.isValid())) {
				errors.push(form.getErrors());
			}
		}
		if (errors.length > 0) {
			this.showError("Форма заполнена неправильно", errors.join(''));
			return false;
		}
		return true;
	},
	showError: function(title, message) {
		Ext.Msg.show({
			title: title,
			msg: message,
			buttons: Ext.Msg.OK,
			icon: Ext.Msg.ERROR,
			cls: 'err_msg',
			maxWidth: 1000
		});
	},
	/**
	 * Возвращает id статуса запроса для заданного кодового значения
	 * @param {String} code код для статуса
	 * @returns {Number/undefined} номер id соответстующего коду
	 * @private
	 */
	_getStatusId: function(code) {
		var statusId;
		Ext.getStore('Q_DICT_QUESTION_STATUSES').
				findBy(function(record, id) {
					if (record.get('code') === code) {
						statusId = id;
						return true;
					}
					return false;
				});
		return statusId;
	}
});
