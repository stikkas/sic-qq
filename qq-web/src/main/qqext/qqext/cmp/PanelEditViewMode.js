/*
 * Возможность переключения режима просмотра/редактирования для компонентов,
 * которые содержат более простые компоненты (вроде checkbox, textfield и т.д.).
 * Необходимо чтобы все элементы, которые находятся на данном компоненте, реализовывали
 * интерфейс {@link #qqext.cmp.EditViewMode}.
 */

Ext.define('qqext.cmp.PanelEditViewMode', {
	/**
	 * Включает или выключает режим просмотра
	 * @param {Boolean} mode true - режим просмотра , false - обычный режим (редактирование)
	 */
	setViewOnly: function(mode) {
		var items = this.items,
				max = items.length,
				i = 0;
		for (; i < max; i++) {
			try {
				items.getAt(i).setViewOnly(mode);
			} catch (e) {
				// Контейнер может содержать и другие элементы не нуждающиеся в режиме редактирования,
				// Вроде Label, можно конечно и их переопределить с пустыми методами.
			}
		}
	}
});
