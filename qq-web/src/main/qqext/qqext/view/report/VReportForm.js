/**
 * Форма для отображения отчетов
 */
Ext.define('qqext.view.report.VReportForm', {
	extend: 'qqext.view.StyledPanel',
	alias: 'VReportForm',
	title: 'Отчетные документы',
	listeners: {
		activate: function () {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.report));
		}
	}
});
