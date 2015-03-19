/**
 * Панель с результаты поиска
 */
Ext.define('qqext.view.search.VSearchResult', {
	alias: 'VSearchResult',
	extend: 'Ext.grid.Panel',
	title: 'Результаты поиска',
	requires: [
		'Ext.toolbar.Paging',
		'qqext.store.Search'
	],
	margin: '0 10 0 0',
	maxHeight: 450,
	overflowY: 'auto',
	store: 'search',
	columns: {
		defaults: {
			menuDisabled: true
		},
		items: [{
				text: 'Литера',
				dataIndex: 'litera',
				width: '7%'
			}, {
				text: '№ вх. документа',
				dataIndex: 'number',
				width: '9.5%'
			}, {
				text: 'Дата регистрации',
				dataIndex: 'regDate',
				xtype: 'datecolumn',
				format: 'd.m.Y'

			}, {
				text: 'Вид запроса',
				dataIndex: 'questionType',
				minWidth: 70,
				maxWidth: 75
			}, {
				text: 'ФИО/Организация',
				dataIndex: 'otKogo',
				width: '21%'
			}, {
				text: 'Содержание запроса',
				dataIndex: 'content',
				width: '21%'
			}, {
				text: 'Результат ответа',
				dataIndex: 'replyResult',
				width: '20%'
			}]},
	forceFit: true,
	dockedItems: [{
			xtype: 'pagingtoolbar',
			dock: 'bottom',
			displayInfo: true,
			store: 'search'
		}],
	initComponent: function () {
		var ns = qqext;
		if (ns.reg || ns.coor || ns.exec || ns.visor || ns.superex)
			this.listeners = {itemdblclick: ns.openRequest};
		this.callParent();
	}
});
