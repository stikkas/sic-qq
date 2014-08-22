/**
 * Фабрика для создания FioFieldContainer
 *
 * @author С. Благодатских
 */

Ext.define('qqext.factory.FioField', {
	/**
	 * Возвращает объект типа fiofieldcontainer
	 * @param {String} surname фамилия
	 * @param {String} name имя
	 * @param {String} fatherName отчество
	 * @returns {Object} объект, на основе которого ExtJS сделает FioFieldContainer
	 */
	constructor: function(surname, name, fatherName) {
		return {
			xtype: 'fiofieldcontainer',
			nSurname: surname,
			nName: name,
			nFatherName: fatherName
		};
	}
});
