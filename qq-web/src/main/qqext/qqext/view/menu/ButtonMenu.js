/**
 * Прародитель для всех меню, которые представляют из себя набор кнопок.
 *
 * @abstract
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.ButtonMenu', {
	extend: 'Ext.container.Container',
	/**
	 * @property {Array} _buttons
	 * Набор кнопок меню. Задается в потомке.
	 * @private
	 */
	/**
	 * @property {String} _type
	 * Класс создаваемых кнопок. Задается в потомке.
	 * @private
	 */
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: me._buttons.map(function(btn) {
				var button = Ext.create(me._type, {
					text: btn.text,
					listeners: {
						click: btn.action,
						scope: btn.action.sc
					}
				});

				// Если кнопка понадобится дальше, то заносим ее в глобальный
				// список кнопок
				if (btn.name)
					qqext.addButton(btn.name, button);

				if (btn.cfg)
					Ext.applyIf(button, btn.cfg);
				return button;
			})
		});

		me.callParent(arguments);
	},
	/**
	 * @param {Array} buttons кнопки для меню
	 * @param {String} type тип кнопок
	 */
	constructor: function(buttons, type) {
		this._buttons = buttons;
		this._type = type;
		this.callParent();
	}
});
