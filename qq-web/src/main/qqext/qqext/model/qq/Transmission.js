Ext.define('qqext.model.qq.Transmission', (function() {
	var ns = Ext.ns('qqext'),
			trans = ns.transmission = {
				bossExecutor: ['bossExecutor', 'Ответственный за исполнение'],
				bossExecutionDate: ['bossExecutionDate', 'Дата'],
				executor: ['executor', 'ФИО исполнителя'],
				executionDate: ['executionDate', 'Дата'],
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
//	clientIdProperty: 'cliId',
		fields: [
//		{name: 'cliId', type: 'string'},
			{name: 'id', type: 'int', defaultValue: null, convert: null},
			{name: trans.bossExecutor[0], type: 'int', convert: null, defaultValue: null},
			{name: trans.bossExecutionDate[0], type: 'date'},
			{name: trans.executor[0], type: 'int', convert: null, defaultValue: null},
			{name: trans.executionDate[0], type: 'date'},
			{name: trans.control[0], type: 'boolean', defaultValue: false},
			{name: trans.controlDate[0], type: 'date'},
			{name: trans.resolutionAuthor[0], type: 'string'},
			{name: trans.storageTerritory[0], type: 'int', defaultValue: null, convert: null},
			{name: trans.storageName[0], type: 'string'}
		],
		belongsTo: 'qqext.model.qq.Question',
		mixins: ['qqext.qq.model.RestProxy'],
		constructor: function() {
			this.proxy.url += 'transmission';
			this.callParent(arguments);
		}
	};
})());
