/**
 * Панель с параметрами поиска
 */
Ext.define('qqext.view.search.VSearchParams', {
	extend: 'qqext.view.StyledPanel',
	requires: [
		'hawk_common.fix.FixedField',
		'qqext.factory.ComboBox',
		'qqext.factory.FioField'
	],
	title: 'Параметры поиска',
	initComponent: function() {
		var
				me = this,
				ComboBox = qqext.factory.ComboBox,
				FioFieldContainer = qqext.factory.FioField;
		Ext.applyIf(me, {
			items: [
				new ComboBox('Архив исполнитель', 'inboxDocExecOrg', 'archiveId'),
				new ComboBox('Вид запроса', 'queryType', 'queryTypeId'),
				createText('Содержание запроса', 'queryContent'),
				new ComboBox('Тип заявителя', 'applicantType', 'applicantTypeId'),
				new ComboBox('Категория заявителя', 'applicantCategory', 'applicantCategoryId'),
				createFieldDate('Дата регистрации', 'regDate'),
				createLabel('На кого запрос'),
				new FioFieldContainer('reqObjSurname', 'reqObjName', 'regObjFatherName'),
				createLabel('Заявитель'),
				new FioFieldContainer('applSurname', 'applName', 'applFatherName')
			]
		});
		me.callParent(arguments);


		/**
		 * Возвращает объект типа label
		 * @private
		 * @param {String} text надпись
		 * @returns {Object} объект, на основе которого ExtJS сделает Label
		 */
		function createLabel(text) {
			return {
				xtype: 'label',
				text: text
			};
		}
		/**
		 * Создает виджет типа textfield
		 * @private
		 * @param {String} fieldLabel надпись для поля
		 * @param {String} name имя (для формы)
		 * @returns {Object} объект, на основе которого ExtJS сделает Text
		 */
		function createText(fieldLabel, name) {
			return {
				xtype: 'textfield',
				fieldLabel: fieldLabel,
				name: name
			};
		}
		/**
		 * Возвращает объект типа datefield
		 * @private
		 * @param {String} fieldLabel метка для виджета
		 * @param {String} name имя (скорее всего для формы)
		 * @returns {Object} объект, на основе которого ExtJS сделает Date
		 */
		function createFieldDate(fieldLabel, name) {
			return {
				xtype: 'datefield',
				fieldLabel: fieldLabel,
				name: name
			};
		}
	}
});