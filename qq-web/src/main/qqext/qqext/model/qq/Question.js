/**
 * Модель запроса
 */
Ext.define('qqext.model.qq.Question', {
	alias: 'QuestionModel',
	extend: 'Ext.data.Model',
	requires: [
		'qqext.model.qq.Transmission',
		'Ext.data.AbstractStore',
		'qqext.model.qq.Applicant',
		'qqext.model.qq.AttachedFile',
		'qqext.model.qq.Notification',
		'qqext.model.qq.ExecutionInfo',
		'qqext.model.qq.DeliveryAction',
		'qqext.model.qq.UsedMaterial',
		'qqext.model.qq.Coordination',
		'qqext.model.qq.SendAction',
		'qqext.model.qq.WayToSend'
	],
	idProperty: 'id',
	clientIdProperty: 'cliId',
	fields: [
		{name: 'cliId', type: 'string'},
		{name: 'id', type: 'int',
			defaultValue: null, convert: null},
		{name: 'inboxNum', type: 'string'},
		{name: 'status', type: 'int',
			defaultValue: null, convert: null},
		{name: 'regDate', type: 'date'},
		{name: 'litera', type: 'int',
			defaultValue: null, convert: null},
		{name: 'transferType', type: 'int',
			defaultValue: null, convert: null},
		{name: 'execOrg', type: 'int',
			defaultValue: null, convert: null},
		{name: 'registrator', type: 'int',
			defaultValue: null, convert: null},
		{name: 'questionType', type: 'int',
			defaultValue: null, convert: null},
		{name: 'plannedFinishDate', type: 'date'},
		{name: 'content', type: 'string',
			defaultValue: null},
		{name: 'answerFormType', type: 'int',
			defaultValue: null, convert: null},
		{name: 'motivatedRefusal', type: 'boolean',
			defaultValue: false, convert: null},
		{name: 'requestObjectSurname', type: 'string',
			defaultValue: null, convert: null},
		{name: 'requestObjectName', type: 'string',
			defaultValue: null, convert: null},
		{name: 'requestFatherName', type: 'string'},
		{name: 'request_object_birthyear', type: 'int',
			defaultValue: null, convert: null},
		{name: 'createOrg', type: 'int',
			defaultValue: null, convert: null}
	],
	associations: [
		{
			type: 'hasOne',
			model: 'qqext.model.qq.Transmission',
			setterName: 'setTransmission',
			getterName: 'getTransmission',
			primaryKey: 'id',
			name: 'transmission',
			foreignKey: 'transmission',
			associationKey: 'transmission'
		}, {
			type: 'hasOne',
			model: 'qqext.model.qq.Applicant',
			setterName: 'setApplicant',
			getterName: 'getApplicant',
			primaryKey: 'id',
			name: 'applicant',
			foreignKey: 'applicant',
			associationKey: 'applicant'
		}, {
			type: 'hasMany',
			model: 'qqext.model.qq.AttachedFile',
			setterName: 'setFiles',
			getterName: 'getFiles',
			primaryKey: 'id',
			name: 'files',
			foreignKey: 'q',
			associationKey: 'files'
		}, {
			type: 'hasOne',
			model: 'qqext.model.qq.Notification',
			setterName: 'setNotification',
			getterName: 'getNotification',
			primaryKey: 'id',
			name: 'notify',
			foreignKey: 'notify',
			associationKey: 'notify'
		}, {
			type: 'hasOne',
			model: 'qqext.model.qq.ExecutionInfo',
			setterName: 'setExecutionInfo',
			getterName: 'getExecutionInfo',
			primaryKey: 'id',
			name: 'execInfo',
			foreignKey: 'q',
			associationKey: 'execInfo'
		}, {
			type: 'hasMany',
			model: 'qqext.model.qq.DeliveryAction',
			primaryKey: 'id',
			name: 'delActions',
			foreignKey: 'q',
			associationKey: 'delActions'
		}, {
			type: 'hasMany',
			model: 'qqext.model.qq.UsedMaterial',
			primaryKey: 'id',
			name: 'usedMaterials',
			foreignKey: 'q',
			associationKey: 'usedMaterials'
		}, {
			type: 'hasMany',
			model: 'qqext.model.qq.Coordination',
			primaryKey: 'id',
			name: 'coordinations',
			foreignKey: 'q',
			associationKey: 'coordinations'
		}, {
			type: 'hasMany',
			model: 'qqext.model.qq.SendAction',
			primaryKey: 'id',
			name: 'sendActions',
			foreignKey: 'q',
			associationKey: 'sendActions'
		}, {
			type: 'hasOne',
			model: 'qqext.model.qq.WayToSend',
			setterName: 'setWayToSend',
			getterName: 'getWayToSend',
			primaryKey: 'id',
			name: 'wayToSend',
			foreignKey: 'q',
			associationKey: 'wayToSend'
		}],
	proxy: {
		type: 'ajax',
		url: 'api/Question',
		api: {
			create: 'api/Question',
			read: 'api/Question',
			update: 'api/Question',
			destroy: 'api/Question'
		},
		reader: {
			type: 'json',
			root: 'data',
			messageProperty: 'msg',
			successProperty: 'success'
		},
		writer: {type: 'json'}
	}
});