/**
 * Форма "Уведомление заявителю"
 *
 * @author М. Сорокин
 */
Ext.define('qqext.view.notify.VNotify', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField'
	],
	height: 300,
	maxHeight: 300,
	title: 'Уведомление заявителю',
	initComponent: function() {
		var me = this,
				factory = qqext.factory,
				ComboBox = factory.ComboBox;

		Ext.applyIf(me, {
			items: [
				new ComboBox('ФИО исполнителя', 'allUsers', 'executor'),
				new ComboBox('Тип документов', 'docType', 'docType'),
				new ComboBox('Способ передачи', 'answerForm', 'deliveryType'),
				new factory.DateField('Дата уведомления', 'notificationDate')
			]
		});

		me.callParent(arguments);
	}
});