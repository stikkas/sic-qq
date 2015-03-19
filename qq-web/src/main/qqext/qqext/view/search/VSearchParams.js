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
		var createCmp = Ext.create,
				ns = qqext;
		Ext.applyIf(this, {
			items: [
				createCmp('FComboBox', 'Архив исполнитель', ns.stIds.litera, 'execOrg',
						{width: 650, labelWidth: 150, hidden: !ns.isSIC}), // Сервер отвечает чтобы отдавать СИЦу все а Архивам архивное
				createCmp('FComboBox', 'Вид запроса', ns.stIds.queryType, 'questionType',
						{width: 400, labelWidth: 150}),
				createCmp('FTextField', 'Содержание запроса', 'content',
						{width: 950, labelWidth: 150}),
				createCmp('FComboBox', 'Тип заявителя', ns.stIds.apltype, 'aplType',
						{width: 400, labelWidth: 150}),
				createCmp('FComboBox', 'Категория заявителя', ns.stIds.aplcat, 'aplCat',
						{width: 400, labelWidth: 150}),
				createCmp('Ext.form.FieldContainer', {
					fieldLabel: 'Дата регистрации',
					labelWidth: 150,
					cls: 'label_style',
					items: [
						createCmp('FDateField', 'c', 'regDateStart',
								{width: 110, labelWidth: 10, cls: 'float_l mar_t0'}),
						createCmp('FDateField', 'по', 'regDateEnd',
								{width: 130, labelWidth: 25, cls: 'mar_t0'})
					]}),
				createCmp('FLabel', 'На кого запрос', {cls: 'three_hor_lbl'}),
				createCmp('FioFieldContainer', 'naKogoLName', 'naKogoFName', 'naKogoMName'),
				createCmp('FLabel', 'Заявитель', {cls: 'three_hor_lbl'}),
				createCmp('FioFieldContainer', 'lName', 'fName', 'mName'),
				createCmp('FTextField', 'Организация', 'organization', {width: 913, labelWidth: 150}),
				createCmp('FTextField', '№ исходящего документа заявителя', 'numIshodDoc',
						{width: 500, labelWidth: 150})
			]
		});
		this.callParent();
	}
});
