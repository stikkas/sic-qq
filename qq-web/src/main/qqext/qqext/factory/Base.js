/**
 * Предок всех фабрик. Нужен для обеспечения всех фабрик общей функциональностью.
 * На данный момент это только метод cfg, который добавляет в результирующий объект
 * различные свойства.
 *
 * @author С. Благодатских
 */
Ext.define('qqext.factory.Base', {
	/**
	 * Добавляет метод конфигурирования и listener на afterrender для установки
	 * режима 'только просмотр', если необходимо.
	 * @param {Object} obj полуфабрикат для создания компонента
	 * @param {Boolean} viewmode флаг отображения компонента: true - режим просмотра
	 * @returns {Object} тот же полуфабрикат с дополнительными свойствами
	 */
	c: function(obj, viewmode) {
		/**
		 * Добавляет в объект новые свойства, или обновляет, если такие свойства в
		 * объекте уже есть
		 * @param {Object} conf набор нужных свойств
		 * @returns {Object} целевой объект, для цепочных операций
		 */
		obj.cfg = function(conf) {
			for (var o in conf)
				obj[o] = conf[o];
			return obj;
		};
		if (viewmode === true) {
			obj.listeners = {
				afterrender: function() {
					this.setViewOnly(viewmode);
				}
			};
		}
		return obj;
	}
});


