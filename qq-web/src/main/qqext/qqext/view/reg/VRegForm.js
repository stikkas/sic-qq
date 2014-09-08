/**
 * Форма "Регистрация запроса" карточки запроса. Эта форма владеет кнопками меню
 * "Редактировать", "Сохранить", "Удалить", "Регистрировать".
 */

Ext.define('qqext.view.reg.VRegForm', {
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
				menus = ns.createHButtonMenu([
					{text: labels.edit, action: edit},
					{text: labels.save, action: save},
					{text: labels.remove, action: remove},
					{text: labels.register, action: book}]);

		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.reg.VInboxDoc'),
				Ext.create('qqext.view.reg.VQuery'),
				me.applicant = Ext.create('qqext.view.reg.VApplicant'),
				Ext.create('qqext.view.reg.VQueryObject'),
				Ext.create('qqext.view.reg.VFiles')
			],
			menus: menus
		});
		me.callParent(arguments);
		ns.Menu.editReqMenu.insert(0, me.menus);

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

		me.setModel();
	},
	/**
	 * Настраивает модель для формы
	 */
	setModel: function() {
		var model = this.model = Ext.create('qqext.model.qq.Question');
		model.setNotification(Ext.create('qqext.model.qq.Notification'));
		model.setApplicant(Ext.create('qqext.model.qq.Applicant'));
		model.setTransmission(Ext.create('qqext.model.qq.Transmission'));
		model.setExecutionInfo(Ext.create('qqext.model.qq.ExecutionInfo'));
		model.setWayToSend(Ext.create('qqext.model.qq.WayToSend'));
		this.loadRecord();
	},
	getModel: function() {
		if (this.model)
			this.setModel();
		return this.model;
	}
});
