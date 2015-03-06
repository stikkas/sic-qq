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
	columns: {
		defaults: {
			menuDisabled: true
		},
		items: [{
				text: 'id',
				dataIndex: 'id',
				hidden: true
			}, {
				text: 'Литера',
				dataIndex: 'litera',
				width: '7%'
			}, {
				text: '№ вх. документа',
				dataIndex: 'inboxDocNum',
				width: '9.5%'
//				doSort: function (state) {
//					var ds = Ext.getStore('searchResults'),
//							field = this.getSortParam();
//					ds.sort({
//						property: field,
//						direction: state,
//						sorterFn: function (v1, v2) {
//							v1 = v1.get(field).split("/");
//							v2 = v2.get(field).split("/");
//							var y1 = Number(v1[1]),
//									y2 = Number(v2[1]),
//									n1 = Number(v1[0]),
//									n2 = Number(v2[0]);
//
//							return y1 > y2 ? 1 : y1 < y2 ? -1 :
//									n1 > n2 ? 1 : n1 < n2 ? -1 : 0;
//						}
//					});
//
//				}
			}, {
				text: 'Дата регистрации',
				dataIndex: 'regDate'
			}, {
				text: 'Вид запроса',
				dataIndex: 'requestType',
				minWidth: 70,
				maxWidth: 75
			}, {
				text: 'ФИО/Организация',
				dataIndex: 'fioOrg',
				width: '21%'
			}, {
				text: 'Содержание запроса',
				dataIndex: 'content',
				width: '21%'
			}, {
				text: 'Результат ответа',
				dataIndex: 'answerResult',
				width: '20%'
			}]},
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
		var ns = qqext;
		if (ns.reg || ns.coor || ns.exec || ns.visor || ns.superex)
			this.listeners = {itemdblclick: ns.openRequest};
		this.callParent();
	}
});
