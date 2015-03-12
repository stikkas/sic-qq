/**
 * Форма журнала входящей корреспонденции
 */

Ext.define('qqext.view.journal.VJournalForm', {
	alias: 'VJournalForm',
	extend: 'Ext.grid.Panel',
	requires: [
		'Ext.data.Store',
		'Ext.grid.column.Date',
		'Ext.util.Filter',
		'qqext.factory.ComboBox',
		'qqext.factory.Label',
		'qqext.factory.TextField',
		'qqext.model.Question',
		'qqext.store.ArchiveJvk',
		'qqext.store.SicJvk',
		'Ext.toolbar.Paging',
		'hawk_common.cmp.DateField'
	],
	width: '100%',
	forceFit: true,
	overflowY: 'auto',
	//maxHeight: 300,
	draggable: false,
	margin: '0 5 10 5',
	cls: 'journal_st',
	border: true,
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.jvk));
			ns.Menu.editMenu.items.getAt(0).items.getAt(2).show();
			ns.Menu.editMenu.items.getAt(0).items.getAt(1).hide();
			ns.updateInfo();
		}
	},
	viewConfig: {
		getRowClass: function (record) { // Здесь статус - описание статуса на не код
			var ns = qqext,
					statsName = ns.statsName,
					stats = ns.stats,
					status = record.get('status');
			var date = record.get('controlDate');
			if (!date) {
				date = record.get('planDate');
			}
			if (date && status !== statsName[stats.onreg] &&
					status !== statsName[stats.exec]) {
				var delta = parseInt((date - new Date()) / qqext.msPday);
				if (delta <= 0)
					return 'immediate';
				if (delta < 3)
					return 'urgent';
			}
			return '';
		}
	},
	/**
	 * @property {Ext.util.Filter[]} fltrs
	 * Фильтры, которые будут применяться в зависимости от пользователя, который работает с системой
	 * @private
	 */
	_fltrs: [],
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 0,
	/**
	 * Очищает поля поиска
	 */
	clearCriterias: function () {
		var columns = this.columns,
				max = columns.length, i = 0;
		for (; i < max; ++i) {
			columns[i].items.get(0).setValue(null);
		}
	},
	/**
	 * Приводит форму в первоначальное состояние
	 */
	reset: function () {
		var store = this.store;
		store.filters.clear();
		store.addFilter(this._fltrs);
		this.clearCriterias();
		store.loadPage(1);
	},
	/**
	 * Запускает процесс поиска данных на сервере
	 * @deprecated за ненадобностью
	 */
	/*
	 exec: function () {
	 var store = this.getStore();
	 this._fltrs.forEach(function (fltr) {
	 var exists = false;
	 store.filters.each(function (f) {
	 if (f.property === fltr.property) {
	 exists = true;
	 return false;
	 }
	 });
	 if (!exists)
	 store.addFilter(fltr);
	 });
	 store.reload();
	 },
	 */
	applyFilter: function () {
		var me = this,
				filters = [],
				columns = me.columns,
				max = columns.length,
				i = 0, value, clmn, itm,
				store = me.store;
		for (; i < max; ++i) {
			clmn = columns[i];
			itm = clmn.items.get(0);
			value = itm.getValue();
			if (value) {
				/*
				 if (itm.name === 'requestFromCombo') {
				 value = Ext.getStore('journalApplicantFilterStore')
				 .getById(value).get('name');
				 }*/
				filters.push(Ext.create('Ext.util.Filter', {
					property: clmn.dataIndex,
					value: value
				}));
			}
		}
		store.filters.clear();

		filters = filters.concat(me._fltrs);
		store.addFilter(filters);
		// Когда добавляем пустой список то хранилище не отправляет запрос на сервер
		if (filters.length === 0) {
			store.loadPage(1);
		}
	},
	_filterSelected: function () {
		this.applyFilter();
	},
	_render: function (comp, eopts) {
		comp.getEl().addListener('click', function () {
			comp.focus();
		});
	},
	/**
	 * Обработка событий кнопки для комбобоксов
	 * @param {type} comp комбобокс
	 * @param {type} event событие
	 * @param {type} eopts опции
	 */
	_specialKeyStop: function (comp, event, eopts) {
		event.stopPropagation();
	},
	/**
	 * @private
	 * Обработка события кнопки для тектсовых полей и полей даты 
	 * @param {type} field поле
	 * @param {type} event событие
	 */
	_specKey: function (field, event) {
		event.stopPropagation();
		if (event.getKey() === event.ENTER)
			this.applyFilter();
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				ns = qqext,
				execStore = ns.stIds.execs,
				store, items, onlyExecutor,
				labelForTable = createCmp('FLabel', '', {
					dock: 'top',
					cls: 'journal_title_label'
				});

// Если пользователь чистый исполнитель, то выводим запросы только назначеные ему
		if (onlyExecutor = (ns.exec && !ns.coor && !ns.reg)) {
			execStore = createCmp('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: ns.userId, text: ns.fio}]
			});
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'executor',
				value: ns.userId
			}));
		}

		if (ns.reg || ns.coor || ns.exec || ns.visor || ns.superex)
			me.listeners.itemdblclick = ns.openRequest;

		if (ns.isSIC) {
			store = createCmp('qqext.store.SicJvk');
			labelForTable.setText("Справочно-информационный центр федеральных государственных архивов");

			items = [{
					text: 'Литера',
					dataIndex: 'litera',
					width: 97,
					items: [
						createCmp('FComboBox', '', ns.stIds.litera, 'filterLiteraCombo', {
							width: '90%',
							displayField: 'shortValue',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					text: '№ вх. документа',
					dataIndex: 'number',
					minWidth: 50,
					items: [
						createCmp('FTextField', '', 'docNumberTextField', {
							width: '90%',
							listeners: {
								specialkey: me._specKey,
								render: me._render,
								scope: me
							}
						})
					]}, {
					text: 'Дата регистрации',
					minWidth: 65,
					xtype: 'datecolumn',
					dataIndex: 'regDate',
					format: 'd.m.Y',
					focusOnToFront: false,
					items: [{
							width: '90%',
							xtype: 'hawkDateField',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specKey,
								scope: me
							}
						}]}, {
					xtype: 'datecolumn',
					text: 'Дата исполнения плановая',
					minWidth: 65,
					dataIndex: 'planDate',
					format: 'd.m.Y',
					items: [{
							width: '90%',
							cls: 'mar_t0',
							xtype: 'hawkDateField',
							focusOnToFront: false,
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specKey,
								scope: me
							}
						}]}, {
					text: 'Статус уведомления',
					minWidth: 115,
					dataIndex: 'notiStat',
					items: [
						createCmp('FComboBox', '', ns.stIds.notiStats, 'requestNotiStatus', {
							width: '95%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					text: 'От кого поступил',
					minWidth: 165,
					dataIndex: 'otKogo',
					items: [
						createCmp('FTextField', '', 'applicantField', {
							width: '90%',
							listeners: {
								specialkey: me._specKey,
								render: me._render,
								scope: me
							}
						})
					]}, {
					text: 'Состояние запроса',
					dataIndex: 'status',
					minWidth: 120,
					items: [
						createCmp('FComboBox', '', ns.stIds.stats, 'requestStatusCombo', {
							width: '90%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					text: 'Архив-исполнитель',
					dataIndex: 'execOrg',
					minWidth: 65,
					items: [
						createCmp('FComboBox', '', ns.stIds.litera, 'requestExecOrgCombo', {
							displayField: 'shortValue',
							width: '90%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					text: 'Исполнитель',
					dataIndex: 'executor',
					minWidth: 70,
					items: [
						createCmp('FComboBox', '', execStore, 'rlequestExecutorCombo', {
							width: '90%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}];
		} else {
			store = createCmp('qqext.store.ArchiveJvk');
			labelForTable.setText(Ext.getStore(ns.stIds.litera)
					.getById(ns.orgId).get('text'));

			// Запросы со статусом "На регистрации" с литерой СИЦ для архивов не нужны

			items = [{
					text: 'Литера',
					dataIndex: 'litera',
					minWidth: 80,
					items: [createCmp('FComboBox', '', ns.stIds.litera, 'filterLiteraCombo', {
							displayField: 'shortValue',
							width: '90%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					text: '№ вх. документа',
					dataIndex: 'number',
					minWidth: 80,
					items: [createCmp('FTextField', '', 'docNumberTextField', {
							width: '90%',
							listeners: {
								specialkey: me._specKey,
								render: me._render,
								scope: me
							}
						})
					]}, {
					text: 'Дата регистрации',
					minWidth: 90,
					xtype: 'datecolumn',
					dataIndex: 'regDate',
					format: 'd.m.Y',
					focusOnToFront: false,
					items: [{
							width: '90%',
							xtype: 'hawkDateField',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specKey,
								scope: me
							}
						}]}, {
					text: 'Вид запроса',
					minWidth: 60,
					maxWidth: 60,
					dataIndex: 'questionType',
					items: [createCmp('FComboBox', '', ns.stIds.queryType, 'filterQTypeCombo', {
							width: '90%',
							displayField: 'shortValue',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					text: 'От кого поступил',
					minWidth: 200,
					dataIndex: 'otKogo',
					items: [
						createCmp('FTextField', '', 'applicantField', {
							width: '90%',
							listeners: {
								specialkey: me._specKey,
								render: me._render,
								scope: me
							}
						})
					]}, {
					text: 'Состояние запроса',
					dataIndex: 'status',
					minWidth: 130,
					items: [
						createCmp('FComboBox', '', ns.stIds.stats, 'requestStatusCombo', {
							width: '90%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]}, {
					xtype: 'datecolumn',
					text: 'Дата исполнения',
					minWidth: 90,
					dataIndex: 'execDate',
					format: 'd.m.Y',
					items: [{
							width: '90%',
							cls: 'mar_t0',
							xtype: 'hawkDateField',
							focusOnToFront: false,
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specKey,
								scope: me
							}
						}]}, {
					text: 'Исполнитель',
					dataIndex: 'executor',
					minWidth: 115,
					items: [
						createCmp('FComboBox', '', execStore, 'requestExecutorCombo', {
							value: onlyExecutor ? ns.userId : null,
							width: '90%',
							listeners: {
								select: me._filterSelected,
								render: me._render,
								specialkey: me._specialKeyStop,
								scope: me
							}
						})
					]
				}];
		}
		Ext.applyIf(me, {
			columns: {
				defaults: {
					menuDisabled: true
				},
				items: items
			},
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: true,
					store: store
				},
				labelForTable
			]
		});
		me.store = store;
		me.callParent();
		me.store.getProxy().timeout = 120000;
		me.store.addFilter(me._fltrs, false);
		me.store.sort([{property: 'regDate', direction: 'DESC'}]);
	}
});
