/** 
 * Модель для элементарных словарей
 * с id и name
 */
Ext.define('qqext.model.Dict', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'int'},
		{name: 'text', type: 'string'}
	]
});


