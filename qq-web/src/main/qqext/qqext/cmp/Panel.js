/**
 * Панель для формы с возможностью переключать все свои компоненты в режим просмотра.
 */
Ext.define('qqext.cmp.Panel', {
	extend: 'Ext.form.Panel',
	mixins: ['qqext.cmp.PanelEditViewMode', 'qqext.cmp.ErrorGetter'],
	xtype: 'formcmp',
	/**
	 * Очищает все поля формы вместе с ошибками.
	 */
	reset: function () {
		var items = this.items,
				max = items.length, i = 0;
		for (; i < max; ++i) {
			try {
				items.getAt(i).reset();
			} catch (e) {

			}
		}
	}
});

