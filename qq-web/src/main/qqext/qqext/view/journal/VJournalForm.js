/**
 * Форма журнала входящей корреспонденции
 */

Ext.define('qqext.view.journal.VJournalForm', {
	alias: 'VJournalForm',
	extend: 'Ext.grid.Panel',
	requires: [
		'Ext.grid.column.Date',
		'Ext.util.Filter',
		'qqext.factory.ComboBox',
		'qqext.factory.Label',
		'qqext.factory.TextField',
		'Ext.toolbar.Paging',
		'hawk_common.cmp.DateField'
	],
	width: '100%',
	forceFit: true,
	maxHeight: 500,
	name: 'journalGridPanel',
	// autoScroll : true,
	overflowY: 'auto',
	draggable: false,
	store: 'journal',
	margin: '0 5 10 5',
	border: true,
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 0,
	/**
	 * Очищает поля поиска
	 */
	clearCriterias: function() {
		var columns = this.columns,
				max = columns.length, i = 0;
		for (; i < max; ++i) {
			columns[i].items.get(0).setValue(null);
		}
	},
	/**
	 * Приводит форму в первоначальное состояние
	 */
	reset: function() {
		var store = this.getStore();
		store.filters.clear();
		this.clearCriterias();
		store.loadPage(1);
	},
	/**
	 * Запускает процесс поиска данных на сервере
	 */
	exec: function() {
		this.getStore().reload();
	},
	listeners: {
		itemdblclick: function(view, record) {
			var ns = qqext;
			ns.currentRequest = record.get('id');
			ns.getButton(ns.btns.add).fireEvent('click');
		}
	},
	applyFilter: function() {
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
		store.filters.clear();
		store.addFilter(filters, true);
	},
	_filterDateSelected: function(field, value, eopts) {
		field.ownerCt.ownerCt.ownerCt.applyFilter();
	},
	_filterComboSelected: function(combo, records, eopts) {
		var grid = combo.ownerCt.ownerCt.ownerCt;
		grid.applyFilter();
	},
	_render: function(comp, eopts) {
		comp.getEl().addListener('click', function() {
			comp.focus();
		});
	},
	_specialKeyStop: function(comp, event, eopts) {
		event.stopPropagation();
	},
	initComponent: function() {
		var me = this,
				createCmp = Ext.create;
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
							createCmp('FComboBox', '', 'literas', 'filterLiteraCombo', {
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
									specialkey: function(tf, event, eopts) {
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
									specialkey: function(tf, event, eopts) {
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
						text: 'Дата исполнения контрольная',
                                                width: 100,
                                                dataIndex: 'execDate',
						itemId: 'execDateControl',
						format: 'd.m.Y',
						items: [{
								width: '90%',
								xtype: 'hawkDateField',
								focusOnToFront: false,
								name: 'execDateControl',
								listeners: {
									select: me._filterDateSelected,
									render: me._render,
									specialkey: function(tf, event, eopts) {
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
						text: 'От кого поступил',
						dataIndex: 'fioOrg',
						items: [
							createCmp('FComboBox', '', 'journalApplicantFilterStore', 'requestFromCombo', {
								width: '90%',
								queryMode: 'local',
								listeners: {
									select: me._filterComboSelected,
									render: me._render,
									specialkey: me._specialKeyStop
								}
							})
						]
					},
					{
						text: 'Состояние запроса',
						dataIndex: 'status',
						items: [
							createCmp('FComboBox', '', 'Q_DICT_QUESTION_STATUSES', 'requestStatusCombo', {
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
						items: [
							createCmp('FComboBox', '', 'journalExecutors', {
								width: '90%',
								select: me._filterComboSelected,
								render: me._render,
								queryMode: 'local',
								listeners: {
									specialkey: me._specialKeyStop,
									select: me._filterComboSelected
								}
							})
						]
					}]},
			dockedItems: [
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					displayInfo: false,
					store: 'journal'
				},
				createCmp('FLabel', 'СИЦ/Архив', {
					dock: 'top',
					cls: 'journal_title_label'
				})
			]
		});
		me.callParent();
	}
});
