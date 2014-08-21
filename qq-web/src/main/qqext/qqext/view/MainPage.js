/**
 * Страница показывается когда пользователь начинает работать с программой
 * АС Запросы.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.view.MainPage', {
	extend: 'Ext.container.Container',
	requires: [
		'qqext.view.VTitleBar',
		'qqext.view.VLeftMenu',
		'qqext.Constants',
		'qqext.view.search.VSearchForm',
		'qqext.view.journal.VJournalForm',
		'qqext.view.reg.VRegForm',
		'qqext.view.notify.VNotify',
		'qqext.view.transmission.VTransmission',
		'qqext.view.exec.VExecForm'
	],
	layout: 'border',
	initComponent: function() {
		var me = this,
				consts = qqext.Constants;
		consts.searchForm = Ext.create('qqext.view.search.VSearchForm');
		consts.regForm = Ext.create('qqext.view.reg.VRegForm');
		consts.notifyForm = Ext.create('qqext.view.notify.VNotify');
		consts.transForm = Ext.create('qqext.view.transmission.VTransmission');
		consts.execForm = Ext.create('qqext.view.exec.VExecForm');
		consts.mainPanel = Ext.create('Ext.panel.Panel', {
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

		Ext.applyIf(me, {
			items: [
				Ext.create('qqext.view.VTitleBar'),
				Ext.create('qqext.view.VLeftMenu'),
				consts.mainPanel
			]});

		consts.getButton('jvk').fireEvent('click');

		me.callParent(arguments);
	}
});


