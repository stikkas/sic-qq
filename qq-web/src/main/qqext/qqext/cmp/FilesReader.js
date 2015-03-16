/** 
 * Позволяет принимать данные для модели с массивом файлов.
 * Модель для используемая для файлов - qqext.model.AttachedFile.
 * В возвращаемой модели будет поле files, по которому будет доступен список.
 * Пример использования:
 * 	.....
 * 	reader: {
 * 		type: 'files',
 * 		model: 'qqext.model.Qeustion' 
 * 	}
 * 	--------
 */

Ext.define('qqext.cmp.FilesReader', {
	extend: 'Ext.data.reader.Json',
	alias: 'reader.files',
	readRecords: function (data) {
		var model = Ext.create(this.model, data);
		model.files = data.files;
		return new Ext.data.ResultSet({
			success: true,
			total: 1,
			records: [model]
		});
	}
});

