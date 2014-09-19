/**
 * Этот класс прибавляет к классам свойство включать или выключать несколько
 * кнопок за раз.
 * Класс, который хочет использовать это свойство должен определить массив кнопок
 * _btns.
 * Предполагается использование этого свойства только приватно.
 * Используется в формах создания и редактирования запроса.
 *
 * @author Благодатских С.
 */
Ext.define('qqext.cmp.DisableButtons', {
	/**
	 * Устанавливает режим доступности для нескольки элементов
	 * @param {Boolean} mode режим в который установить все другие параметры метода
	 * Остальные параметры передаются индексами, которые соотвествуют this._btns
	 * @private
	 */
	_disableButtons: function(mode) {
		var i = 1, max = arguments.length, btns = this._btns;
		for (; i < max; ++i)
			btns.getAt(arguments[i]).setDisabled(mode);
	}
});


