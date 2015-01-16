/**
 * Форма для отображения отчетов
 */
Ext.define('qqext.view.report.VReportForm', {
	extend: 'Ext.container.Container',
	alias: 'VReportForm',
	requires: [
		'qqext.view.report.StatisticSic1',
		'Ext.layout.container.VBox'
	],
	maxHeight: 100,
	title: 'Статистика исполнения запросов федеральными архивами и СИЦ',
	layout: 'vbox',
	listeners: {
		activate: function () {
			var ns = qqext,
					menuButtons = ns.Menu.editMenu.items.getAt(0).items;
			ns.switchArticleButton(ns.getButton(ns.btns.report));
			menuButtons.getAt(1).hide();
			menuButtons.getAt(2).hide();
		}
	},
	initComponent: function () {
		this.items = [{
				xtype: 'statisticsic1',
				hidden: !qqext.isSIC
			}];
		this.callParent();
	}
});
