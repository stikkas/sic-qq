package ru.insoft.archive.qq.entity;

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
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Класс сущности "Способ отправки"
 *
 * @author С. Благодатских
 */
@NamedQueries({
	@NamedQuery(name = "SendAction.actionByQid",
			query = "SELECT a FROM SendAction a WHERE a.qid = :id"),
	@NamedQuery(name = "SendAction.delActionByQid",
			query = "DELETE FROM SendAction a WHERE a.qid = :id"),
	@NamedQuery(name = "SendAction.delActionByIds",
			query = "DELETE FROM SendAction a WHERE a.id in :ids")})
@Entity
@Table(name = "QQ_SEND_ACTION")
public class SendAction implements TableEntity{

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

	@JsonIgnore
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long qid;

	public SendAction() {
	}

	public SendAction(Long id) {
		this.id = id;
	}

	@Override
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

	public Long getQid() {
		return qid;
	}

	@Override
	public void setQid(Long qid) {
		this.qid = qid;
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
