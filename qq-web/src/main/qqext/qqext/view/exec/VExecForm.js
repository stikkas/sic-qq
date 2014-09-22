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
	maxHeight: 1200,
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
				me.loadRecord();
				me.setViewOnly(true);
				me._disableButtons(true, 1, 2, 3);
				me._disableButtons(!(ns.user.isAllowed(ns.rules.exec) &&
						me.model.get('status') === ns.getStatusId(ns.stats.onexec)), 0);

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
				me._eForm = createCmp('VExecInfo'),
				me._dForm = createCmp('VDeliveryOfDocuments'),
				createCmp('VCoordination'),
				createCmp('VDeliveryMethod')
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(3, menu);
	},
	loadRecord: function() {
		var me = this;
		me._eForm.loadRecord(me.model.getExec());
		me._dForm.loadRecord();
	},
	updateRecord: function() {
		var me = this;
		me._eForm.updateRecord(me.model.getExec());
		me._dForm.updateloadRecord();
	},
	validate: function() {

	}
});
