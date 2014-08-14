/**
 *  Левый блок меню для разделов "ЖВК", "ПОИСК", "Отчетные документы"
 */

Ext.define('qqext.view.VLeftMenuSearch', {
	extend: 'Ext.container.Container',
	margin: '0 10 0 0',
	region: 'west',
	layout: {type: 'vbox'},
	initComponent: function() {
		var me = this,
				utils = qqext.Utils;

		Ext.applyIf(me, {
			items: [
				utils.createButton('ЖВК', 'journal'),
				utils.createButton('Поиск', 'search'),
				utils.createButton('Отчетные документы', 'reports')
			]
		});

		me.callParent(arguments);
	}
});