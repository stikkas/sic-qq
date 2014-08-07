package ru.insoft.archive.qq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * событие отправки
 * @author sorokin
 */
@Entity
@Table(name = "qq_delivery_action")
public class DeliveryAction implements HasId,JsonIn,JsonOut{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QQ_DELIVERY_ACTION_ID_GEN")
	@SequenceGenerator(allocationSize = 1, sequenceName = "SEQ_QQ_DELIVERY_ACTION", name = "QQ_DELIVERY_ACTION_ID_GEN")
	@Column(name = "delivery_action_id")
	private Long id;

	@OneToOne
	@JoinColumn(name = "q_id", nullable = false)
	private Question q;

	@OneToOne
	@JoinColumn(name = "doc_type_id")
	private DescriptorValue docType;

	@Column(name = "number_of_documents")
	private Long numOfDocs;

	@Override
	public Object getId() {
		return id;
	}
	
////////--------------GENERATED CODE BELOW--------------------///////////////

	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public DescriptorValue getDocType() {
		return docType;
	}

	public void setDocType(DescriptorValue docType) {
		this.docType = docType;
	}

	public Long getNumOfDocs() {
		return numOfDocs;
	}

	public void setNumOfDocs(Long numOfDocs) {
		this.numOfDocs = numOfDocs;
	}

	public void setId(Long id) {
		this.id = id;
	}

	
	
}
