/**
 * Форма исполнения запроса
 */
Ext.define('qqext.view.exec.VExecForm', {
	alias: 'VExecForm',
	extend: 'qqext.cmp.Container',
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
		activate: function(me, prev) {
			var ns = qqext;
			ns.Menu.setEditMenu(me._idx);
			if (ns.request !== me.model) {
				// Значит новый запрос (не тот который был до этого)
				me.model = ns.request;
				me._disableButtons(true, 1, 2, 3);
				me._disableButtons(!(ns.user.isAllowed(ns.rules.exec) &&
						me.model.get('status') === ns.getStatusId(ns.stats.onexec)), 0);

				me.setViewOnly(true);
				me._initData();
			}
			ns.viewport.doLayout();
		}
	},
	_initData: function() {
		var me = this,
				model = me.model;
		// Очистим все ошибки
		me.items.each(function(it) {
			it.reset();
		});
		model.getExec({callback: function(r) {
				me._ef.loadRecord(r);
				r.getWay({callback: function(r) {
						me._mf.loadRecord(r);
					}});
			}});
		[me._df, me._cf, me._mf].forEach(function(v) {
			v.setStorage();
		});
		me._df.loadRecord();
		me._cf.loadRecord();
	},
	_saveData: function(success, failure) {
		// TODO: Может стоит обновить дату и пользователя обновления запроса
		var me = this;
		me.setViewOnly(true);
		me._disableButtons(true, 0, 1, 2, 3);
		var model = me.model.getExec();
		me.updateRecord();
		model.save();
		model.getWay().save();
		me._df.sync();
		me._cf.sync();
		me._mf.sync();
		if (success)
			success();
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
			me._saveData(function() {
				me._disableButtons(false, 0);
			});
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
			var model = me.model;
			model.getExec().destroy();
			model.setExec(createCmp('ExecutionInfoModel', {id: model.get('id')}));
			me._disableButtons(true, 0, 2);
			me._disableButtons(false, 1, 3);
			me._initData();
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Регистрировать".
		 * @private
		 * @returns {undefined}
		 */
		function book() {
			if (me.validate()) {
				me._saveData(function() {
					me.model.set('status', ns.getStatusId(ns.stats.exec));
					me.model.save({callback: function(r, o, s) {
							if (s) {
								ns.statusPanel.setStatus();
							} else {
								ns.showError("Ошибка обновления статуса", o.getError());
								me._disableButtons(false, 0);
							}
						}});
				});
			} else { // Валидация не прошла
				me._disableButtons(false, 1, 2, 3);
				me.setViewOnly(false);
			}
		}
		//----------------------------------------------
		var ns = qqext,
				me = this,
				labels = ns.labels,
				createCmp = Ext.create,
				menu = createCmp('HButtonMenu', [
					{text: labels.edit, action: ns.edit},
					{text: labels.save, action: save},
					{text: labels.remove, action: remove},
					{text: labels.register, action: book}],
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
	updateRecord: function() {
		var me = this, model = me.model.getExec();
		me._ef.updateRecord(model);
		me._mf.updateRecord(model.getWay());
	},
	/**
	 * Проверяет форму на валидность (для прохождения регистрации).
	 * @returns {Boolean} показывает ошибку и возвращает false в случае не правильного заполнения формы
	 */
	validate: function() {
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
	}
});
