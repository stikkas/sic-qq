/**
 * Помошник исполнителя запроса
 */
Ext.define('qqext.model.Assistant', {
        extend: 'Ext.data.Model',
        idProperty: 'user',
        fields: [
            {name: 'user', type: 'int', defaultValue: null, convert: null},
            {name: 'execDate', type: 'date', defaultValue: null, convert: function (v) {
                    if (v)
                        return new Date(v);
                }},
            {name: 'transmission', type: 'int', defaultValue: null, convert: null}
        ],
        belongsTo: 'qqext.model.Transmission',
        proxy: {type: 'memory'}
});
