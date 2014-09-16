/**
 * Модель запроса
 */
Ext.define('qqext.model.qq.Question', {
	alias: 'QuestionModel',
	extend: 'Ext.data.Model',
	requires: [
		'qqext.model.qq.Transmission',
		'qqext.model.qq.Applicant',
		'Ext.data.AbstractStore',
		'qqext.model.qq.AttachedFile',
		'qqext.model.qq.Notification',
		'qqext.model.qq.ExecutionInfo',
		'qqext.model.qq.DeliveryAction',
		'qqext.model.qq.UsedMaterial',
		'qqext.model.qq.Coordination',
		'qqext.model.qq.SendAction',
		'qqext.model.qq.WayToSend',
		'Ext.data.proxy.Rest'
	],
	fields: [
		{name: 'id', type: 'int', defaultValue: null, convert: null},
		{name: 'insertDate', type: 'date'},
		{name: 'updateDate', type: 'date'},
		{name: 'status', type: 'int', defaultValue: null, convert: null},
		{name: 'createOrg', type: 'int', defaultValue: null, convert: null},
		{name: 'litera', type: 'int', defaultValue: null, convert: null},
		{name: 'inboxNum', type: 'string'},
		{name: 'regDate', type: 'date'},
		{name: 'transferType', type: 'int', defaultValue: null, convert: null},
		{name: 'execOrg', type: 'int', defaultValue: null, convert: null},
		{name: 'insertUser', type: 'int', defaultValue: null, convert: null},
		{name: 'updateUser', type: 'int', defaultValue: null, convert: null},
		{name: 'questionType', type: 'int', defaultValue: null, convert: null},
		{name: 'registrator', type: 'int', defaultValue: null, convert: null},
		{name: 'plannedFinishDate', type: 'date'},
		{name: 'content', type: 'string', defaultValue: null},
		{name: 'answerFormType', type: 'int', defaultValue: null, convert: null},
		{name: 'motivatedRefusal', type: 'boolean', defaultValue: false, convert: null},
		{name: 'objectLName', type: 'string', defaultValue: null, convert: null},
		{name: 'objectFName', type: 'string', defaultValue: null, convert: null},
		{name: 'objectMName', type: 'string', defaultValue: null, convert: null},
		{name: 'objectBirthYear', type: 'int', defaultValue: null, convert: null}
	],
	associations: [
		{type: 'hasOne', model: 'qqext.model.qq.Transmission', foreignKey: 'id',
			setterName: 'setTransmission', getterName: 'getTransmission'},
		{type: 'hasOne', model: 'qqext.model.qq.Applicant', foreignKey: 'id',
			setterName: 'setApplicant', getterName: 'getApplicant'},
		{type: 'hasMany', model: 'qqext.model.qq.AttachedFile',
			name: 'files', foreignKey: 'question'},
		{type: 'hasOne', model: 'qqext.model.qq.Notification', foreignKey: 'id',
			setterName: 'setNotification', getterName: 'getNotification'},
		{type: 'hasOne', model: 'qqext.model.qq.ExecutionInfo', foreignKey: 'id',
			setterName: 'setExecutionInfo', getterName: 'getExecutionInfo'},
		{type: 'hasMany', model: 'qqext.model.qq.DeliveryAction',
			name: 'delActions', foreignKey: 'question'},
		{type: 'hasMany', model: 'qqext.model.qq.UsedMaterial',
			name: 'usedMaterials', foreignKey: 'question'},
		{type: 'hasMany', model: 'qqext.model.qq.Coordination',
			name: 'coordinations', foreignKey: 'question'},
		{type: 'hasMany', model: 'qqext.model.qq.SendAction',
			name: 'sendActions', foreignKey: 'question'},
		{type: 'hasOne', model: 'qqext.model.qq.WayToSend', foreignKey: 'id',
			setterName: 'setWayToSend', getterName: 'getWayToSend'}
	],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/question',
		reader: 'json',
		writer: 'json'
	}
});