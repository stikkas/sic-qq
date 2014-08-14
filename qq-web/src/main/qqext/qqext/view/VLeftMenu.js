/**
 * Меню для добавления документа. По умолчанию располагается слева.
 */
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
				utils.createButton('Регистрация', 'q_registration'),
				utils.createButton('Уведомление заявителю', 'q_notification'),
				utils.createButton('Передача на исполнение', 'q_transmission'),
				utils.createButton('Исполнение запроса', 'q_execution')
			]
		});
		me.callParent(arguments);
	}
});