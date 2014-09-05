Ext.define('qqext.model.qq.Applicant', (function() {
	var ns = Ext.ns('qqext'),
			applicants = ns.applicants = {
				applicantType: ['applicantType', 'Тип заявителя'],
				applicantObject: ['applicantObject', 'Организация'],
				name: ['name', 'Имя'],
				surname: ['surname', 'Фамилия'],
				fatherName: ['fatherName', 'Отчество'],
				birthYear: ['birthYear', 'Год рождения'],
				applicantCategory: ['applicantCategory', 'Категория заявителя'],
				country: ['country', 'Страна'],
				address: ['address', 'Адрес'],
				phone: ['phone', 'Телефон'],
				inboxDocNum: ['inboxDocNum', '№ входящего документа'],
				inboxDocDate: ['inboxDocDate', 'Дата'],
				nameOfJurPerson: ['nameOfJurPerson', 'ФИО юр. лица (кто подписал)'],
				addendum: ['addendum', 'Приложения']};
	return {
		extend: 'Ext.data.Model',
		idProperty: 'id',
		clientIdProperty: 'cliId',
		fields: [{
				name: 'id',
				type: 'int',
				defaultValue: null,
				convert: null
			}, {
				name: 'cliId',
				type: 'string'
			}, {
				name: applicants.applicantType[0],
				type: 'int',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.applicantObject[0],
				type: 'string'
			}, {
				name: applicants.name[0],
				type: 'string'
			}, {
				name: applicants.surname[0],
				type: 'string'
			}, {
				name: applicants.fatherName[0],
				type: 'string'
			}, {
				name: applicants.birthYear[0],
				type: 'int',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.applicantCategory[0],
				type: 'int',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.country[0],
				type: 'string',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.address[0],
				type: 'string',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.phone[0],
				type: 'string',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.inboxDocNum[0],
				type: 'string',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.inboxDocDate[0],
				type: 'date'

			}, {
				name: applicants.nameOfJurPerson[0],
				type: 'string',
				defaultValue: null,
				convert: null
			}, {
				name: applicants.addendum[0],
				type: 'string',
				defaultValue: null,
				convert: null
			}]
	};
})());
