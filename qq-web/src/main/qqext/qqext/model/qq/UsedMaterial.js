Ext.define('qqext.model.qq.UsedMaterial', {
    extend : 'Ext.data.Model',
    idProperty:'id',
    clientIdProperty:'cliId',
    fields : [{
    	name:'cliId',
    	type:'string'
    }, {
        name : 'id',
        type : 'int',
        convert:null,
        defaultValue:null
    }, {
        name : 'fundNum',
        type : 'string'
    }, {
        name : 'seriesNum',
        type : 'string'
    }, {
        name : 'storageUnitNum',
        type : 'string'
    }, {
        name : 'listNum',
        type : 'string'
    }, {
        name : 'q',
        type : 'int',
        convert:null,
        defaultValue:null
    } ]
});