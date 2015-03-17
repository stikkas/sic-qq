package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 * Класс передачи на исполнение. без запроса существовать не может, поэтому id
 * не генерится автоматически.
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "SIC_QUESTION")
public class Transmission implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@NotNull
	@Column(name = "ID", insertable = false, updatable = false)
	private Long id;
	/**
	 * Ответственный за исполнение
	 */
	@Column(name = "BOSS_EXECUTOR_ID")
	private Long bossExec;
	/**
	 * Дата ответственного за исполнение
	 */
	@Column(name = "BOSS_EXECUTOR_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date bossExecDate;
	/**
	 * Исполнитель
	 */
	@Column(name = "EXECUTOR_ID")
	private Long executor;

	/**
	 * Дата исполнителя
	 */
	@Column(name = "EXECUTOR_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	/**
	 * Контроль
	 */
	@Column(name = "CONTROL")
	private Boolean control;

	/**
	 * Дата контроля
	 */
	@Column(name = "CONTROL_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date controlDate;

	/**
	 * Автор резолюции
	 */
	@Column(name = "RESOLUTION_AUTHOR")
	private String resAuthor;

	/**
	 * Территория хранилища
	 */
	@Column(name = "STORAGE_TERRITORY_ID")
	private Long storeTeritory;

	/**
	 * Название хранилища
	 */
	@Column(name = "STORAGE_NAME")
	private String storeName;
	/**
	 * Статус запроса
	 */
	@Column(name = "STATUS_ID")
	private Long status;
	/**
	 * Соисполнители, устанавливаются при получении информации по id
	 */
	@OneToMany(mappedBy = "transmission", fetch = FetchType.LAZY)
	private List<Assistant> assistants;

	public Transmission() {
	}

	public Transmission(Long id, Long status) {
		this.id = id;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBossExec() {
		return bossExec;
	}

	public void setBossExec(Long bossExec) {
		this.bossExec = bossExec;
	}

	public Date getBossExecDate() {
		return bossExecDate;
	}

	public void setBossExecDate(Date bossExecDate) {
		this.bossExecDate = bossExecDate;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

	public Boolean getControl() {
		return control;
	}

	public void setControl(Boolean control) {
		this.control = control;
	}

	public Date getControlDate() {
		return controlDate;
	}

	public void setControlDate(Date controlDate) {
		this.controlDate = controlDate;
	}

	public String getResAuthor() {
		return resAuthor;
	}

	public void setResAuthor(String resAuthor) {
		this.resAuthor = resAuthor;
	}

	public Long getStoreTeritory() {
		return storeTeritory;
	}

	public void setStoreTeritory(Long storeTeritory) {
		this.storeTeritory = storeTeritory;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public List<Assistant> getAssistants() {
		return assistants;
	}

	public void setAssistants(List<Assistant> assistants) {
		this.assistants = assistants;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

}
