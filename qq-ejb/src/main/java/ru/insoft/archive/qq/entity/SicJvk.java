package ru.insoft.archive.qq.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Сущность для получения ЖВК для СИЦ
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "SIC_QUESTION")
public class SicJvk extends Jvk {

	@Column(name = "NOTI_STATUS_ID", insertable = false, updatable = false)
	private Long notificationStatusId;

	@JoinColumn(name = "NOTI_STATUS_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue notificationStatus;

	@JoinColumn(name = "EXEC_ORG_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue execOrganization;

	public Long getNotificationStatusId() {
		return notificationStatusId;
	}

	public void setNotificationStatusId(Long notificationStatusId) {
		this.notificationStatusId = notificationStatusId;
	}

	public DescriptorValue getNotificationStatus() {
		return notificationStatus;
	}

	public void setNotificationStatus(DescriptorValue notificationStatus) {
		this.notificationStatus = notificationStatus;
	}

	public DescriptorValue getExecOrganization() {
		return execOrganization;
	}

	public void setExecOrganization(DescriptorValue execOrganization) {
		this.execOrganization = execOrganization;
	}
}
