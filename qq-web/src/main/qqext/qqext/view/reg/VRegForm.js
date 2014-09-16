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
		'qqext.model.qq.Question',
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
				// Кнопки подразделов
				me._disableArticles(btns.notify, btns.trans, btns.exec);
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
	 * Выключает кнопки левого меню
	 * @private
	 */
	_disableArticles: function() {
		for (var i = 0; i < arguments.length; ++i)
			qqext.getButton(arguments[i]).setDisabled(true);
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
					statusId,
					userId = qqext.user.get('userId'),
					now = new Date();
			// Кнопки сохранить и регистрировать
			me._disableButtons(true, 1, 3);
			me.setViewOnly(true);
			me.updateRecord();

			// Заполняем обязательные поля:
			if (!model.get('insertUser')) {
				model.set('insertUser', userId);
				model.set('insertDate', now);
			}
			model.set('updateUser', userId);
			model.set('updateDate', now);

			Ext.getStore('Q_DICT_QUESTION_STATUSES').
					findBy(function(record, id) {
						if (record.get('code') === 'Q_VALUE_QSTAT_ONREG') {
							statusId = id;
							return true;
						}
						return false;
					});
			model.set('status', statusId);
			if (model.get('id') === 0) // Еще ни разу не сохраняли
				model.set('id', null);
			model.save({callback: function(records, operation, status) {
					if (status) {
						if (!model.get('id')) {
							model.set('id', operation.response.responseText)
							ns.request = model;
						}
						// кнопка удалить
						me._disableButtons(false, 2);
					} else {
						me.showError("Ошибка сохранения на сервер", operation.getError());
					}
					// Кнопки сохранить и регистрировать
					me._disableButtons(false, 1, 3);
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
			var me = this;
			me.model.destroy({
				callback: function(records, operation, success) {
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
		 * TODO реализовать метод
		 * @private
		 * @returns {undefined}
		 */
		function book() {
			console.log(this);
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
		Ext.applyIf(me, {
			items: [
				me.inbox = createCmp('VInboxDoc'),
				createCmp('VQuery'),
				me.applicant = createCmp('VApplicant'),
				me.target = createCmp('VQueryObject', {hidden: true}),
				createCmp('VFiles')
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(0, menu);
		var execModelAction = function(action) {
			var max = me.items.length, i = 0, item,
					model = me.model;
			for (; i < max; ++i) {
				item = me.items.getAt(i);
				if (item !== me.applicant)
					item[action](model);
				else {
					var applicant = model.getApplicant();
					if (applicant) {
						item[action](applicant);
					}
				}
			}
		};
		this.loadRecord = function() {
			console.log("loadRecord")
			execModelAction('loadRecord');
		};
		this.updateRecord = function() {
			console.log("update record");
			execModelAction('updateRecord');
		};
	},
	/**
	 * Инициализируем модель
	 */
	initModel: function() {
		var createCmp = Ext.create,
				model = this.model = createCmp('QuestionModel');
		model.setNotification(createCmp('NotificationModel'));
		model.setApplicant(createCmp('ApplicantModel'));
		model.setTransmission(createCmp('TransmissionModel'));
		model.setExecutionInfo(createCmp('ExecutionInfoModel'));
		model.setWayToSend(createCmp('WayToSendModel'));
	},
	/**
	 * Отдает модель привязанную к форме
	 * @param {Boolean} create Создавать ли новую модель?
	 * @returns {qqext.model.qq.Question} модель
	 */
	getModel: function(create) {
		if (create || !this.model)
			this.initModel();
		return this.model;
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
	}
});
