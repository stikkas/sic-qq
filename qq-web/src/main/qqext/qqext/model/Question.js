/**
 * Модель запроса
 */
Ext.define('qqext.model.Question', {
	alias: 'QuestionModel',
	extend: 'Ext.data.Model',
	requires: [
		'qqext.model.Transmission',
		'qqext.model.Applicant',
		'Ext.data.AbstractStore',
		'qqext.model.ApplicantDoc',
		'qqext.model.Notification',
		'qqext.model.ExecutionInfo',
		'Ext.data.proxy.Rest'
	],
	fields: [
		{name: 'id', type: 'int', defaultValue: null, convert: null, isNull: true},
		{name: 'insertDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		{name: 'updateDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		{name: 'status', type: 'int', defaultValue: null, convert: null},
		{name: 'createOrg', type: 'int', defaultValue: null, convert: null},
		{name: 'litera', type: 'int', defaultValue: null, convert: null},
		{name: 'prefixNum', type: 'int', defaultValue: null, convert: null},
		{name: 'sufixNum', type: 'int', defaultValue: null, convert: null},
		{name: 'regDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		{name: 'transferType', type: 'int', defaultValue: null, convert: null},
		{name: 'execOrg', type: 'int', defaultValue: null, convert: null},
		{name: 'insertUser', type: 'int', defaultValue: null, convert: null},
		{name: 'updateUser', type: 'int', defaultValue: null, convert: null},
		{name: 'questionType', type: 'int', defaultValue: null, convert: null},
		{name: 'registrator', type: 'int', defaultValue: null, convert: null},
		{name: 'plannedFinishDate', type: 'date', convert: function (v) {
				if (v)
					return new Date(v);
			}},
		{name: 'content', type: 'string', defaultValue: null},
		{name: 'answerFormType', type: 'int', defaultValue: null, convert: null},
		{name: 'motivatedRefusal', type: 'boolean', defaultValue: false, convert: null},
		{name: 'objectLName', type: 'string', defaultValue: null, convert: null},
		{name: 'objectFName', type: 'string', defaultValue: null, convert: null},
		{name: 'objectMName', type: 'string', defaultValue: null, convert: null},
		{name: 'objectBirthYear', type: 'int', defaultValue: null, convert: null}
	],
	associations: [
		{type: 'hasOne', model: 'qqext.model.Transmission', foreignKey: 'id',
			setterName: 'setTrans', getterName: 'getTrans'},
		{type: 'hasOne', model: 'qqext.model.Applicant', foreignKey: 'id',
			setterName: 'setAppl', getterName: 'getAppl'},
		{type: 'hasOne', model: 'qqext.model.Notification', foreignKey: 'id',
			setterName: 'setNoti', getterName: 'getNoti'},
		{type: 'hasOne', model: 'qqext.model.ExecutionInfo', foreignKey: 'id',
			setterName: 'setExec', getterName: 'getExec'},
		{type: 'hasMany', model: 'qqext.model.ApplicantDoc',
			name: 'files', foreignKey: 'question'}
	],
	proxy: {
		type: 'rest',
		url: '/qq-web/rest/question',
		reader: 'json',
		writer: 'json',
		listeners: {
			exception: function (proxy, answer, operation) {
				operation.error = answer.responseText;
			}
		}
	}
});
