/**
 * 
 */
Ext.define('qqext.view.exec.VExecInfo', {
			extend : 'Ext.form.Panel',
			title : 'Сведения об исполнении',
			maxHeight : 205,
			margin : '0 10 0 0',
			initComponent : function() {
				var me = this;
				var d1 = Ext.create('Ext.form.field.Date', {
							fieldLabel : 'Дата исполнения',
							name:'execDate'
						});

				var resultOfAnswer = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Результат ответа',
							displayField : 'name',
							valueField : 'id',
							store : Ext.getStore('resultOfAnswer'),
							editable : false,
							name:'answerResult'
						});

				var tematicOfAnswer = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Тематика ответа',
							displayField : 'name',
							valueField : 'id',
							store : Ext.getStore('tematicOfAnswer'),
							editable : false,
							name:'usageAnswer'
						});

				var diffCategory = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Категория сложности',
							displayField : 'name',
							valueField : 'id',
							store : Ext.getStore('diffCategory'),
							width : 175,
							editable : false,
							name:'categoryComplexity'
						});

				Ext.applyIf(me, {
							items : [d1, resultOfAnswer, tematicOfAnswer,
									diffCategory]
						});
				me.callParent(arguments);
			}
		});