/**
 * 
 */
Ext.define('qqext.view.notify.VNotify', {
			extend : 'Ext.form.Panel',
			height : 300,
			maxHeight : 300,
			margin : '0 10 0 0',
			title : 'Уведомление заявителю',
			initComponent : function() {
				var me = this;

				var fio = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'ФИО исполнителя',
							displayField : 'name',
							valueField : 'id',
							name : 'executor',
							store:'allUsers'
						});

				var docType = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Тип документов',
							displayField : 'name',
							valueField : 'id',
							name : 'docType',
							store : Ext.getStore('docType')
						});

				var deliveryType = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Способ передачи',
							displayField : 'name',
							valueField : 'id',
							store : Ext.getStore('answerForm'),
							name : 'deliveryType'
						});

				var notifyDate = Ext.create('Ext.form.field.Date', {
							fieldLabel : 'Дата уведомления',
							name : 'notificationDate'
						});

				Ext.applyIf(me, {
							items : [fio, docType, deliveryType, notifyDate]
						});

				me.callParent(arguments);
			}
		});