/**
 * Прародитель панелей для форм. Установлены базовые настройки стиля отображения.
 * @abstract
 */
Ext.define('qqext.view.StyledPanel', {
	extend: 'Ext.form.Panel',
	margin: "0 25 10 5",
	bodyPadding: 5,
	layout: 'vbox',
	border: true
});



