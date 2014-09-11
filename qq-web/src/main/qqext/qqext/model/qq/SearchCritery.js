/**
 *  Модель для формы поиска {@link qqext.view.search.VSearchParams}
 */
Ext.define('qqext.model.qq.SearchCritery', {
	alias: 'SearchCriteryModel',
	extend: 'Ext.data.Model',
	singleton: true,
	fields: [{
			name: 'archiveId',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'queryTypeId',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'queryContent',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'applicantTypeId',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'applicantCategoryId',
			type: 'int',
			defaultValue: null,
			convert: null
		}, {
			name: 'regDate',
			type: 'date',
			defaultValue: null,
			convert: null
		}, {
			name: 'reqObjName',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'reqObjSurname',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'reqObjFatherName',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'applName',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'applSurname',
			type: 'string',
			defaultValue: null,
			convert: null
		}, {
			name: 'applFatherName',
			type: 'string',
			defaultValue: null,
			convert: null
		}
	],
	clear: function() {
		var data = this.getData();
		for (var o in data)
			this.set(o, null);
	}
});