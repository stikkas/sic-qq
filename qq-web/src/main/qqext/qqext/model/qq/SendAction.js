Ext.define('qqext.model.qq.SendAction', {
    extend : 'Ext.data.Model',
    idProperty:'id',
    clientIdProperty:'cliId',
    fields : [{
    	name:'cliId',
    	type:'string'
    }, {
        name : 'id',
        type : 'int'
    }, {
        name : 'q',
        type : 'int'
    }, {
        name : 'sendAction',
        type : 'int'
    }, {
        name : 'sendDate',
        type : 'date'
    } ]
});