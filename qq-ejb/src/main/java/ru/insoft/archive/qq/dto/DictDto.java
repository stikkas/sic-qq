package ru.insoft.archive.qq.dto;

/**
 * Служит для передачи справочника с двумя полями
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class DictDto {

	/**
	 * Идентификатор
	 */
	private Long id;
	/**
	 * Значение
	 */
	private String text;

	public DictDto(Long id, String text) {
		this.id = id;
		this.text = text;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}
