package ru.insoft.archive.qq.dto;

import java.util.Date;

/**
 * Общие поля для ЖВК и поиска по критериям
 *
 * @author Благодатских С.
 */
public abstract class SearchJvkDto {

	private Long id;
	private String litera;
	private String number;
	private Date regDate;
	private String otKogo;

	public SearchJvkDto(Long id, String litera, String number, Date regDate, String otKogo) {
		this.id = id;
		this.litera = litera;
		this.number = number;
		this.regDate = regDate;
		this.otKogo = otKogo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLitera() {
		return litera;
	}

	public void setLitera(String litera) {
		this.litera = litera;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getOtKogo() {
		return otKogo;
	}

	public void setOtKogo(String otKogo) {
		this.otKogo = otKogo;
	}
	
}
