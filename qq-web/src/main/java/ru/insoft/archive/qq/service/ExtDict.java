package ru.insoft.archive.qq.service;

/**
 * Рассширенный словарь, с дополнительным полем - сокарщенное значение
 */
public class ExtDict extends Dict {

	private String shortValue;

	public ExtDict(Long id, String name, String code, String shortValue) {
		super(id, name, code);
		this.shortValue = shortValue;
	}

	public String getShortValue() {
		return shortValue;
	}

	public void setShortValue(String shortValue) {
		this.shortValue = shortValue;
	}

}
