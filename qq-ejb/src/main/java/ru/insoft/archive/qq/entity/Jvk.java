package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Общий класс для ЖВК СИЦ и Архивов
 *
 * @author Благодатских С.
 */
@MappedSuperclass
public abstract class Jvk implements Serializable {

	@Id
	@Column(name = "ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "LITERA_ID", insertable = false, updatable = false)
	private Long literaId;

	@JoinColumn(name = "LITERA_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue litera;

	@Column(name = "PREFIX_VHOD_DOC", insertable = false, updatable = false)
	private Long numPrefix;

	@Column(name = "SUFIX_VHOD_DOC", insertable = false, updatable = false)
	private Integer numSufix;

	@Column(name = "REG_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;

	@Column(name = "PLAN_EXEC_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date planDate;

	@Column(name = "CONTROL_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date controlDate;

	@Column(name = "FAMALY", insertable = false, updatable = false)
	private String famaly;

	@Column(name = "NAME", insertable = false, updatable = false)
	private String name;

	@Column(name = "OTCHESTVO", insertable = false, updatable = false)
	private String otchestvo;

	@Column(name = "ORGANIZATION", insertable = false, updatable = false)
	private String organization;

	@Column(name = "STATUS_ID", insertable = false, updatable = false)
	private Long statusId;

	@JoinColumn(name = "STATUS_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue status;

	@Column(name = "EXECUTOR_ID", insertable = false, updatable = false)
	private Long executorId;

	@JoinColumn(name = "EXECUTOR_ID", referencedColumnName = "USER_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private AdmUser executor;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLiteraId() {
		return literaId;
	}

	public void setLiteraId(Long literaId) {
		this.literaId = literaId;
	}

	public DescriptorValue getLitera() {
		return litera;
	}

	public void setLitera(DescriptorValue litera) {
		this.litera = litera;
	}

	public Long getNumPrefix() {
		return numPrefix;
	}

	public void setNumPrefix(Long numPrefix) {
		this.numPrefix = numPrefix;
	}

	public Integer getNumSufix() {
		return numSufix;
	}

	public void setNumSufix(Integer numSufix) {
		this.numSufix = numSufix;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Date getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}

	public Date getControlDate() {
		return controlDate;
	}

	public void setControlDate(Date controlDate) {
		this.controlDate = controlDate;
	}

	public String getFamaly() {
		return famaly;
	}

	public void setFamaly(String famaly) {
		this.famaly = famaly;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOtchestvo() {
		return otchestvo;
	}

	public void setOtchestvo(String otchestvo) {
		this.otchestvo = otchestvo;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	public DescriptorValue getStatus() {
		return status;
	}

	public void setStatus(DescriptorValue status) {
		this.status = status;
	}

	public Long getExecutorId() {
		return executorId;
	}

	public void setExecutorId(Long executorId) {
		this.executorId = executorId;
	}

	public AdmUser getExecutor() {
		return executor;
	}

	public void setExecutor(AdmUser executor) {
		this.executor = executor;
	}

}
