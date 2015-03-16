/**
 * Форма "Уведомление заявителю". Эта форма владеет верхним меню
 * из двух кнопок "Сохранить" и "Редактировать".
 *
 * @author М. Сорокин
 */
Ext.define('qqext.view.notify.VNotify', {
	alias: 'VNotify',
	extend: 'qqext.view.StyledPanel',
	xtype: 'vinfoform',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.DateField',
		'qqext.button.ToolButton',
		'qqext.view.menu.HButtonMenu',
		'qqext.Menu'
	],
	mixins: ['qqext.cmp.DisableButtons'],
	height: 300,
	maxHeight: 800,
	title: 'Уведомление заявителю',
	fieldDefaults: {
		blankText: 'Обязательно для заполнения',
		validateOnChange: false
	},
	/**
	 * Индекс, в соответствии с которым сопоставляется верхнее меню (см. qqext.Menu)
	 * @private
	 */
	_idx: 4,
	listeners: {
		activate: function (me) {
			var ns = qqext;
			ns.switchArticleButton(ns.getButton(ns.btns.notify));
			ns.Menu.setEditMenu(me._idx);
			if (!ns.creq.n) {
				// Значит новый запрос (не тот который был до этого)
				ns.model.Notification.load(ns.creq.q.get('id'), {
					success: function (record) {
						ns.creq.n = record;
						me.loadRecord(record);
						me.setViewOnly(true);
						me._disableButtons(true, 0);
						me._disableButtons(!ns.reg, 1);
						me._disableButtons(!record.get('executor'), 2);
						me._files.loadRecord(record.files);
					},
					failure: function (record, operation) {
						ns.showError("Ошибка сохранения", operation.getError());
					}
				});
				ns.initRequired(me);
			}
//		ns.viewport.doLayout();
		}
	},
	initComponent: function () {
		//----------Обработчики кнопок меню----------
		function saveNotify() {
			if (!ns.checkDates([me._df, me._idf]))
				return;
			var noti = ns.creq.n;
			me._disableButtons(true, 0, 1);
			me.setViewOnly(true);
			me.updateRecord(noti);
			if (me.isValid()) {
				var status,
						files = me._files;

				if (noti.get('issueDate'))
					status = ns.notiStatsId[ns.notiStats.send];
				else if (noti.get('notiDate'))
					status = ns.notiStatsId[ns.notiStats.exec];

				noti.set('status', status);

				files.getForm().submit({
					clientValidation: false,
					url: 'rest/notification',
					method: 'POST',
					params: {
						deletedFiles: Ext.encode(files.deletedFiles),
						model: Ext.encode(noti.getData())
					},
					success: function (form, action) {
						var data = action.result.data;
						noti = ns.creq.n = Ext.create('qqext.model.Notification', data);
						noti.files = data.files;
						me.loadRecord(noti);
						me._files.loadRecord(noti.files);
						me._disableButtons(false, 1, 2);
						ns.infoChanged = true;
					},
					failure: function (form, action) {
						ns.showError("Ошибка сохранения", action.response.responseText);
						me.setViewOnly(false);
						// Включаем кнопку сохранить
						me._disableButtons(false, 0);
						files.showFiles();
					}
				});
			} else {
				ns.showError("Форма заполнена неправильно", me.getErrors());
				me.setViewOnly(false);
				me._disableButtons(false, 0);
			}
		}

		function editNotify() {
			me._disableButtons(true, 1);
			me._disableButtons(false, 0);
			me.setViewOnly(false);
		}

		// Выполняет печать (переправку пользователся на открытие документа) уведомление заявителя
		function printNotify() {
			window.open(ns.urls.reqnoti + '?id=' + ns.creq.n.get('id'));
		}
		//-------------------------------------------

		var me = this,
				ns = qqext,
				createCmp = Ext.create,
				labels = ns.labels,
				stores = ns.stIds,
				menu = createCmp('HButtonMenu', [
					{text: labels.save, action: saveNotify, opts: {cls: 'save_btn'}},
					{text: labels.edit, action: editNotify, opts: {cls: 'edit_btn'}},
					{text: labels.print, action: printNotify, opts: {cls: 'print_btn'}}
				], 'ToolButton', me);
		Ext.applyIf(me, {
			items: [
				createCmp('FComboBox', 'ФИО исполнителя', stores.execs, 'executor', {
					width: 450,
					labelWidth: 150,
					allowBlank: false
				}),
				createCmp('FComboBox', 'Тип документов', ns.stIds.doctype, 'docType', {
					width: 450,
					labelWidth: 150
				}),
				createCmp('FTextArea', 'Кому', 'toWhom', {
					width: 450,
					labelWidth: 150,
					allowBlank: false
				}),
				me._df = createCmp('FDateField', 'Дата уведомления', 'notiDate', {
					width: 270,
					labelWidth: 150
				}),
				createCmp('FComboBox', 'Способ передачи', stores.sendType, 'delType', {
					width: 270,
					labelWidth: 150
				}),
				me._idf = createCmp('FDateField', 'Дата выдачи/отправки документа', 'issueDate', {
					width: 270,
					labelWidth: 150
				}),
				me._files = createCmp('FAttachedFiles', "Подготовленный документ",
						'Q_VALUE_FILE_TYPE_INFO', 'rest/files', {
							collapsible: true,
							collapsed: true,
							cls: 'collapse_section attached_section'
						})
			]
		});
		me._btns = menu.items;
		me.callParent();
		ns.Menu.editReqMenu.insert(1, menu);
	}
});
