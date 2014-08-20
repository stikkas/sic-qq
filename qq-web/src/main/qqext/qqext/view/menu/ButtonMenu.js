/**
 * Прародитель для всех меню, которые представляют из себя набор кнопок.
 *
 * @abstract
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.ButtonMenu', {
	extend: 'Ext.container.Container',
	requires: [
		'qqext.Constants'
	],
	/**
	 * @private
	 * Набор кнопок меню
	 */
	_buttons: null,
	/**
	 * @private
	 * Класс создаваемых кнопок
	 */
	_type: null,
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: me._buttons.map(function(btn) {
				var button = Ext.create(me._type, {
					text: btn.text,
					listeners: {
						click: btn.action
					}
				});

				if (btn.name)
					qqext.Constants.addButton(btn.name, button)

				if (btn.cfg)
					Ext.applyIf(button, btn.cfg);
				return button;
			})
		});

		me.callParent(arguments);
	}
});
