Ext.define('qq.model.ControlledObject', {
	alias: 'ControlledObjectModel',
	extend: 'Ext.data.Model',
	fields: [{
			name: 'insertUser',
			type: 'null'
		}, {
			name: 'updateUser',
			type: 'null'
		}, {
			name: 'upDate',
			type: 'date'
		}, {
			name: 'insDate',
			type: 'date'
		}]
});