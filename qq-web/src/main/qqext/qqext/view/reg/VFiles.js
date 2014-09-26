/**
 * Панелька "Документы заявителя" формы "Регистрация запроса"
 */

Ext.define('qqext.view.reg.VFiles', {
	alias: 'VFiles',
	extend: 'qqext.view.StyledPanel',
	requires: [
		'hawk_common.cmp.FilesList'
	],
	title: 'Документы заявителя',
	collapsible: true,
	collapsed: true,
	titleCollapse: true,
	animCollapse: true,
	hideCollapseTool: true,
	disabledCls: '',
	cls: 'collapse_section',
	header: {
		icon: 'images/transp.png'
	},
	/**
	 * @property {hawk_common.cmp.FilesList} _fl компонент со списком файлов
	 * @private
	 */
	/**
	 * @property {hawk_common.cmp.FilesList} _st хранилище со списком файлов
	 * @private
	 */
	initComponent: function() {
		Ext.apply(this, {
			items: [this._fl = Ext.create('hawk_common.cmp.FilesList', {
					editMode: true,
					namePrefix: 'applicant_doc'
				})]
		});
		this.callParent();
	},
	setViewOnly: function(status) {
		this._fl.attachButton.setDisabled(status);
	},
	/**
	 * Загружаем информацию о файлах
	 * @param {Ext.data.Storage} storage хранилище с информацие о файлах
	 */
	loadRecord: function(storage) {
		this._st = storage;
		storage.each(function(file) {
			var name = file.get('name');
			this._fl.addExistingFile({name: name,
				link: 10});
		});
	},
	/**
	 * Нужна для поддержания общего интерфейса. Ничего не делает
	 */
	updateRecord: function() {
	},
	/**
	 * Очистить информацию о существующих файлах
	 */
	reset: function() {
		this._fl.clearFiles();
	},
	/**
	 * Сохраняет файлы на сервере. Информацию в базу записывает
	 * сам сервер.
	 * @param {Function} success вызывается в случае успешного сохранения
	 * @param {Function} fail вызывается в случае ошибки сохранения
	 */
	save: function(success, fail) {
		this._st.load({callback: function(records, operation, stat) {
				if (stat) {
					success();
				} else {
					qqext.showError("Ошибка загрузки данных", operation.getError());
					fail();
				}
			}});
		console.log("Save files");
	},
	/**
	 * Удаляем все файлы на сервере. this._st содержит данные о файлах,
	 * которые существуют на сервере. Информация о файлах в базе уже нет, удалилась
	 * когда удалили запрос.
	 * @returns {undefined}
	 */
	remove: function() {
		this._st.each(function(rec) {
			rec.destroy();
		});
		console.log("Remove files");
	}
});
