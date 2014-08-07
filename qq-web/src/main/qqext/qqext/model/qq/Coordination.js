/**
 * Согласование документа (рис 5). вкладка
 * "Исполнение запроса"
 */

Ext.define('qqext.model.qq.Coordination', {
    extend : 'Ext.data.Model',
    idProperty:'id',
    clientIdProperty:'cliId',
    fields : [ {
    	name:'cliId',
    	type:'string'
    },{
        name : 'id',
        type : 'int'
    }, {
        name : 'q',
        type : 'int'
    }, {
        name : 'stage',
        type : 'int',
        defaultValue:null,
        convert:null
    }, {
        name : 'stageDate',
        type : 'date'
    } ]
});