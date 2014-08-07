Ext.define('qqext.model.qq.ExecutionInfo', {
    extend : 'Ext.data.Model',
    idProperty:'id',
    clientIdProperty:'cliId',
    fields : [ {
    	name:'cliId',
    	type:'string'
    },{
        name : 'id',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'execDate',
        type : 'date'
    }, {
        name : 'answerResult',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'usageAnswer',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'categoryComplexity',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'q',
        type : 'int',
        defaultValue:null,
        convert:null
    } ]
});