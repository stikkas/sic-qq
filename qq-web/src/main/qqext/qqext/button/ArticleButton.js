/**
 * Кнопка для различных разделов ('ЖВК', 'Поиск', 'Регистрация запроса' и т.д.).
 * Используется для определения внешнего вида объектов данного типа
 *
 * @author С. Благодатских
 */
Ext.define('qqext.button.ArticleButton', {
	alias: 'ArticleButton',
	extend: 'Ext.button.Button',
	xtype: 'articlebutton',
	cls: 'article-btn',
	// Конструктор выполняет добавление всех кнопок в один массив
	constructor: function () {
		qqext.articles.push(this);
		this.callParent(arguments);
	}
});


