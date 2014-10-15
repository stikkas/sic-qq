Ext.define('qqext.cmp.ErrorGetter', {
	getErrors: function () {
		console.log(this.$className);
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

