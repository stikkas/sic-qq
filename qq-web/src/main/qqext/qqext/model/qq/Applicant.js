Ext.define('qqext.model.qq.Applicant', {
    extend : 'Ext.data.Model',
    idProperty:'id',
    clientIdProperty:'cliId',
    fields : [ {
        name : 'id',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
    	name:'cliId',
    	type:'string'
    },{
        name : 'applicantType',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'applicantObject',
        type : 'string'
    }, {
        name : 'name',
        type : 'string'
    }, {
        name : 'surname',
        type : 'string'
    }, {
        name : 'fatherName',
        type : 'string'
    }, {
        name : 'birthYear',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'applicantCategory',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'country',
        type : 'string',
        defaultValue:null,
        convert:null
    }, {
        name : 'address',
        type : 'string',
        defaultValue:null,
        convert:null
    }, {
        name : 'phone',
        type : 'string',
        defaultValue:null,
        convert:null
    }, {
        name : 'inboxDocNum',
        type : 'string',
        defaultValue:null,
        convert:null
    }, {
        name : 'inboxDocDate',
        type : 'date'
        
    }, {
        name : 'nameOfJurPerson',
        type : 'string',
        defaultValue:null,
        convert:null
    }, {
        name : 'addendum',
        type : 'string',
        defaultValue:null,
        convert:null
    } ]
});