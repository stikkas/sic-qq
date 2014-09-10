/**
 * Панель с результаты поиска
 */
Ext.define('qqext.view.search.VSearchResult', {
	alias: 'VSearchResult',
	extend: 'Ext.grid.Panel',
	title: 'Результаты поиска',
	requires: ['Ext.util.Point'],
	margin: '0 10 0 0',
	minHeight: 150,
	maxHeight: 300,
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
			menuDisabled: true
		}, {
			text: 'Дата регистрации',
			dataIndex: 'regDate',
			sortable: true,
			menuDisabled: true
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
	forceFit: true
});
