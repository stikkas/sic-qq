/**
 * Контейнер с картинкой слева и надписью справа
 */
Ext.define('qqext.factory.ImageLabel', {
	extend: 'Ext.container.Container',
	alias: 'ImageLabel',
	layout: 'hbox',
	constructor: function (image, label) {
		this.items = [{
				xtype: 'image',
				src: image
			}, {
				xtype: 'label',
				text: label
			}];
		this.callParent();
	}
});
