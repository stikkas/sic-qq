package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_SEND_ACTION")
@NamedQueries({
	@NamedQuery(name = "SendAction.findAll", query = "SELECT s FROM SendAction s"),
	@NamedQuery(name = "SendAction.findById", query = "SELECT s FROM SendAction s WHERE s.id = :id"),
	@NamedQuery(name = "SendAction.findBySendDate", query = "SELECT s FROM SendAction s WHERE s.sendDate = :sendDate"),
	@NamedQuery(name = "SendAction.findBySendType", query = "SELECT s FROM SendAction s WHERE s.sendType = :sendType")})
public class SendAction implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "sendActionGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "sendActionGen", sequenceName = "SEQ_QQ_SEND_ACTION",
		allocationSize = 1)
	@Column(name = "SEND_ACTION_ID")
	private Long id;

	@Column(name = "SEND_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date sendDate;

	@Column(name = "SEND_TYPE_ID")
	private Long sendType;

	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long question;
	/*
	 @JsonIgnore
	 @JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	 @ManyToOne(optional = false, fetch = FetchType.LAZY)
	 private Question questionValue;
	 */

	public SendAction() {
	}

	public SendAction(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getSendDate() {
		return sendDate;
	}

	public void setSendDate(Date sendDate) {
		this.sendDate = sendDate;
	}

	public Long getSendType() {
		return sendType;
	}

	public void setSendType(Long sendType) {
		this.sendType = sendType;
	}

	public Long getQuestion() {
		return question;
	}

	public void setQuestion(Long question) {
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
		if (!(object instanceof SendAction)) {
			return false;
		}
		SendAction other = (SendAction) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.SendAction[ sendActionId=" + id + " ]";
	}

}
