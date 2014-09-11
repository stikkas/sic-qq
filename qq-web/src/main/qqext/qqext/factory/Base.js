/**
 * Добавляет интерфейс
 * _config(viewmode, opts) - должен вызываться в конструкторе, объекта, который
 * добавляет к себе эту функциональность.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.Base', {
	/**
	 * Устанавливает объект изначально только для просмотра, если требуется, и
	 * обрабатывает случаи когда передали или не передали в контруктор два последних
	 * аргумента.
	 *
	 * @private
	 * @param {Boolean} viewmode режим просмотра для первоначального отображения элемента
	 * @param {Object} opts дополнительные настройки элемента
	 */
	_config: function(viewmode, opts) {
		var me = this,
				superMethod = me.superclass[me.callParent.caller.$name];
		if (viewmode === true) {
			// Если afterrender ужа назначен, то он должен отвечать за режим просмотра
			// здесь тогда ничего не делается
			me.listeners = me.listeners || {};
			Ext.applyIf(me.listeners, {
				afterrender: function() {
					me.setViewOnly(viewmode);
				}
			});
		}
		// Если не передали viewmode, но передали opts
		(viewmode instanceof Object) ?
				superMethod.apply(me, [viewmode]) :
				(viewmode !== undefined && opts !== undefined) ?
				superMethod.apply(me, [opts]) :
				superMethod.apply(me, []);
	}
});


