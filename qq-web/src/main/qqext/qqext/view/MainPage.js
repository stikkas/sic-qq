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
		'qqext.Constants',
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
				consts = qqext.Constants,
				mainPanel,
				mainPanelLayout;

		consts.searchForm = Ext.create('qqext.view.search.VSearchForm');
		consts.regForm = Ext.create('qqext.view.reg.VRegForm');
		consts.notifyForm = Ext.create('qqext.view.notify.VNotify');
		consts.transForm = Ext.create('qqext.view.transmission.VTransmission');
		consts.execForm = Ext.create('qqext.view.exec.VExecForm');

		mainPanel = Ext.create('Ext.panel.Panel', {
			layout: 'card',
			region: 'center',
			items: [
				Ext.create('qqext.view.journal.VJournalForm'),
				consts.searchForm,
				Ext.create('Ext.container.Container', {html: '<h1>Отчетные документы</h1>'}),
				consts.regForm,
				consts.notifyForm,
				consts.transForm,
				consts.execForm
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

		/**
		 * Показывает форму с заданным индексом
		 * @param {Number} idx индекс формы (начинается с 0)
		 * @return {Object/Boolean} в случае если форма поменялась, то возвращается активная форма,
		 * иначе false
		 */
		consts.setCurrentForm = function(idx) {
			return mainPanelLayout.setActiveItem(idx);
		};
		/**
		 * Возвращает активную форму
		 * @returns {Object}
		 */
		consts.getCurrentForm = function() {
			return mainPanelLayout.getActiveItem();
		};
	}
});


