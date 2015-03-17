package ru.insoft.archive.qq.entity;

import java.io.Serializable;
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
import javax.validation.constraints.NotNull;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Выдача документов.
 *
 * @author С. Благодатских
 */
@NamedQueries({
	@NamedQuery(name = "DeliveryAction.actionByQid",
			query = "SELECT a FROM DeliveryAction a WHERE a.qid = :id"),
	@NamedQuery(name = "DeliveryAction.delActionByQid",
			query = "DELETE FROM DeliveryAction a WHERE a.qid = :id")})
@Entity
@Table(name = "QQ_DELIVERY_ACTION")
public class DeliveryAction implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(generator = "deliveryGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "deliveryGen", sequenceName = "SEQ_QQ_DELIVERY_ACTION",
			allocationSize = 1)
	@Column(name = "DELIVERY_ACTION_ID")
	private Long id;

	@Column(name = "DOC_COUNT")
	private Long docCount;

	@Column(name = "DOC_TYPE_ID")
	private Long docType;

	@JsonIgnore
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long qid;

	public Long getQid() {
		return qid;
	}

	public void setQid(Long qid) {
		this.qid = qid;
	}

	public DeliveryAction() {
	}

	public DeliveryAction(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getDocType() {
		return docType;
	}

	public void setDocType(Long docType) {
		this.docType = docType;
	}

	public Long getDocCount() {
		return docCount;
	}

	public void setDocCount(Long docCount) {
		this.docCount = docCount;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof DeliveryAction)) {
			return false;
		}
		DeliveryAction other = (DeliveryAction) object;
		return !this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.DeliveryAction[ deliveryActionId=" + id + " ]";
	}

}
