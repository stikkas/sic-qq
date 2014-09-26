/**
 * Прародитель для всех меню, которые представляют из себя набор кнопок.
 *
 * @abstract
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.ButtonMenu', {
	extend: 'Ext.container.Container',
	/**
	 * @param {Array} buttons кнопки для меню
	 * @param {String} type тип кнопок
	 * @param {Object} scope контекст, в котором выполняется функция
	 */
	constructor: function(buttons, type, scope) {
		var me = this;

		Ext.applyIf(me, {
			items: buttons.map(function(btn) {
				var button = {
					text: btn.text,
					listeners: {
						click: btn.action,
						scope: scope
					}
				};
				for (var o in btn.opts)
					button[o] = btn.opts[o];

				button = Ext.create(type, button);

				// Если кнопка понадобится дальше, то заносим ее в глобальный
				// список кнопок
				if (btn.name)
					qqext.addButton(btn.name, button);

				return button;
			})
		});

		me.callParent();
	}
});

