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

/**
 * Выдача документов.
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_DELIVERY_ACTION")
@NamedQueries({
	@NamedQuery(name = "DeliveryAction.findAll", query = "SELECT d FROM DeliveryAction d"),
	@NamedQuery(name = "DeliveryAction.findById", query = "SELECT d FROM DeliveryAction d WHERE d.id = :id"),
	@NamedQuery(name = "DeliveryAction.findByDocCount", query = "SELECT d FROM DeliveryAction d WHERE d.docCount = :docCount")})
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

	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long question;

	public Long getQuestion() {
		return question;
	}

	public void setQuestion(Long question) {
		this.question = question;
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
