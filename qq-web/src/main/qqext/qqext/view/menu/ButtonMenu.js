/**
 * Прародитель для всех меню, которые представляют из себя набор кнопок.
 *
 * @abstract
 * @author С. Благодатских
 */
Ext.define('qqext.view.menu.ButtonMenu', {
	extend: 'Ext.container.Container',
	/**
	 * Набор кнопок меню
	 */
	_buttons: [],
	initComponent: function() {
		var me = this;

		Ext.applyIf(me, {
			items: me._buttons.map(function(btn) {
				return Ext.create('Ext.button.Button', {
					text: btn.text,
					listeners: {
						click: btn.action
					}
				});
			})
		});

		me.callParent(arguments);
	}
});
