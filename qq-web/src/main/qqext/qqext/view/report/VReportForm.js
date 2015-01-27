/**
 * Форма для отображения отчетов
 */
Ext.define('qqext.view.report.VReportForm', {
	extend: 'Ext.container.Container',
	alias: 'VReportForm',
	requires: [
		'qqext.view.report.StatisticSic1',
		'qqext.view.report.StatisticSic2',
		'Ext.layout.container.Accordion'
	],
	title: 'Статистика исполнения запросов федеральными архивами и СИЦ',
	layout: {
		type: 'accordion',
		animate: true,
		activeOnTop: true,
		fill: false
	},
	height: 600,
	listeners: {
		activate: function () {
			var ns = qqext,
					menuButtons = ns.Menu.editMenu.items.getAt(0).items;
			ns.switchArticleButton(ns.getButton(ns.btns.report));
			menuButtons.getAt(1).hide();
//			menuButtons.getAt(2).hide();
		}
	},
	initComponent: function () {
		this.items = [{
				xtype: 'statisticsic1',
				title: 'Статистика исполнения запросов федеральными архивами и СИЦ',
				hidden: !qqext.isSIC
			}, {
				xtype: 'statisticsic2',
				title: 'Отчет по типам подготовленных по запросам документов',
				hidden: !qqext.isSIC
			}];
		this.callParent();
	}, 
	reset: function() {
		this.items.getAt(0).getForm().reset();
	}
});
