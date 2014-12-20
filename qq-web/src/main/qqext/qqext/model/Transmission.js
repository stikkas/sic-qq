Ext.define('qqext.model.Transmission', (function () {
	var ns = Ext.ns('qqext'),
			trans = ns.transmission = {
				bossExecutor: ['bossExecutor', 'Ответственный за исполнение'],
				bossExecutionDate: ['bossExecutionDate', 'Дата'],
				executor: ['executor', 'ФИО исполнителя'],
				executionDate: ['executionDate', 'Дата'],
				coexec: ['coexec', 'Соисполнитель'],
				coexecDate: ['coexecDate', 'Дата'],
				control: ['control', 'Контроль'],
				controlDate: ['controlDate', 'Контрольная дата исполнения'],
				resolutionAuthor: ['resolutionAuthor', 'Автор резолюции'],
				storageTerritory: ['storageTerritory', 'Территория хранилища'],
				storageName: ['storageName', 'Название хранилища']
			};
	return {
		alias: 'TransmissionModel',
		extend: 'Ext.data.Model',
		idProperty: 'id',
		fields: [
			{name: 'id', type: 'int', defaultValue: null, convert: null},
			{name: trans.bossExecutor[0], type: 'int', convert: null, defaultValue: null},
			{name: trans.bossExecutionDate[0], type: 'date', convert: function (v) {
					if (v)
						return new Date(v);
				}},
			{name: trans.executor[0], type: 'int', convert: null, defaultValue: null},
			{name: trans.executionDate[0], type: 'date', convert: function (v) {
					if (v)
						return new Date(v);
				}},
			{name: trans.control[0], type: 'boolean', defaultValue: false},
			{name: trans.controlDate[0], type: 'date', convert: function (v) {
					if (v)
						return new Date(v);
				}},
			{name: trans.resolutionAuthor[0], type: 'string'},
			{name: trans.storageTerritory[0], type: 'int', defaultValue: null, convert: null},
			{name: trans.storageName[0], type: 'string'}
		],
		requires: ['Ext.data.proxy.Rest', 'qqext.model.Assistant'],
		belongsTo: 'qqext.model.Question',
		associations: [{type: 'hasMany', model: 'qqext.model.Assistant', name: 'assistants',
				foreignKey: 'transmission'}],
		proxy: {
			type: 'rest',
			url: '/qq-web/rest/transmission',
			reader: 'json',
			writer: {
				type: 'json',
				getRecordData: function(record) {
					var data = record.data;
					data.assistants = [];
					record.assistants().each(function(item) {
						data.assistants.push({
							user: item.get('user'),
							transmission: item.get('transmission'),
							execDate: item.get('execDate')
						});
					});
					return data;
				}
			}
		}
	};
})());
