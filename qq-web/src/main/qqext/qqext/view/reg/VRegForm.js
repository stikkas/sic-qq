/**
 * Форма "Регистрация запроса" карточки запроса. Эта форма владеет кнопками меню
 * "Редактировать", "Сохранить", "Удалить", "Регистрировать".
 */

Ext.define('qqext.view.reg.VRegForm', {
	alias: 'VRegForm',
	extend: 'Ext.container.Container',
	requires: [
		'qqext.view.reg.VInboxDoc',
		'qqext.view.reg.VQuery',
		'qqext.view.reg.VApplicant',
		'qqext.view.reg.VQueryObject',
		'qqext.view.reg.VFiles',
		'qqext.model.qq.Question',
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
	listeners: {
		activate: function(me, prev) {
			var ns = qqext;
			ns.Menu.setEditMenu(me._idx);
			if (ns.request === null) {
				// Значит событие случилось по нажатию на кнопку "Добавить"
				var buttons = me.menu.items,
						model = me.getModel(true),
						inbox = me.inbox,
						user = ns.user,
						orgId = user.get('organization'),
						btns = ns.btns;

				//Кнопка "Редактировать"
				buttons.getAt(0).setDisabled(true);
				//Кнопка "Удалить"
				buttons.getAt(2).setDisabled(true);
				me._disableArticles(btns.notify, btns.trans, btns.exec);
				// Литера
				model.set('litera', orgId);
				model.set('registrator', user.get('userId'));
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
			this.setDisabled(!this.isDisabled());
			this.doLayout();
		}

		/**
		 * Обрабатывает событие 'click' на кнопке "Сохранить"
		 * @private
		 * @returns {undefined}
		 */
		function save() {
			this.updateRecord()
			ns.mainController.syncModel()
					.getModel().save(function(rec, op, suc) {
				console.log('is saving success?: ' + suc);
			});
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			ns.mainController.syncModel()
					.getModel().destroy({
				success: function() {
					ns.getButton('search').fireEvent('click');
				},
				failure: function() {
					alert('Ошибка при удалении');
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
				menu = ns.createHButtonMenu([
					{text: labels.edit, action: edit},
					{text: labels.save, action: save},
					{text: labels.remove, action: remove},
					{text: labels.register, action: book}]);

		Ext.applyIf(me, {
			items: [
				me.inbox = Ext.create('VInboxDoc'),
				Ext.create('VQuery'),
				me.applicant = Ext.create('VApplicant'),
				me.target = Ext.create('VQueryObject', {hidden: true}),
				Ext.create('VFiles')
			],
			menu: menu
		});
		me.callParent(arguments);
		ns.Menu.editReqMenu.insert(0, me.menu);

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
			execModelAction('loadRecord');
		};
		this.updateRecord = function() {
			execModelAction('updateRecord');
		};
	},
	/**
	 * Инициализируем модель
	 */
	initModel: function() {
		var model = this.model = Ext.create('qqext.model.qq.Question');
		model.setNotification(Ext.create('qqext.model.qq.Notification'));
		model.setApplicant(Ext.create('qqext.model.qq.Applicant'));
		model.setTransmission(Ext.create('qqext.model.qq.Transmission'));
		model.setExecutionInfo(Ext.create('qqext.model.qq.ExecutionInfo'));
		model.setWayToSend(Ext.create('qqext.model.qq.WayToSend'));
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
	}
});
