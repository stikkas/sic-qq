/**
 * Форма для отображения отчетов
 */
Ext.define('qqext.view.report.VReportForm', {
	extend: 'Ext.container.Container',
	alias: 'VReportForm',
	requires: [
		'qqext.view.report.StatisticSic1',
		'qqext.view.report.StatisticSic2',
		'qqext.view.report.StatisticSic3',
		'qqext.view.report.StatisticSic4',
		'Ext.layout.container.Accordion'
	],
	overflowY: 'auto',
	layout: {
		type: 'accordion',
		animate: true,
		hideCollapseTool: true,
		multi: true,
//		activeOnTop: true,
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
				collapsed: true,
				title: 'Статистика исполнения запросов федеральными архивами и СИЦ',
				hidden: !qqext.isSIC
			}, /*{
				xtype: 'statisticsic2',
				collapsed: true,
				title: 'Отчет по типам подготовленных по запросам документов',
				hidden: !qqext.isSIC
			},*/ {
				xtype: 'statisticsic3',
				collapsed: true,
				title: 'Реестр поступивших запросов',
				hidden: !qqext.isSIC
			}, /*{
				xtype: 'statisticsic4',
				collapsed: true,
				title: 'Реестр запросов на контроле',
				hidden: !qqext.isSIC
			},*/ { // Заглушка, позволяющая всем формам быть свернутыми
				xtype: 'panel',
				collapsed: false,
				hidden: true
			}];
		this.callParent();
	}, 
	reset: function() {
		for (var i = 0, max = this.items.getCount() - 1; i < max; ++i) {
			var it = this.items.getAt(i);
			if (!it.collapsed)
				it.getForm().reset();
		}
	}
});
