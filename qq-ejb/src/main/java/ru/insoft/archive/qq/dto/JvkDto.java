package ru.insoft.archive.qq.dto;

import java.util.Date;

/**
 * Общий класс для передачи результатов поиска ЖВК
 *
 * @author Благодатских С.
 */
public abstract class JvkDto {

	private Long id;
	private String litera;
	private String number;
	private Date regDate;
	private Date controlDate;
	private Date planDate;
	private String otKogo;
	private String status;
	private String executor;

	public JvkDto(Long id, String litera, String number, 
			Date regDate, Date controlDate, Date planDate, 
			String otKogo, String status, String executor) {
		this.id = id;
		this.litera = litera;
		this.number = number;
		this.regDate = regDate;
		this.controlDate = controlDate;
		this.planDate = planDate;
		this.otKogo = otKogo;
		this.status = status;
		this.executor = executor;
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

	public Date getControlDate() {
		return controlDate;
	}

	public void setControlDate(Date controlDate) {
		this.controlDate = controlDate;
	}

	public Date getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}

	public String getOtKogo() {
		return otKogo;
	}

	public void setOtKogo(String otKogo) {
		this.otKogo = otKogo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getExecutor() {
		return executor;
	}

	public void setExecutor(String executor) {
		this.executor = executor;
	}

}
