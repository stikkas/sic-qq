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

				[me._df, me._cf, me._mf].forEach(function(v) {
					v.setStorage();
				});

				me.model.getExec({callback: function(r) {
						me._ef.loadRecord(r);
					}});
				me.model.getWay({callback: function(r) {
						me._mf.loadRecord(r);
					}});
				me._df.loadRecord();
				me._cf.loadRecord();
				me.setViewOnly(true);
			}
			ns.viewport.doLayout();
		}
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
			// TODO: Может стоит обновить дату и пользователя обновления запроса
			var model = me.model;
			me.updateRecord();
			model.getExec().save();
			model.getWay().save();
			me._df.sync();
			me._cf.sync();
			me._mf.sync();
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Удалить"
		 * @private
		 * @returns {undefined}
		 */
		function remove() {
		}
		/**
		 * Обрабатывает событие 'click' на кнопке "Регистрировать".
		 * TODO реализовать метод
		 * @private
		 * @returns {undefined}
		 */
		function book() {
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
		var me = this;
		me._ef.updateRecord(me.model.getExec());
		me._mf.updateRecord(me.model.getWay());
	},
	isValid: function() {
		return !this.items.some(function(v) {
			return !v.isValid();
		});
	}
});
