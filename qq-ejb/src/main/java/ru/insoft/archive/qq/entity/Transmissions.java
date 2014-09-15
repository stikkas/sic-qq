package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_TRANSMISSIONS")
@NamedQueries({
	@NamedQuery(name = "Transmissions.findAll", query = "SELECT t FROM Transmissions t"),
	@NamedQuery(name = "Transmissions.findById", query = "SELECT t FROM Transmissions t WHERE t.id = :id"),
	@NamedQuery(name = "Transmissions.findByControl", query = "SELECT t FROM Transmissions t WHERE t.control = :control"),
	@NamedQuery(name = "Transmissions.findByControlDate", query = "SELECT t FROM Transmissions t WHERE t.controlDate = :controlDate"),
	@NamedQuery(name = "Transmissions.findByExecutionDate", query = "SELECT t FROM Transmissions t WHERE t.executionDate = :executionDate"),
	@NamedQuery(name = "Transmissions.findByResolutionAuthor", query = "SELECT t FROM Transmissions t WHERE t.resolutionAuthor = :resolutionAuthor"),
	@NamedQuery(name = "Transmissions.findByBossExecutionDate", query = "SELECT t FROM Transmissions t WHERE t.bossExecutionDate = :bossExecutionDate"),
	@NamedQuery(name = "Transmissions.findByStorageName", query = "SELECT t FROM Transmissions t WHERE t.storageName = :storageName")})
public class Transmissions implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long id;

	@Column(name = "BOSS_EXECUTOR_ID")
	private Long bossExecutor;

	@Column(name = "EXECUTOR_ID")
	private Long executor;

	@Column(name = "CONTROL")
	private Boolean control;

	@Column(name = "CONTROL_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date controlDate;

	@Column(name = "EXECUTION_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date executionDate;

	@Size(max = 255)
	@Column(name = "RESOLUTION_AUTHOR")
	private String resolutionAuthor;

	@Column(name = "BOSS_EXECUTION_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date bossExecutionDate;

	@Column(name = "STORAGE_TERRITORY_ID")
	private Long storageTerritory;

	@Size(max = 255)
	@Column(name = "STORAGE_NAME")
	private String storageName;

	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID", insertable = false, updatable = false)
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public Transmissions() {
	}

	public Transmissions(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getBossExecutor() {
		return bossExecutor;
	}

	public void setBossExecutor(Long bossExecutor) {
		this.bossExecutor = bossExecutor;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

	public Long getStorageTerritory() {
		return storageTerritory;
	}

	public void setStorageTerritory(Long storageTerritory) {
		this.storageTerritory = storageTerritory;
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

	public Date getExecutionDate() {
		return executionDate;
	}

	public void setExecutionDate(Date executionDate) {
		this.executionDate = executionDate;
	}

	public String getResolutionAuthor() {
		return resolutionAuthor;
	}

	public void setResolutionAuthor(String resolutionAuthor) {
		this.resolutionAuthor = resolutionAuthor;
	}

	public Date getBossExecutionDate() {
		return bossExecutionDate;
	}

	public void setBossExecutionDate(Date bossExecutionDate) {
		this.bossExecutionDate = bossExecutionDate;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof Transmissions)) {
			return false;
		}
		Transmissions other = (Transmissions) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Transmissions[ questionId=" + id + " ]";
	}

}
