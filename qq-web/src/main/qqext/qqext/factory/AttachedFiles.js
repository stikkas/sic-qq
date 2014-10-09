/**
 * Панелька "Документы заявителя" формы "Регистрация запроса"
 *
 */

Ext.define('qqext.factory.AttachedFiles', {
	alias: 'FAttachedFiles',
	xtype: 'attachedfiles',
	extend: 'Ext.form.Panel',
	requires: [
		'hawk_common.cmp.FilesList',
		'Ext.ComponentQuery'
	],
	/**
	 * @property {hawk_common.cmp.FilesList} _fl компонент со списком файлов
	 * @private
	 */
	/**
	 * @property {Ext.data.Store} _st хранилище со списком файлов
	 * @private
	 */
	/**
	 * @property {String} _type тип файлов (Документы заявителя или Файлы ответа)
	 * @private
	 */
	/**
	 * @property {String} _path путь для хранения файлов в файловой системе
	 * @private
	 */
	/**
	 * @property {String} _url путь для получения файлов по ссылке
	 * @private
	 */
	/**
	 * @property {Boolean} _mode режим просмотра (true) или редактирования (false)
	 * @private
	 */
	/**
	 * Иницализация компонента
	 * @param {String} title заголовок для панели
	 * @param {String} type тип файлов
	 * @param {String} path путь в файловой системе для сохранения
	 * @param {String} url путь, относительно которого строится ссылки на файлы
	 * @param {Object} cfg другие настройки для Ext.form.Panel
	 */
	constructor: function(title, type, path, url, cfg) {
		var me = this;
		Ext.apply(me, {
			items: [me._fl = Ext.create('hawk_common.cmp.FilesList', {
					editMode: true, // Не пользуемся свойством просмотра для этого компонента
					namePrefix: 'attachedFile'
				})],
			deletedFiles: [],
			title: title,
			_type: type,
			_path: path,
			_url: url
		});
		Ext.apply(me, cfg);
		me.callParent();
	},
	/**
	 * Устанавливает нужный режим
	 * @param {Boolean} status
	 *
	 * 	- 'true' - редактирование
	 * 	- 'false' - просмотр
	 */
	setViewOnly: function(status) {
		var me = this;
		if (me._mode !== status) {
			me._fl.attachButton.setDisabled(status);
			Ext.ComponentQuery.query('button', me).forEach(function(b) {
				b.setDisabled(status);
			});
			Ext.ComponentQuery.query('filefield', me)[0].setDisabled(status);
			me._mode = status;
		}
	},
	/**
	 * Загружает информацию о файлах
	 * @param {Ext.data.Storage} store хранилище с информацией о файлах
	 * @param {Boolean} setOnly только установить, не загружать данные с сервера
	 */
	loadRecord: function(store, setOnly) {
		var me = this;
		me._st = store;
		if (!setOnly)
			store.load({callback: function() {
					me.showFiles();
				}});
	},
	/**
	 * Отображает файлы, информация о которых находится во внутреннем хранилище
	 */
	showFiles: function() {
		var me = this,
				store = me._st;
		me._fl.clearFiles();
		if (store.count()) {
			var path = me._url + store.getAt(0).get('question')
					+ "/";
			store.each(function(file) {
				var name = file.get('name');
				me._fl.addExistingFile({name: name,
					id: file.get('id'),
					link: path + name});
			});
		}
		if (me._mode) // Режим только просмотра
			Ext.ComponentQuery.query('button', me).forEach(function(b) {
				b.setDisabled(true);
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
	 * @param {Number/String} id идентификатор запроса
	 * @param {Function} success вызывается в случае успешного сохранения
	 * @param {Function} fail вызывается в случае ошибки сохранения
	 */
	save: function(id, success, fail) {
		var me = this;
		me.getForm().submit({
			clientValidation: false,
			url: '/qq-web/api/SaveAttachedFiles',
			params: {
				type: me._type,
				question: id,
				path: me._path,
				deletedFiles: Ext.encode(me.deletedFiles)
			},
			success: function(form, action) {
				// Обновляем данные в хранилище, после успешного сохранения файлов
				me._st.load({callback: function(records, operation, stat) {
						if (stat) {
							me.reset();
							me.showFiles();
							me.setViewOnly(true);
							success();
							me.deletedFiles = [];
						} else {
							qqext.showError("Ошибка загрузки данных", operation.getError());
							fail();
						}
					}});
			},
			failure: function(form, action) {
				qqext.showError("Ошибка сохранения файлов", action.response.responseText);
				me.reset();
				me.showFiles();
				fail();
			}
		});
	},
	/**
	 * Удаляем все файлы на сервере. this._st содержит данные о файлах,
	 * которые существуют на сервере. Информация о файлах в базе уже нет, удалилась
	 * когда удалили запрос.
	 */
	remove: function() {
		var store = this._st;
		if (store.count()) {
			var dir = this._path + store.getAt(0).get('question') + "/",
					names = [];
			store.each(function(rec) {
				names.push(rec.get('name'));
			});
			Ext.Ajax.request({
				url: '/qq-web/rest/attachedfile/delete',
				jsonData: {name: names, dir: dir}
			});
		}
	}
});

