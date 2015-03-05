package ru.insoft.archive.qq.dto;

/**
 * Служит для передачи справочника с тремя полями
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class DictSVDto extends DictDto {

	/**
	 * Сокращенное значение
	 */
	private String shortValue;

	public DictSVDto(Long id, String text, String shortValue) {
		super(id, text);
		this.shortValue = shortValue;
	}

	public String getShortValue() {
		return shortValue;
	}

	public void setShortValue(String shortValue) {
		this.shortValue = shortValue;
	}

}
