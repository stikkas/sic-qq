/**
 * Панель для формы с возможностью переключать все свои компоненты в режим просмотра.
 */
Ext.define('qqext.cmp.Panel', {
	extend: 'Ext.form.Panel',
	mixins: ['qqext.cmp.PanelEditViewMode'],
	xtype: 'formcmp',
	getErrors: function() {
		var items = this.items,
				length = items.length,
				i = 0, error = '', tmp;
		for (; i < length; ++i) {
			try { // На случай если присутсвуют элементы не имеющие getErrors
				tmp = items.getAt(i).getErrors();
				if (tmp) // Чтобы не попадали udefined
					error += tmp;
			} catch (e) {
			}
		}
		return error;
	}
});

