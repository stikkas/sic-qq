/**
 * Страница показывается когда пользователь начинает работать с программой
 * АС Запросы.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.MainPage', {
	alias: 'MainPage',
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

		mainPanel = Ext.create('Ext.panel.Panel', {
			layout: 'card',
			region: 'center',
			items: [
				ns.jvkForm = Ext.create('VJournalForm'),
				ns.searchForm = Ext.create('VSearchForm'),
				Ext.create('Ext.container.Container', {html: '<h1>Отчетные документы</h1>'}),
				ns.regForm = Ext.create('VRegForm'),
				ns.notifyForm = Ext.create('VNotify'),
				ns.transForm = Ext.create('VTransmission'),
				ns.execForm = Ext.create('VExecForm')
			]
		});
		mainPanelLayout = mainPanel.getLayout();


		Ext.applyIf(me, {
			items: [
				Ext.create('VTitleBar'),
				Ext.create('VLeftMenu'),
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


