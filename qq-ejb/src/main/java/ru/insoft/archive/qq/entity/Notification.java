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
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_NOTIFICATION")
@NamedQueries({
	@NamedQuery(name = "Notification.findAll", query = "SELECT n FROM Notification n"),
	@NamedQuery(name = "Notification.findById", query = "SELECT n FROM Notification n WHERE n.id = :id"),
	@NamedQuery(name = "Notification.findByNotificationDate", query = "SELECT n FROM Notification n WHERE n.notificationDate = :notificationDate")})
public class Notification implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long id;

	@Column(name = "DELIVERY_TYPE_ID")
	private Long deliveryType;

	@Column(name = "DOC_TYPE_ID")
	private Long docType;

	@Column(name = "TO_WHOM")
	private String toWhom;

	@Basic(optional = false)
	@NotNull
	@Column(name = "EXECUTOR_ID")
	private Long executor;

	@Column(name = "NOTIFICATION_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notificationDate;

	@Column(name = "ISSUE_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date issueDate;

	@JsonIgnore
	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID", insertable = false, updatable = false)
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public Notification() {
	}

	public Notification(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(Long deliveryType) {
		this.deliveryType = deliveryType;
	}

	public Long getDocType() {
		return docType;
	}

	public void setDocType(Long docType) {
		this.docType = docType;
	}

	public String getToWhom() {
		return toWhom;
	}

	public void setToWhom(String toWhom) {
		this.toWhom = toWhom;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

	public Date getNotificationDate() {
		return notificationDate;
	}

	public void setNotificationDate(Date notificationDate) {
		this.notificationDate = notificationDate;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
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
		if (!(object instanceof Notification)) {
			return false;
		}
		Notification other = (Notification) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Notification[ questionId=" + id + " ]";
	}

}
