/**
 * 
 */

Ext.define('qqext.view.journal.VJournalForm', {
	extend : 'Ext.grid.Panel',
	width : '100%',
	requires : ['Ext.util.Point'],
	forceFit : true,
	maxHeight : 500,
	name : 'journalGridPanel',
	// autoScroll : true,
	overflowY : 'auto',
	draggable : false,
	store : 'journal',
	margin : '0 10 0 0',
	
	clearCriterias:function(){
		var me = this;
		for (var i = 0 ; i < me.columns.length;i++){
			me.columns[i].items.get(0).setValue(null);
		}
	},
	
	applyFilter : function() {
		var me = this;
		var filters = new Array();
		for (var i = 0; i < me.columns.length; i++) {
			var valuee = me.columns[i].items.get(0).getValue();
			if (valuee) {
				if (me.columns[i].items.get(0).name == 'requestFromCombo') {
					valuee = Ext.getStore('journalApplicantFilterStore')
							.getById(valuee).get('name')
				}
				filters[filters.length] = Ext.create('Ext.util.Filter', {
							property : me.columns[i].dataIndex,
							value : valuee
						})
			}

		}
		me.getStore().filters.clear();
		me.getStore().addFilter(filters, true);
	},
	_filterDateSelected : function(field, value, eopts) {
		var grid = field.ownerCt.ownerCt.ownerCt;
		grid.applyFilter();
	},
	_filterComboSelected : function(combo, records, eopts) {
		var grid = combo.ownerCt.ownerCt.ownerCt;
		grid.applyFilter();
	},
	_render : function(comp, eopts) {
		comp.getEl().addListener('click', function() {
					comp.focus();
				});
	},
	_specialKeyStop : function(comp, event, eopts) {
		event.stopPropagation();
	},
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			columns : [{
						text : 'Литера',
						itemId : 'literaCount',
						dataIndex : 'litera',
						layout : 'vbox',
						menuDisabled : true,
						items : [{
									itemId : 'filterLiteraCombo',
									xtype : 'combobox',
									name : 'filterLiteraCombo',
									width : '100%',
									store : 'literas',
									displayField : 'name',
									valueField : 'id',
									listeners : {
										select : me._filterComboSelected,
										render : me._render,
										specialkey : me._specialKeyStop
									}
								}]
					}, {
						text : '№ вх. документа',
						dataIndex : 'inboxDocNum',
						layout : 'vbox',
						items : [{
									xtype : 'textfield',
									width : '100%',
									name : 'docNumberTextField',
									listeners : {
										specialkey : function(tf, event, eopts) {
											event.stopPropagation();
											if (event.getKey() == event.ENTER) {
												var grid = tf.ownerCt.ownerCt.ownerCt;
												grid.applyFilter();
											}
										},
										render : me._render
									}
								}],
						menuDisabled : true
					}, {
						text : 'Дата регистрации',
						width : 100,
						layout : 'vbox',
						xtype : 'datecolumn',
						dataIndex : 'regDate',
						itemId : 'regDate',
						format : 'd.m.Y',
						focusOnToFront : false,
						items : [{
									width : '100%',
									xtype : 'hawkDateField',
									name : 'regDateField',
									listeners : {
										select : me._filterDateSelected,
										render : me._render,
										specialkey : function(tf, event, eopts) {
											event.stopPropagation();
											if (event.getKey() == event.ENTER) {
												var grid = tf.ownerCt.ownerCt.ownerCt;
												grid.applyFilter();
											}
										}
									}
								}],
						menuDisabled : true
					}, {
						layout : 'vbox',
						xtype : 'datecolumn',
						text : 'Дата исполнения контрольная',
						dataIndex : 'execDate',
						itemId : 'execDateControl',
						format : 'd.m.Y',
						items : [{
									width : '100%',
									xtype : 'hawkDateField',
									focusOnToFront : false,
									name : 'execDateControl',
									listeners : {
										select : me._filterDateSelected,
										render : me._render,
										specialkey : function(tf, event, eopts) {
											event.stopPropagation();
											if (event.getKey() == event.ENTER) {
												var grid = tf.ownerCt.ownerCt.ownerCt;
												grid.applyFilter();
											}
										}
									}
								}],
						menuDisabled : true
					}, {
						text : 'От кого поступил',
						dataIndex : 'fioOrg',
						layout : 'vbox',
						items : [{
									xtype : 'combobox',
									width : '100%',
									displayField : 'name',
									name : 'requestFromCombo',
									queryMode : 'local',
									valueField : 'id',
									store : 'journalApplicantFilterStore',
									listeners : {
										select : me._filterComboSelected,
										render : me._render,
										specialkey : me._specialKeyStop
									}
								}],
						menuDisabled : true
					}, {
						text : 'Состояние запроса',
						dataIndex : 'status',
						items : [{
									width : '100%',
									xtype : 'combobox',
									name : 'requestStatusCombo',
									displayField : 'name',
									valueField : 'id',
									store : 'Q_DICT_QUESTION_STATUSES',
									listeners : {
										select : me._filterComboSelected,
										render : me._render,
										specialkey : me._specialKeyStop
									}
								}],
						menuDisabled : true
					}, {
						text : 'Исполнитель',
						dataIndex : 'executor',
						items : [{
									width : '100%',
									xtype : 'combobox',
									select : me._filterComboSelected,
									render : me._render,
									displayField : 'name',
									valueField : 'id',
									queryMode : 'local',
									store : 'journalExecutors',
									listeners : {
										specialkey : me._specialKeyStop,
										select : me._filterComboSelected
									}
								}],
						menuDisabled : true
					}],
			dockedItems : [{
						xtype : 'pagingtoolbar',
						dock : 'bottom',
						displayInfo : false,
						store : 'journal'
					}, {
						xtype : 'label',
						text : 'СИЦ/Архив',
						dock : 'top',
						cls : 'journal_title_label'
					}]
		});
		me.callParent(arguments);
	}
})
