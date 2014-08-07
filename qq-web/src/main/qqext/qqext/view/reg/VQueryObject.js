/**
 * Панелька "На кого запрос" формы регистрации запроса
 */
Ext.define('qqext.view.reg.VQueryObject', {
			extend : 'Ext.form.Panel',
			title : 'На кого запрос',
			disabledCls:'',
			formBind:true,
			initComponent : function() {
				var me = this;
				var fields = new Array();
				var surname, name, fatherName, birthYear;

				fields[fields.length] = surname = Ext.create(
						'Ext.form.field.Text', {
							fieldLabel : 'Фамилия',
							name : 'requestObjectSurname'
						});

				fields[fields.length] = name = Ext.create(
						'Ext.form.field.Text', {
							fieldLabel : 'Имя',
							name : 'requestObjectName'
						});

				fields[fields.length] = fatherName = Ext.create(
						'Ext.form.field.Text', {
							fieldLabel : 'Отчество',
							name : 'requestFatherName'
						});

				fields[fields.length] = birthYear = Ext.create(
						'Ext.form.field.Number', {
							name : 'request_object_birthyear',
							fieldLabel : 'Год рождения',
							width:200
						})

				Ext.applyIf(me, {
							items : fields
						});

				me.callParent(arguments);
			}
		});