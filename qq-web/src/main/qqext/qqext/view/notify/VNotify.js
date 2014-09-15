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
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
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
				createCmp = Ext.create,
				labels = ns.labels,
				notf = ns.notification,
				menus = createCmp('HButtonMenu', [
					{text: labels.save, action: saveNotify},
					{text: labels.edit, action: editNotify}
				], 'ToolButton');


		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', notf.executor[1], 'allUsers', notf.executor[0]),
				createCmp('FComboBox', notf.docType[1], 'docType', notf.docType[0]),
				createCmp('FComboBox', notf.deliveryType[1], 'answerForm', notf.deliveryType[0]),
				createCmp('FDateField', notf.notificationDate[1], notf.notificationDate[0])
			],
			menus: menus
		});

		me.callParent();
		ns.Menu.editReqMenu.insert(1, me.menus);
	}
});
