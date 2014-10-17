/**
 * Панель с результаты поиска
 */
Ext.define('qqext.view.search.VSearchResult', {
	alias: 'VSearchResult',
	extend: 'Ext.grid.Panel',
	title: 'Результаты поиска',
	requires: ['Ext.toolbar.Paging'],
	margin: '0 10 0 0',
	maxHeight: 450,
	overflowY: 'auto',
	store: 'searchResults',
	columns: [{
			text: 'id',
			dataIndex: 'id',
			sortable: true,
			menuDisabled: true,
			hidden: true
		}, {
			text: 'Литера',
			dataIndex: 'litera',
			sortable: true,
			menuDisabled: true
		}, {
			text: '№ вх. документа',
			dataIndex: 'inboxDocNum',
			sortable: true,
			menuDisabled: true,
			doSort: function (state) {
				var ds = Ext.getStore('searchResults'),
						field = this.getSortParam();
				ds.sort({
					property: field,
					direction: state,
					sorterFn: function (v1, v2) {
						v1 = v1.get(field).split("/");
						v2 = v2.get(field).split("/");
						var y1 = Number(v1[1]),
								y2 = Number(v2[1]),
								n1 = Number(v1[0]),
								n2 = Number(v2[0]);

						return y1 > y2 ? 1 : y1 < y2 ? -1 :
								n1 > n2 ? 1 : n1 < n2 ? -1 : 0;
					}
				});

			}
		}, {
			text: 'Дата регистрации',
			dataIndex: 'regDate',
			sortable: true,
			menuDisabled: true,
			doSort: function (state) {
				var ds = Ext.getStore('searchResults'),
						field = this.getSortParam();
				ds.sort({
					property: field,
					direction: state,
					sorterFn: function (v1, v2) {
						v1 = Ext.Date.parse(v1.get(field), 'd.m.Y');
						v2 = Ext.Date.parse(v2.get(field), 'd.m.Y');
						if (!v1 && !v2)
							return 0;
						else if (!v1)
							return -1;
						else if (!v2)
							return 1;
						return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
					}
				});
			}
		}, {
			text: 'ФИО/Организация',
			dataIndex: 'fioOrg',
			sortable: true,
			menuDisabled: true
		}, {
			text: 'Тематика ответа',
			dataIndex: 'answerTematic',
			sortable: true,
			menuDisabled: true
		}, {
			text: 'Результат ответа',
			dataIndex: 'answerResult',
			sortable: true,
			menuDisabled: true
		}],
	forceFit: true,
	dockedItems: [
		{
			xtype: 'pagingtoolbar',
			dock: 'bottom',
			displayInfo: true,
			store: 'searchResults'
		}
	],
	initComponent: function () {
		var ns = qqext,
				rules = ns.rules;

		if (ns.user.isAllowed([rules.reg, rules.crd, rules.exec]))
			this.listeners = {itemdblclick: ns.openRequest};
		this.callParent();
	}
});
