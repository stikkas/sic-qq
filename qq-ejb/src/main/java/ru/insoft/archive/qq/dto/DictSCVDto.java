package ru.insoft.archive.qq.dto;

/**
 * Служит для передачи справочника с четырьмя полями
 *
 * @author Благодатских С.
 */
public class DictSCVDto extends DictSVDto {

	/**
	 * Код значения
	 */
	private String code;

	public DictSCVDto(Long id, String text, String shortValue, String code) {
		super(id, text, shortValue);
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
