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
		var
				ns = qqext,
				createCmp = Ext.create,
				mainPanel,
				mainPanelLayout;

		mainPanel = Ext.create('Ext.panel.Panel', {
			layout: 'card',
			region: 'center',
			items: [
				ns.jvkForm = createCmp('VJournalForm'),
				ns.searchForm = createCmp('VSearchForm'),
				createCmp('Ext.container.Container', {html: '<h1>Отчетные документы</h1>'}),
				ns.regForm = createCmp('VRegForm'),
				ns.notifyForm = createCmp('VNotify'),
				ns.transForm = createCmp('VTransmission'),
				ns.execForm = createCmp('VExecForm')
			]
		});
		mainPanelLayout = mainPanel.getLayout();


		Ext.applyIf(this, {
			items: [
				createCmp('VTitleBar'),
				createCmp('VLeftMenu'),
				mainPanel
			]});

		this.callParent();

		// Разрешаем добавлять запрос только пользователю с соответсвующими правами
		ns.getButton(ns.btns.add).setDisabled(!ns.user.isAllowed(ns.rules.reg));
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

