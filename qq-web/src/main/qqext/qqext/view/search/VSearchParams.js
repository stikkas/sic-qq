/**
 * 
 */
Ext.define('qqext.view.search.VSearchParams', {
	extend:'Ext.form.Panel',
			title : 'Параметры поиска',
			margin : '0 10 0 0',
			initComponent : function() {
				var me = this;
				var archive = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Архив исполнитель',
							displayField : 'name',
							valueField : 'id',
							store : 'inboxDocExecOrg',
							name:'archiveId'
						});

				var requestType = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Вид запроса',
							displayField : 'name',
							valueField : 'id',
							store : 'queryType',
							name:'queryTypeId'
						});

				var content = Ext.create('Ext.form.field.Text', {
							width : 600,
							fieldLabel : 'Содержание запроса',
							name:'queryContent'
						});

				var applicantType = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Тип заявителя',
							displayField : 'name',
							valueField : 'id',
							store : 'applicantType',
							name:'applicantTypeId'
						});
				var applicantCategory = Ext.create('Ext.form.field.ComboBox', {
							fieldLabel : 'Категория заявителя',
							displayField : 'name',
							valueField : 'id',
							store : 'applicantCategory',
							name:'applicantCategoryId'
						});
				var regDate = Ext.create('Ext.form.field.Date', {
							fieldLabel : 'Дата регистрации',
							name:'regDate'
						});
				var queryObjectLabel = Ext.create('Ext.form.Label', {
							text : 'На кого запрос'
						});
				var fcQueryObject = Ext
						.create('qqext.view.search.FioFieldContainer',{
							nSurname:'reqObjSurname',
							nName:'reqObjName',
							nFatherName:'regObjFatherName'
						});
				var applicantFioLabel = Ext.create('Ext.form.Label', {
							text : 'Заявитель'
						});
				var fcApplicant = Ext
						.create('qqext.view.search.FioFieldContainer',{
							nSurname:'applSurname',
							nName:'applName',
							nFatherName:'applFatherName'
						});
				var itms = new Array();
				itms[itms.length] = archive;
				itms[itms.length] = requestType;
				itms[itms.length] = content;
				itms[itms.length] = applicantType;
				itms[itms.length] = applicantCategory;
				itms[itms.length] = regDate;
				itms[itms.length] = queryObjectLabel;
				itms[itms.length] = fcQueryObject;
				itms[itms.length] = applicantFioLabel;
				itms[itms.length] = fcApplicant;
				Ext.applyIf(me, {
							items : itms
						});

				me.callParent(arguments);
			}
		});