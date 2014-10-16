/**
 * Общий интерфейс для получения ошибок от элементов, которые имеют
 * у себя в списке элементов элементы с методом getErrors
 */
Ext.define('qqext.cmp.ErrorGetter', {
	getErrors: function () {
		var items = this.items,
				length = items.length,
				i = 0, error = '', tmp, el;
		for (; i < length; ++i) {
			el = items.getAt(i);
			if (el.getErrors instanceof Function) {
//			try { // На случай если присутсвуют элементы не имеющие getErrors
//				tmp = items.getAt(i).getErrors();
				tmp = el.getErrors();
				if (tmp) // Чтобы не попадали udefined
					error += tmp;
			}
//			} catch (e) {
//			}
		}
		return error;
	}
});

