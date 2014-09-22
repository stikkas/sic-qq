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
import org.codehaus.jackson.annotate.JsonIgnore;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Способ отправки.
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_WAY_TO_SEND")
@NamedQueries({
	@NamedQuery(name = "WayToSend.findAll", query = "SELECT w FROM WayToSend w"),
	@NamedQuery(name = "WayToSend.findById", query = "SELECT w FROM WayToSend w WHERE w.id = :id"),
	@NamedQuery(name = "WayToSend.findByRemark", query = "SELECT w FROM WayToSend w WHERE w.remark = :remark"),
	@NamedQuery(name = "WayToSend.findByIssueNumber", query = "SELECT w FROM WayToSend w WHERE w.issueNumber = :issueNumber"),
	@NamedQuery(name = "WayToSend.findByRenewalNotice", query = "SELECT w FROM WayToSend w WHERE w.renewalNotice = :renewalNotice")})
public class WayToSend implements Serializable, HasId, JsonIn, JsonOut {

	private static final long serialVersionUID = 1L;
	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long id;

	@Size(max = 255)
	@Column(name = "REMARK")
	private String remark;

	@Size(max = 255)
	@Column(name = "ISSUE_NUMBER")
	private String issueNumber;

	@Column(name = "RENEWAL_NOTICE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date renewalNotice;

	@JsonIgnore
	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID", insertable = false, updatable = false)
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public WayToSend() {
	}

	public WayToSend(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getIssueNumber() {
		return issueNumber;
	}

	public void setIssueNumber(String issueNumber) {
		this.issueNumber = issueNumber;
	}

	public Date getRenewalNotice() {
		return renewalNotice;
	}

	public void setRenewalNotice(Date renewalNotice) {
		this.renewalNotice = renewalNotice;
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
		if (!(object instanceof WayToSend)) {
			return false;
		}
		WayToSend other = (WayToSend) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.WayToSend[ questionId=" + id + " ]";
	}

}
