/**
 * Панель с параметрами поиска
 */
Ext.define('qqext.view.search.VSearchParams', {
	extend: 'Ext.form.Panel',
	requires: ['hawk_common.fix.FixedField'],
	title: 'Параметры поиска',
	margin: '0 10 0 0',
	/**
	 * Возвращает объект типа fiofieldcontainer
	 * @private
	 * @param {String} surname фамилия
	 * @param {String} name имя
	 * @param {String} fatherName отчество
	 * @returns {Object} объект, на основе которого ExtJS сделает FioFieldContainer
	 */
	createFioFieldContainer: function(surname, name, fatherName) {
		return {
			xtype: 'fiofieldcontainer',
			nSurname: surname,
			nName: name,
			nFatherName: fatherName
		};
	},
	/**
	 * Возвращает объект типа combobox
	 * @private
	 * @param {String} fieldLabel Метка селектора
	 * @param {String} store алиас хранилища
	 * @param {String} name имя поля формы
	 * @param {String} displayedField поле хранилища для отображения (не обязательно)
	 * @param {String} valueField поле хранилища для значения (не обязательно)
	 * @returns {Object} объект, на основе которого ExtJS сделает ComboBox
	 */
	createComboBox: function(fieldLabel, store, name, displayedField, valueField) {
		return {
			xtype: 'combobox',
			fieldLabel: fieldLabel,
			displayField: displayedField || 'name',
			valueField: valueField || 'id',
			store: store,
			name: name
		};
	},
	/**
	 * Возвращает объект типа label
	 * @private
	 * @param {String} text надпись
	 * @returns {Object} объект, на основе которого ExtJS сделает Label
	 */
	createLabel: function(text) {
		return {
			xtype: 'label',
			text: text
		};
	},
	/**
	 * Создает виджет типа textfield
	 * @private
	 * @param {String} fieldLabel надпись для поля
	 * @param {String} name имя (для формы)
	 * @returns {Object} объект, на основе которого ExtJS сделает Text
	 */
	createText: function(fieldLabel, name) {
		return {
			xtype: 'textfield',
			fieldLabel: fieldLabel,
			name: name
		}
	},
	/**
	 * Возвращает объект типа datefield
	 * @private
	 * @param {String} fieldLabel метка для виджета
	 * @param {String} name имя (скорее всего для формы)
	 * @returns {Object} объект, на основе которого ExtJS сделает Date
	 */
	createFieldDate: function(fieldLabel, name) {
		return {
			xtype: 'datefield',
			fieldLabel: fieldLabel,
			name: name
		};
	},
	/**
	 * @private
	 */
	initComponent: function() {
		var me = this;
		Ext.applyIf(me, {
			items: [
				me.createComboBox('Архив исполнитель', 'inboxDocExecOrg', 'archiveId'),
				me.createComboBox('Вид запроса', 'queryType', 'queryTypeId'),
				me.createText('Содержание запроса', 'queryContent'),
				me.createComboBox('Тип заявителя', 'applicantType', 'applicantTypeId'),
				me.createComboBox('Категория заявителя', 'applicantCategory', 'applicantCategoryId'),
				me.createFieldDate('Дата регистрации', 'regDate'),
				me.createLabel('На кого запрос'),
				me.createFioFieldContainer('reqObjSurname', 'reqObjName', 'regObjFatherName'),
				me.createLabel('Заявитель'),
				me.createFioFieldContainer('applSurname', 'applName', 'applFatherName')
			]
		});
		me.callParent(arguments);
	}
});