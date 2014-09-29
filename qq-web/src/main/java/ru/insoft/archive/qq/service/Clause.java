package ru.insoft.archive.qq.service;

/**
 * Класс для создания условия поиска по базе.
 *
 * @author С. Благодатских
 */
class Clause<T> {

	/**
	 * Поле по которому будет искаться требуемая сущность
	 */
	private String fieldName;
	/**
	 * Значение по которому будет определяться подходит эта сущность или нет
	 */
	private T fieldValue;

	public Clause(String fieldName, T fieldValue) {
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}

	public String getFieldName() {
		return fieldName;
	}

	public T getFieldValue() {
		return fieldValue;
	}

}
