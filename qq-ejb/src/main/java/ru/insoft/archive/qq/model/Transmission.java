package ru.insoft.archive.qq.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Передача на исполнение
 * 
 * @author sorokin
 */
@Entity
@Table(name = "qq_transmissions")
public class Transmission implements HasId,JsonIn,JsonOut{
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TRANSMISSION_IDGEN")
	@SequenceGenerator(allocationSize = 1, sequenceName = "SEQ_QQ_TRANSMISSIONS", name = "TRANSMISSION_IDGEN")
	@Column(name = "transmission_id")
	private Long id;

	@OneToOne
	@JoinColumn(name = "resp_face_execution")
	private AdmUser responsibleForExecution;

	@Column(name = "resp_face_execution_date")
	private Date responsibleForExecutionDate;

	@OneToOne
	@JoinColumn(name = "execution_id")
	private AdmUser executorName;

	@Column(name = "executor_date")
	private Date executorDate;

	@Column(name = "is_control")
	private Boolean control;

	@Column(name = "control_date_of_exec")
	private Date controlDateOfExecution;

	@OneToOne
	@JoinColumn(name = "q_id", nullable = false)
	private Question q;

	// Дополнительная информация

	@Column(name = "resolution_author")
	private String resolutionAuthor;

	// @Column(name="storage_territory_id")
	@OneToOne
	@JoinColumn(name = "storage_territory_id")
	private DescriptorValue storageTerritory;

	@Column(name = "storage_name")
	private String storageName;

////////--------------GENERATED CODE BELOW--------------------///////////////
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public AdmUser getResponsibleForExecution() {
		return responsibleForExecution;
	}

	public void setResponsibleForExecution(AdmUser responsibleForExecution) {
		this.responsibleForExecution = responsibleForExecution;
	}

	public Date getResponsibleForExecutionDate() {
		return responsibleForExecutionDate;
	}

	public void setResponsibleForExecutionDate(Date responsibleForExecutionDate) {
		this.responsibleForExecutionDate = responsibleForExecutionDate;
	}

	public AdmUser getExecutorName() {
		return executorName;
	}

	public void setExecutorName(AdmUser executorName) {
		this.executorName = executorName;
	}

	public Date getExecutorDate() {
		return executorDate;
	}

	public void setExecutorDate(Date executorDate) {
		this.executorDate = executorDate;
	}

	public Boolean getControl() {
		return control;
	}

	public void setControl(Boolean control) {
		this.control = control;
	}

	public Date getControlDateOfExecution() {
		return controlDateOfExecution;
	}

	public void setControlDateOfExecution(Date controlDateOfExecution) {
		this.controlDateOfExecution = controlDateOfExecution;
	}

	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public String getResolutionAuthor() {
		return resolutionAuthor;
	}

	public void setResolutionAuthor(String resolutionAuthor) {
		this.resolutionAuthor = resolutionAuthor;
	}

	public DescriptorValue getStorageTerritory() {
		return storageTerritory;
	}

	public void setStorageTerritory(DescriptorValue storageTerritory) {
		this.storageTerritory = storageTerritory;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	
}
