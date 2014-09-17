Ext.define('qqext.model.Applicant', (function() {
	var ns = Ext.ns('qqext'),
			applicant = ns.applicant = {
				applicantType: ['applicantType', 'Тип заявителя'],
				organization: ['organization', 'Организация'],
				firstName: ['firstName', 'Имя'],
				lastName: ['lastName', 'Фамилия'],
				middleName: ['middleName', 'Отчество'],
				birthYear: ['birthYear', 'Год рождения'],
				applicantCategory: ['applicantCategory', 'Категория заявителя'],
				country: ['country', 'Страна'],
				address: ['address', 'Адрес'],
				phone: ['phone', 'Телефон'],
				issueDocNum: ['issueDocNum', '№ исходящего документа'],
				issueDocDate: ['issueDocDate', 'Дата'],
				fioJurPerson: ['fioJurPerson', 'ФИО юр. лица (кто подписал)'],
				appends: ['appends', 'Приложения']};
	return {
		alias: 'ApplicantModel',
		extend: 'Ext.data.Model',
		requires: ['Ext.data.proxy.Rest'],
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', defaultValue: null, convert: null},
			{name: applicant.applicantType[0], type: 'int', defaultValue: null, convert: null},
			{name: applicant.organization[0], type: 'string'},
			{name: applicant.firstName[0], type: 'string'},
			{name: applicant.lastName[0], type: 'string'},
			{name: applicant.middleName[0], type: 'string'},
			{name: applicant.birthYear[0], type: 'int', defaultValue: null, convert: null},
			{name: applicant.applicantCategory[0], type: 'int', defaultValue: null, convert: null},
			{name: applicant.country[0], type: 'string', defaultValue: null, convert: null},
			{name: applicant.address[0], type: 'string', defaultValue: null, convert: null},
			{name: applicant.phone[0], type: 'string', defaultValue: null, convert: null},
			{name: applicant.issueDocNum[0], type: 'string', defaultValue: null, convert: null},
			{name: applicant.issueDocDate[0], type: 'date', convert: function(v) {
					if (v)
						return new Date(v);
				}},
			{name: applicant.fioJurPerson[0], type: 'string', defaultValue: null, convert: null},
			{name: applicant.appends[0], type: 'string', defaultValue: null, convert: null}
		],
		belongsTo: 'qqext.model.Question',
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/applicant',
			reader: 'json',
			writer: 'json'
		}
	};
})());
