/** 
 * Позволяет принимать данные для модели с массивом ассоциации hasMany.
 * В возвращаемой модели будет поле, по которому будет доступен список.
 * Пример использования:
 * 	.....
 * 	reader: {
 * 		type: 'files',
 * 		model: 'qqext.model.Qeustion',
 * 		hasField: 'files' 
 * 	}
 * 	--------
 */

Ext.define('qqext.cmp.ManyOneReader', {
	extend: 'Ext.data.reader.Json',
	alias: 'reader.manyone',
	readRecords: function (data) {
		var model = Ext.create(this.model, data),
				field = this.hasField;
		model[field] = data[field];
		return new Ext.data.ResultSet({
			success: true,
			total: 1,
			records: [model]
		});
	}
});

