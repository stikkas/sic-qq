package ru.insoft.archive.qq.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.json.JsonReplaceById;

/**
 * 
 * @author sorokin
 */
@Entity
@Table(name = "qq_notification")
public class Notification implements Serializable,HasId,JsonIn,JsonOut {

    /**
	 * 
	 */
	private static final long serialVersionUID = 7354627977336628506L;

	@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="QQ_NOTIFICATION_IDGEN")
    @SequenceGenerator(allocationSize=1,sequenceName="SEQ_QQ_NOTIFICATION",name="QQ_NOTIFICATION_IDGEN")
    @Column(name = "notification_id")
    private Long id;

	@OneToOne
	@JoinColumn(name="q_id",nullable=false)
	private Question q;


    @ManyToOne
    @JoinColumn(name = "executor_id", nullable = false)
    @JsonReplaceById
    private AdmUser executor;

    @ManyToOne
    @JoinColumn(name = "doc_type_id", nullable = false)
    @JsonReplaceById
    private DescriptorValue docType;

    @ManyToOne
    @JoinColumn(name = "delivery_type_id", nullable = false)
    @JsonReplaceById
    private DescriptorValue deliveryType;

    @Column(name = "notification_date")
    private Date notificationDate;

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

	public AdmUser getExecutor() {
		return executor;
	}

	public void setExecutor(AdmUser executor) {
		this.executor = executor;
	}

	public DescriptorValue getDocType() {
		return docType;
	}

	public void setDocType(DescriptorValue docType) {
		this.docType = docType;
	}

	public DescriptorValue getDeliveryType() {
		return deliveryType;
	}

	public void setDeliveryType(DescriptorValue deliveryType) {
		this.deliveryType = deliveryType;
	}

	public Date getNotificationDate() {
		return notificationDate;
	}

	public void setNotificationDate(Date notificationDate) {
		this.notificationDate = notificationDate;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

}
