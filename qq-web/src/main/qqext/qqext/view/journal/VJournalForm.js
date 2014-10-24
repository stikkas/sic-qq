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
	name: 'journalGridPanel',
	overflowY: 'auto',
	//maxHeight: 300,
	draggable: false,
	store: 'journal',
	margin: '0 5 10 5',
        cls:'journal_st',
	border: true,
	listeners: {
		activate: function (me, prev) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.jvk));
			ns.updateInfo();
		}
	},
	viewConfig: {
		getRowClass: function (record) { // Здесь статус - описание статуса на не код
			var ns = qqext,
					statsName = ns.statsName,
					stats = ns.stats,
					status = record.get('status');
			var date = record.get('execDate');
			if (date &&
					((ns.isSIC && (
							status === statsName[stats.reg] ||
							status === statsName[stats.onexec])) ||
							(!ns.isSIC && !(
									status === statsName[stats.onreg] ||
									status === statsName[stats.exec])))) {
				var delta = Math.ceil((date - new Date()) / qqext.msPday);
				if (delta <= 1)
					return 'immediate';
				if (delta < 4)
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

		if (user.isAllowed([rules.reg, rules.crd, rules.exec]))
			me.listeners.itemdblclick = ns.openRequest;

		if (ns.isSIC) {
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'litera',
				value: user.get('organization')
			}));
		} else {
			me._fltrs.push(createCmp('Ext.util.Filter', {
				property: 'organization',
				value: user.get('organization')
			}));
		}

		var labelForTable;
		Ext.applyIf(me, {
			columns: {
				defaults: {
					menuDisabled: true
				},
				items: [
					{
						text: 'Литера',
						itemId: 'literaCount',
						dataIndex: 'litera',
						width: 50,
						items: [
							createCmp('FComboBox', '', ns.stIds.litera, 'filterLiteraCombo', {
								itemId: 'filterLiteraCombo',
								width: '90%',
								listeners: {
									select: me._filterComboSelected,
									render: me._render,
									specialkey: me._specialKeyStop
								}
							})
						]
					},
					{
						text: '№ вх. документа',
						dataIndex: 'inboxDocNum',
						width: 80,
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
						]
					},
					{
						text: 'Дата регистрации',
						width: 100,
						xtype: 'datecolumn',
						dataIndex: 'regDate',
						itemId: 'regDate',
						format: 'd.m.Y',
						focusOnToFront: false,
						items: [
							{
								width: '90%',
								xtype: 'hawkDateField',
								name: 'regDateField',
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
							}]
					},
					{
						xtype: 'datecolumn',
						text: 'Дата исполнения плановая',
						width: 110,
						dataIndex: 'execDate',
						itemId: 'planDateExec',
						format: 'd.m.Y',
						items: [{
								width: '90%',
								xtype: 'hawkDateField',
								focusOnToFront: false,
								name: 'planDateExec',
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
							}]
					},
//					{
//						text: 'От кого поступил',
//						dataIndex: 'fioOrg',
//						items: [
//							createCmp('FComboBox', '', 'journalApplicantFilterStore', 'requestFromCombo', {
//								width: '90%',
//								queryMode: 'local',
//								listeners: {
//									select: me._filterComboSelected,
//									render: me._render,
//									specialkey: me._specialKeyStop
//								}
//							})
//						]
//					},
					{
						text: 'От кого поступил',
						width: 200,
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
						]
					},
					{
						text: 'Состояние запроса',
						dataIndex: 'status',
						width: 150,
						items: [
							createCmp('FComboBox', '', ns.stIds.stats, 'requestStatusCombo', {
								width: '90%',
								listeners: {
									select: me._filterComboSelected,
									render: me._render,
									specialkey: me._specialKeyStop
								}
							})
						]
					},
					{
						text: 'Исполнитель',
						dataIndex: 'executor',
						width: 100,
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
					}]},
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

		me.store.addFilter(me._fltrs);
		me.store.sort([{property: 'inboxDocNum', direction: 'DESC'}]);
	}
});
