package ru.insoft.archive.qq.service;

/**
 * Класс для создания условия поиска по базе.
 *
 * @author С. Благодатских
 */
class Clause {

	/**
	 * Поле по которому будет искаться требуемая сущность
	 */
	private String fieldName;
	/**
	 * Значение по которому будет определяться подходит эта сущность или нет
	 */
	private String fieldValue;

	public Clause(String fieldName, String fieldValue) {
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}

	public String getFieldName() {
		return fieldName;
	}

	public String getFieldValue() {
		return fieldValue;
	}

}
