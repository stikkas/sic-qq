/**
 * Страница показывается когда пользователь начинает работать с программой
 * АС Запросы.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.MainPage', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.layout.container.Border',
		'qqext.view.search.VSearchForm',
		'qqext.view.reg.VRegForm',
		'qqext.view.notify.VNotify',
		'qqext.view.transmission.VTransmission',
		'qqext.view.exec.VExecForm',
		'Ext.panel.Panel',
		'Ext.layout.container.Card',
		'qqext.view.journal.VJournalForm',
		'Ext.container.Container',
		'qqext.view.VTitleBar',
		'qqext.view.VLeftMenu'
	],
	layout: 'border',
	initComponent: function() {
		var me = this,
				ns = qqext,
				mainPanel,
				mainPanelLayout;

		ns.searchForm = Ext.create('qqext.view.search.VSearchForm');
		ns.regForm = Ext.create('qqext.view.reg.VRegForm');
		ns.notifyForm = Ext.create('qqext.view.notify.VNotify');
		ns.transForm = Ext.create('qqext.view.transmission.VTransmission');
		ns.execForm = Ext.create('qqext.view.exec.VExecForm');

		mainPanel = Ext.create('Ext.panel.Panel', {
			layout: 'card',
			region: 'center',
			items: [
				Ext.create('qqext.view.journal.VJournalForm'),
				ns.searchForm,
				Ext.create('Ext.container.Container', {html: '<h1>Отчетные документы</h1>'}),
				ns.regForm,
				ns.notifyForm,
				ns.transForm,
				ns.execForm
			]
		});
		mainPanelLayout = mainPanel.getLayout();


		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.VTitleBar'),
				Ext.create('qqext.view.VLeftMenu'),
				mainPanel
			]});

		me.callParent(arguments);

		/*
		 * Показывает форму с заданным индексом
		 * @param {Number} idx индекс формы (начинается с 0)
		 * @return {Object/Boolean} в случае если форма поменялась, то возвращается активная форма,
		 * иначе false
		 */
		ns.setCurrentForm = function(idx) {
			return mainPanelLayout.setActiveItem(idx);
		};
		/*
		 * Возвращает активную форму
		 * @return {Object}
		 */
		ns.getCurrentForm = function() {
			return mainPanelLayout.getActiveItem();
		};
	}
});


