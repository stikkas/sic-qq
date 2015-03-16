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
	 * @property {String} _url путь для получения файлов по ссылке. Полная ссылка получается как:
	 * _url/question_id/file_name
	 * @private
	 */
	/**
	 * @property {Boolean} _mode режим просмотра (true) или редактирования (false)
	 * @private
	 */
	/**
	 * Иницализация компонента
	 * @param {String} title заголовок для панели
	 * @param {String} type тип файлов (заявителя, уведомления, ответа)
	 * @param {String} url путь, относительно которого строится ссылки на файлы
	 * @param {Object} cfg другие настройки для Ext.form.Panel
	 */
	constructor: function (title, type, url, cfg) {
		var me = this;
		Ext.apply(me, {
			items: [me._fl = Ext.create('hawk_common.cmp.FilesList', {
					editMode: true, // Не пользуемся свойством просмотра для этого компонента
					namePrefix: 'attachedFile'
				})],
			deletedFiles: [],
			title: title,
			_url: url + "/" + type + "/"
		});
		Ext.apply(me, cfg);
		me.callParent();
		if (cfg.allowBlank === false)
			me.setTitle("<span>*</span>" + title);
		me._title = title;
	},
	/**
	 * Устанавливает нужный режим
	 * @param {Boolean} status
	 *
	 * 	- 'true' - редактирование
	 * 	- 'false' - просмотр
	 */
	setViewOnly: function (status) {
		var me = this;
		if (me._mode !== status) {
			me._fl.attachButton.setDisabled(status);
			Ext.ComponentQuery.query('button', me).forEach(function (b) {
				b.setDisabled(status);
			});
			Ext.ComponentQuery.query('filefield', me)[0].setDisabled(status);
			me._mode = status;
		}
	},
	/**
	 * Загружает информацию о файлах
	 * @param {Object[]} store хранилище с информацией о файлах {id, qid, name}
	 * @param {Boolean} setOnly только установить, не загружать данные с сервера
	 */
	loadRecord: function (store, setOnly) {
		var me = this;
		me._st = store ? store : [];
		if (!setOnly && qqext.creq.q)
			setTimeout(function () {
				me.showFiles();
			}, 1000);
	},
	/**
	 * Отображает файлы, информация о которых находится во внутреннем хранилище
	 * Каждый объект внутреннего хранилища компонента представляет собой:
	 * {id: идентификатор файла
	 * 	name: имя файла,
	 *  qid: идентификатор запроса, которому принадлежит файл}
	 */
	showFiles: function () {
		var me = this,
				store = me._st;
		me._fl.clearFiles();
		me.deletedFiles = [];
		if (store.length) {
			var path = me._url + store[0].qid + "/";
			store.forEach(function (file) {
				var name = file.name;
				me._fl.addExistingFile({name: name, id: file.id, link: path + name});
			});
		}
		if (me._mode) {// Режим только просмотра
			Ext.ComponentQuery.query('button', me).forEach(function (b) {
				b.setDisabled(true);
			});
			Ext.ComponentQuery.query('filefield', me)[0].setDisabled(true);
		}
	},
	/**
	 * Нужна для поддержания общего интерфейса. Ничего не делает
	 */
	updateRecord: function () {
	},
	/**
	 * Очистить информацию о существующих файлах
	 */
	reset: function () {
		this._fl.clearFiles();
	},

	isValid: function () {
		if (this.allowBlank === false && this._fl.items.getCount() < 2) {
			this._errors = "<p>" + this._title + ": Необходимо прикрепить файлы<br/></p>";
			return false;
		} else {
			this._errors = undefined;
			return true;
		}
	},
	getErrors: function () {
		return this._errors;
	}
});

