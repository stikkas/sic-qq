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
		'qqext.factory.Label',
		'Ext.form.FieldContainer'
	],
	title: 'Параметры поиска',
	initComponent: function () {
		var createCmp = Ext.create;
		Ext.applyIf(this, {
			items: [
				createCmp('FComboBox', 'Архив исполнитель', qqext.stIds.execOrgs, 'archiveId',
						{width: 650, labelWidth: 150}),
				createCmp('FComboBox', 'Вид запроса', qqext.stIds.queryType, 'queryTypeId',
						{width: 400, labelWidth: 150}),
				createCmp('FTextField', 'Содержание запроса', 'queryContent',
						{width: 950, labelWidth: 150}),
				createCmp('FComboBox', 'Тип заявителя', 'applicantType', 'applicantTypeId',
						{width: 400, labelWidth: 150}),
				createCmp('FComboBox', 'Категория заявителя', 'applicantCategory', 'applicantCategoryId',
						{width: 400, labelWidth: 150}),
				createCmp('Ext.form.FieldContainer', {
					fieldLabel: 'Дата регистрации',
					labelWidth: 150,
                                        cls:'label_style',
					items: [
						createCmp('FDateField', 'c', 'regDateStart',
								{width: 110, labelWidth: 10, cls:'float_l mar_t0'}),
						createCmp('FDateField', 'по', 'regDateEnd',
								{width: 130, labelWidth: 25, cls:'mar_t0'})
					]}),
				createCmp('FLabel', 'На кого запрос', {cls: 'three_hor_lbl'}),
				createCmp('FioFieldContainer', 'reqLastName', 'reqFirstName', 'reqMiddleName'),
				createCmp('FLabel', 'Заявитель', {cls: 'three_hor_lbl'}),
				createCmp('FioFieldContainer', 'applLastName', 'applFirstName', 'applMiddleName'),
				createCmp('FTextField', 'Организация', 'organization', {width: 913, labelWidth: 150}),
				createCmp('FTextField', '№ исходящего документа заявителя', 'issueDocNum',
						{width: 500, labelWidth: 150})
			]
		});
		this.callParent();
	}
});
