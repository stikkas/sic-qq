/**
 * Панель с параметрами поиска
 */
Ext.define('qqext.view.search.VSearchParams', {
	alias: 'VSearchParams',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.view.search.FioFieldContainer',
		'qqext.factory.TextField',
		'qqext.factory.DateField',
		'qqext.factory.Label'
	],
	title: 'Параметры поиска',
	initComponent: function() {
		var createCmp = Ext.create;
		Ext.applyIf(this, {
			items: [
				createCmp('FComboBox', 'Архив исполнитель', 'inboxDocExecOrg', 'archiveId'),
				createCmp('FComboBox', 'Вид запроса', 'queryType', 'queryTypeId'),
				createCmp('FTextField', 'Содержание запроса', 'queryContent'),
				createCmp('FComboBox', 'Тип заявителя', 'applicantType', 'applicantTypeId'),
				createCmp('FComboBox', 'Категория заявителя', 'applicantCategory', 'applicantCategoryId'),
				createCmp('FDateField', 'Дата регистрации', 'regDate'),
				createCmp('FLabel', 'На кого запрос'),
				createCmp('FioFieldContainer', 'reqObjSurname', 'reqObjName', 'regObjFatherName'),
				createCmp('FLabel', 'Заявитель'),
				createCmp('FioFieldContainer', 'applSurname', 'applName', 'applFatherName')
			]
		});
		this.callParent();
	}
});
