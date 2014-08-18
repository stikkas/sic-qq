/**
 *  Левый блок меню для разделов.
 */

Ext.define('qqext.view.VLeftMenu', {
	extend: 'Ext.container.Container',
	margin: '0 10 0 0',
	region: 'west',
	layout: 'vbox',
	initComponent: function() {
		var me = this, consts = qqext.Constants;

		consts.LEFT_MENUS = Ext.create('Ext.panel.Panel', {
			layout: 'card',
			items: [
				Ext.create('qqext.view.menu.SearchMenu',
						{itemId: consts.LM_ID_0}),
				Ext.create('qqext.view.menu.RequestMenu',
						{itemId: consts.LM_ID_1})
			]
		});

		Ext.applyIf(me, {
			items: [consts.LEFT_MENUS]});
		me.callParent(arguments);
	}
});
/*
 Ext.define('qqext.view.VLeftMenu', {
 extend: 'Ext.container.Container',
 region: 'west',
 layout: {
 type: 'vbox'
 },
 initComponent: function() {
 var me = this,
 utils = qqext.Utils;

 Ext.applyIf(me, {
 items: [
 utils.createButton('Регистрация запроса', 'q_registration'),
 utils.createButton('Уведомление заявителю', 'q_notification'),
 utils.createButton('Передача на исполнение', 'q_transmission'),
 utils.createButton('Исполнение запроса', 'q_execution')
 ]
 });
 me.callParent(arguments);
 }
 });
 */