/**
 * Панель с параметрами поиска
 */
Ext.define('qqext.view.search.VSearchParams', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'qqext.factory.ComboBox',
		'qqext.factory.FioField',
		'qqext.factory.TextField',
		'qqext.factory.DateField',
		'qqext.factory.Label'
	],
	title: 'Параметры поиска',
	initComponent: function() {
		var
				me = this,
				factory = qqext.factory,
				ComboBox = factory.ComboBox,
				FioFieldContainer = factory.FioField,
				Label = factory.Label;
		Ext.applyIf(me, {
			items: [
				new ComboBox('Архив исполнитель', 'inboxDocExecOrg', 'archiveId'),
				new ComboBox('Вид запроса', 'queryType', 'queryTypeId'),
				new factory.TextField('Содержание запроса', 'queryContent'),
				new ComboBox('Тип заявителя', 'applicantType', 'applicantTypeId'),
				new ComboBox('Категория заявителя', 'applicantCategory', 'applicantCategoryId'),
				new factory.DateField('Дата регистрации', 'regDate'),
				new Label('На кого запрос'),
				new FioFieldContainer('reqObjSurname', 'reqObjName', 'regObjFatherName'),
				new Label('Заявитель'),
				new FioFieldContainer('applSurname', 'applName', 'applFatherName')
			]
		});
		me.callParent(arguments);
	}
});