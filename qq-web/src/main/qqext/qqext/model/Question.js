/**
 * Модель запроса
 */
Ext.define('qqext.model.Question', {
	extend: 'Ext.data.Model',
	requires: [
		'Ext.data.proxy.Rest',
		'qqext.cmp.FilesReader'
	],
	fields: [
		{name: 'id', type: 'int', defaultValue: null, convert: null, isNull: true},
		// Литера
		{name: 'litera', type: 'int', defaultValue: null, convert: null},
		// № Входящего документа, префикс
		{name: 'prefix', type: 'int', defaultValue: null, convert: null},
		// № Входящего документа, суффикс
		{name: 'sufix', type: 'int', defaultValue: null, convert: null},
		// Дата регистрации
		{name: 'regDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		// Способ передачи
		{name: 'transferMethod', type: 'int', defaultValue: null, convert: null},
		// Исполняющая организация
		{name: 'execOrg', type: 'int', defaultValue: null, convert: null},
		// Регистратор
		{name: 'registrator', type: 'int', defaultValue: null, convert: null},
		// Тип запроса (Биографический, Социально-...)
		{name: 'questionType', type: 'int', defaultValue: null, convert: null},
		// Плановая дата исполнения запроса
		// TODO: проверить работу без костыля, может уже зарасло
		{name: 'planDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v.valueOf() + qqext.msPhour); // Костыль
			}},
		// Содержание запроса
		{name: 'content', type: 'string', defaultValue: null},
		// Форма выдачи ответа
		{name: 'replyForm', type: 'int', defaultValue: null, convert: null},
		// Мотивированный отказ
		{name: 'motivRefuse', type: 'boolean', defaultValue: false, convert: null},
		// Тип заявителя
		{name: 'applType', type: 'int', defaultValue: null, convert: null},
		// Фамилия
		{name: 'lName', type: 'string', defaultValue: null},
		// Имя
		{name: 'fName', type: 'string', defaultValue: null},
		// Отчество
		{name: 'mName', type: 'string', defaultValue: null},
		// Страна
		{name: 'country', type: 'string', defaultValue: null},
		// Адрес
		{name: 'adres', type: 'string', defaultValue: null},
		// Телефон
		{name: 'phone', type: 'string', defaultValue: null},
		// Организация
		{name: 'orgName', type: 'string', defaultValue: null},
		// Категория заявителя
		{name: 'applCat', type: 'int', defaultValue: null, convert: null},
		// № Исходящего документа
		{name: 'issueDocNum', type: 'string', defaultValue: null},
		// Дата исходящего документа
		{name: 'issueDocDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		// ФИО юр. лица (кто подписал исходящий документ)
		{name: 'issueDocFio', type: 'string', defaultValue: null},
		// Приложения
		{name: 'apps', type: 'string', defaultValue: null},
		// На кого запрос, Фамилия
		{name: 'objLName', type: 'string', defaultValue: null, convert: null},
		// На кого запрос, Имя
		{name: 'objFName', type: 'string', defaultValue: null, convert: null},
		// На кого запрос, Отчество
		{name: 'objMName', type: 'string', defaultValue: null, convert: null},
		// На кого запрос, год рождения
		{name: 'objBYear', type: 'int', defaultValue: null, convert: null},
		// Статус запроса
		{name: 'status', type: 'int', defaultValue: null, convert: null},
		// Статус уведомления
		{name: 'notiStatus', type: 'int', defaultValue: null, convert: null}
	],
	proxy: {
		type: 'rest',
		url: 'rest/question',
		reader: {
			type: 'files',
			model: 'qqext.model.Question'
		},
		writer: 'json',
		listeners: {
			exception: function (proxy, answer, operation) {
				operation.error = answer.responseText;
			}
		}
	}
});
