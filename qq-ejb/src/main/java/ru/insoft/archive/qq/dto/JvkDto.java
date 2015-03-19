package ru.insoft.archive.qq.dto;

import java.util.Date;

/**
 * Общий класс для передачи результатов поиска ЖВК
 *
 * @author Благодатских С.
 */
public abstract class JvkDto extends SearchJvkDto {

	private Date controlDate;
	private Date planDate;
	private String status;
	private String executor;

	public JvkDto(Date controlDate, Date planDate, String status,
			String executor, Long id, String litera, String number,
			Date regDate, String otKogo) {
		super(id, litera, number, regDate, otKogo);
		this.controlDate = controlDate;
		this.planDate = planDate;
		this.status = status;
		this.executor = executor;
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
