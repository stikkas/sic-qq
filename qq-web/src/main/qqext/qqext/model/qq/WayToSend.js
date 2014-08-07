Ext.define('qqext.model.qq.WayToSend', {
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
        type : 'id'
    }, {
        name : 'renewalNotice',
        type : 'date'
    }, {
        name : 'ref_num',
        type : 'string'
    }, {
        name : 'note',
        type : 'string'
    } ]
});