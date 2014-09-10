/**
 * Форма "Уведомление заявителю". Эта форма владеет верхним меню
 * из двух кнопок "Сохранить" и "Редактировать".
 *
 * @author М. Сорокин
 */
Ext.define('qqext.view.notify.VNotify', {
	alias: 'VNotify',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.Menu'
	],
	height: 300,
	maxHeight: 300,
	title: 'Уведомление заявителю',
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 4,
	initComponent: function() {
		//----------Обработчики кнопок меню----------
		function saveNotify() {
			console.log(this);
			//TODO: реализовать
		}

		function editNotify() {
			console.log(this);
			//TODO: реализовать
		}

		//-------------------------------------------

		var me = saveNotify.sc = editNotify.sc = this,
				ns = qqext,
				factory = ns.factory,
				ComboBox = factory.ComboBox,
				labels = ns.labels,
				menus = ns.createHButtonMenu([
					{text: labels.save, action: saveNotify},
					{text: labels.edit, action: editNotify}
				]);

		Ext.applyIf(me, {
			items: [
				new ComboBox('ФИО исполнителя', 'allUsers', 'executor'),
				new ComboBox('Тип документов', 'docType', 'docType'),
				new ComboBox('Способ передачи', 'answerForm', 'deliveryType'),
				new factory.DateField('Дата уведомления', 'notificationDate')
			],
			menus: menus
		});

		me.callParent(arguments);
		ns.Menu.editReqMenu.insert(1, me.menus);
	}
});