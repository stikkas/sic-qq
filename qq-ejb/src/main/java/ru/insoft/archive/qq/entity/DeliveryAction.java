package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

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
public class DeliveryAction implements Serializable, HasId, JsonIn, JsonOut {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "DELIVERY_ACTION_ID")
	private Long id;

	@Column(name = "DOC_COUNT")
	private Long docCount;

	@Column(name = "DOC_TYPE_ID")
	private Long docType;

	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

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
