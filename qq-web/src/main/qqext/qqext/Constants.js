/**
 * Различные велечины и виджеты, которыми приходится часто пользоваться в приложении.
 *
 * @author С. Благодатских
 */

Ext.define('qqext.Constants', {
	singleton: true,
	/**
	 *  Основной экран инициализируется в {@link qqext.view.Viewport#initComponent}
	 */
	viewport: null,
	/**
	 * Панель, расположенная по центру экрана (layout 'card'). Иницализируется в
	 * {@link qqext.view.Viewport#initComponent}.
	 * Порядок элементов:
	 * 0 - view.journal.VJournalForm
	 * 1 - view.search.VSearchForm
	 * 2 - Отчетные документы
	 * 3 - qqext.view.reg.VRegForm
	 * 4 - qqext.view.notify.VNotify
	 * 5 - qqext.view.transmission.VTransmission
	 * 6 - qqext.view.exec.VExecForm
	 */
	mainPanel: null,
	/**
	 * Форма поиска. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	searchForm: null,
	/**
	 * Форма регистрации запроса. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	regForm: null,
	/**
	 * Форма уведомления заявителя. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	notifyForm: null,
	/**
	 * Форма передачи на исполнение. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	transForm: null,
	/**
	 * Форма исполнение запроса. Инициализируется в {@link qqext.view.Viewport#initComponent}.
	 */
	execForm: null,
	/**
	 * Основной контроллер приложения. Инициализируется в {@link qqext.controller.Main#init}.
	 */
	mainController: null,
	/**
	 * Различные кнопки, на которые нужно иметь ссылки по ходу дела. Обращаться к ним
	 * только через интерфейс getButton и addButton.
	 */
	_buttons: [],
	/**
	 * Возвращает кнопку из зарегестрированных, по заданному имени.
	 * @param {String} name имя кнопки
	 * @returns {Obejct/undefined} если такая кнопка есть, то кнопку, иначе undefined
	 */
	getButton: function(name) {
		var btns = this._buttons,
				max = btns.length;
		for (var i = 0; i < max; ++i) {
			var btn = btns[i];
			if (name === btn.name)
				return btn.body;
		}
	},
	/**
	 * Добавляет кнопку в набор, если такой еще нет
	 * @param {String} name имя кнопки
	 * @param {Ext.button.Button} body сама кнопка
	 */
	addButton: function(name, body) {
		if (!this.getButton(name)) {
			this._buttons.push({name: name, body: body});
		}
	}
});

