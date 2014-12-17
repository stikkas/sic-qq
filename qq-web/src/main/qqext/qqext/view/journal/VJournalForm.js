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
		'Ext.toolbar.Paging',
		'hawk_common.cmp.DateField'
	],
	width: '100%',
	forceFit: true,
	overflowY: 'auto',
	//maxHeight: 300,
	draggable: false,
	store: 'journal',
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
				date = record.get('plannedDate');
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
		var store = this.getStore();
		store.filters.clear();
		store.addFilter(this._fltrs);
		this.clearCriterias();
		store.loadPage(1);
	},
	/**
	 * Запускает процесс поиска данных на сервере
	 */
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
	applyFilter: function () {
		var me = this,
				filters = [],
				columns = me.columns,
				max = columns.length,
				i = 0, value, clmn, itm,
				store = me.getStore();
		for (; i < max; ++i) {
			clmn = columns[i];
			itm = clmn.items.get(0);
			value = itm.getValue();
			if (value) {
				if (itm.name === 'requestFromCombo') {
					value = Ext.getStore('journalApplicantFilterStore')
							.getById(value).get('name');
				}
				filters.push(Ext.create('Ext.util.Filter', {
					property: clmn.dataIndex,
					value: value
				}));
			}
		}
		filters = filters.concat(me._fltrs);
		store.filters.clear();
		store.addFilter(filters, true);
	},
	_filterDateSelected: function (field, value, eopts) {
		field.ownerCt.ownerCt.ownerCt.applyFilter();
	},
	_filterComboSelected: function (combo, records, eopts) {
		combo.ownerCt.ownerCt.ownerCt.applyFilter();
	},
	_render: function (comp, eopts) {
		comp.getEl().addListener('click', function () {
			comp.focus();
		});
	},
	_specialKeyStop: function (comp, event, eopts) {
		event.stopPropagation();
	},
	initComponent: function () {
		var me = this,
				createCmp = Ext.create,
				ns = qqext,
				rules = ns.rules,
				user = ns.user,
				execStore = ns.stIds.users;

// Если пользователь чистый исполнитель, то выводим запросы только назначеные ему
		if (user.isAllowed(rules.exec) && !user.isAllowed(rules.crd)
				&& !user.isAllowed(rules.reg)) {
			var userId = user.get('userId');
			execStore = createCmp('Ext.data.Store', {
				fields: ['id', 'name'],
				data: [{id: userId, name: user.get('name')}]
			});
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'executor',
				value: userId
			}));
		}

		if (user.isAllowed([rules.reg, rules.crd, rules.exec, rules.admin]))
			me.listeners.itemdblclick = ns.openRequest;

		if (ns.isSIC) // Запросы со статусом "На регистрации" с литерой архива для СИЦ не нужны
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'requestor',
				value: ns.sicId
			}));
		else { // Запросы со статусом "На регистрации" с литерой СИЦ для архивов не нужны
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'execOrg',
				value: user.get('organization')
			}));
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'noorganization',
				value: ns.sicId
			}));
		}
		me._fltrs.push(createCmp('Ext.util.Filter', {
			property: 'nostatus',
			value: ns.statsId[ns.stats.onreg]
		}));

		var labelForTable, items;
		if (ns.isSIC) {
			items = [{
					text: 'Литера',
					dataIndex: 'litera',
					width: 97,
					items: [
						createCmp('FComboBox', '', ns.stIds.litera, 'filterLiteraCombo', {
							width: '90%',
							listeners: {
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}, {
					text: '№ вх. документа',
					dataIndex: 'inboxDocNum',
					minWidth: 50,
					items: [
						createCmp('FTextField', '', 'docNumberTextField', {
							width: '90%',
							listeners: {
								specialkey: function (tf, event, eopts) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								},
								render: me._render
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
								select: me._filterDateSelected,
								render: me._render,
								specialkey: function (tf, event, eopts) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								}
							}
						}]}, {
					xtype: 'datecolumn',
					text: 'Дата исполнения плановая',
					minWidth: 65,
					dataIndex: 'plannedDate',
					format: 'd.m.Y',
					items: [{
							width: '90%',
							cls: 'mar_t0',
							xtype: 'hawkDateField',
							focusOnToFront: false,
							listeners: {
								select: me._filterDateSelected,
								render: me._render,
								specialkey: function (tf, event, eopts) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								}
							}
						}]}, {
					text: 'Статус уведомления',
					minWidth: 115,
					dataIndex: 'notifyStatus',
					items: [
						createCmp('FComboBox', '', ns.stIds.notiStats, 'requestNotiStatus', {
							width: '95%',
							listeners: {
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}, {
					text: 'От кого поступил',
					minWidth: 165,
					dataIndex: 'fioOrg',
					items: [
						createCmp('FTextField', '', 'applicantField', {
							width: '90%',
							listeners: {
								specialkey: function (tf, event) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								},
								render: me._render
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
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}, {
					text: 'Архив-исполнитель',
					dataIndex: 'execOrg',
					minWidth: 65,
					items: [
						createCmp('FComboBox', '', ns.stIds.litera, 'requestExecOrgCombo', {
							width: '90%',
							listeners: {
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
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
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}];
		} else {
			items = [{
					text: 'Литера',
					dataIndex: 'litera',
					minWidth: 80,
					items: [createCmp('FComboBox', '', ns.stIds.litera, 'filterLiteraCombo', {
							width: '90%',
							listeners: {
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}, {
					text: '№ вх. документа',
					dataIndex: 'inboxDocNum',
					minWidth: 80,
					items: [createCmp('FTextField', '', 'docNumberTextField', {
							width: '90%',
							listeners: {
								specialkey: function (tf, event, eopts) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								},
								render: me._render
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
								select: me._filterDateSelected,
								render: me._render,
								specialkey: function (tf, event, eopts) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								}
							}
						}]}, {
					text: 'Вид запроса',
					minWidth: 60,
					dataIndex: 'queryType',
					items: [createCmp('FComboBox', '', ns.stIds.queryType, 'filterQTypeCombo', {
							width: '90%',
							displayField: 'shortValue',
							listeners: {
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}, {
					text: 'От кого поступил',
					minWidth: 200,
					dataIndex: 'fioOrg',
					items: [
						createCmp('FTextField', '', 'applicantField', {
							width: '90%',
							listeners: {
								specialkey: function (tf, event) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								},
								render: me._render
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
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
							}
						})
					]}, {
					xtype: 'datecolumn',
					text: 'Дата исполнения',
					minWidth: 95,
					dataIndex: 'execDate',
					format: 'd.m.Y',
					items: [{
							width: '90%',
							cls: 'mar_t0',
							xtype: 'hawkDateField',
							focusOnToFront: false,
							listeners: {
								select: me._filterDateSelected,
								render: me._render,
								specialkey: function (tf, event, eopts) {
									event.stopPropagation();
									if (event.getKey() === event.ENTER) {
										var grid = tf.ownerCt.ownerCt.ownerCt;
										grid.applyFilter();
									}
								}
							}
						}]}, {
					text: 'Исполнитель',
					dataIndex: 'executor',
					minWidth: 120,
					items: [
						createCmp('FComboBox', '', execStore, 'requestExecutorCombo', {
							width: '90%',
							listeners: {
								select: me._filterComboSelected,
								render: me._render,
								specialkey: me._specialKeyStop
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
					store: 'journal'
				},
				labelForTable = createCmp('FLabel', '', {
					dock: 'top',
					cls: 'journal_title_label'
				})
			]
		});
		if (ns.isSIC)
			labelForTable.setText("Справочно-информационный центр федеральных государственных архивов");
		else
			labelForTable.setText(Ext.getStore(ns.stIds.execOrgs)
					.getById(ns.user.get('organization')).get('name'));

		me.callParent();
		me.store.addFilter(me._fltrs, false);
		me.store.sort([{property: 'regDate', direction: 'DESC'}]);
	}
});
