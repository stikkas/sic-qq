/**
 * Панелька "Запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQuery', {
			extend : 'Ext.form.Panel',
			title:'Запрос',
			disabledCls:'',
			initComponent : function() {
				var me = this;
				var fields = new Array();
				var queryType, planDate, content, answerForm, revert;
				fields[fields.length] = queryType = Ext.create(
						'Ext.form.field.ComboBox', {
							fieldLabel : 'Вид запроса',
							name : 'questionType',
							store : Ext.getStore('queryType'),
							valueField : 'id',
							displayField : 'name'
						});

				fields[fields.length] = planDate = Ext.create(
						'Ext.form.field.Date', {
							name : 'plannedFinishDate',
							fieldLabel : 'Плановая дата исполнения запроса'
						});

				fields[fields.length] = content = Ext.create(
						'Ext.form.field.TextArea', {
							fieldLabel : 'Содержание запроса',
							name : 'content'
						});

				fields[fields.length] = answerForm = Ext.create(
						'Ext.form.field.ComboBox', {
							fieldLabel : 'Форма выдачи ответа',
							name : 'answerFormType',
							store : Ext.getStore('answerForm'),
							valueField : 'id',
							displayField : 'name'
						});

				fields[fields.length] = revert = Ext.create(
						'Ext.form.field.Checkbox', {
							fieldLabel : 'Мотивированный отказ',
							name : 'motivatedRefusal'
						});

				Ext.applyIf(me, {
							items : fields
						})

				me.callParent(arguments);
			}
		})