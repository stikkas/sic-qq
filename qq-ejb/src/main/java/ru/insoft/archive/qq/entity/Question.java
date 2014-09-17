package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Данные по запросам.
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_QUESTION")
@NamedQueries({
	@NamedQuery(name = "Question.findAll", query = "SELECT q FROM Question q"),
	@NamedQuery(name = "Question.findById", query = "SELECT q FROM Question q WHERE q.id = :id"),
	@NamedQuery(name = "Question.findByInsertDate", query = "SELECT q FROM Question q WHERE q.insertDate = :insertDate"),
	@NamedQuery(name = "Question.findByUpdateDate", query = "SELECT q FROM Question q WHERE q.updateDate = :updateDate"),
	@NamedQuery(name = "Question.findByContent", query = "SELECT q FROM Question q WHERE q.content = :content"),
	@NamedQuery(name = "Question.findByMotivatedRefusal", query = "SELECT q FROM Question q WHERE q.motivatedRefusal = :motivatedRefusal"),
	@NamedQuery(name = "Question.findByPlannedFinishDate", query = "SELECT q FROM Question q WHERE q.plannedFinishDate = :plannedFinishDate"),
	@NamedQuery(name = "Question.findByRegDate", query = "SELECT q FROM Question q WHERE q.regDate = :regDate"),
	@NamedQuery(name = "Question.findByObjectMName", query = "SELECT q FROM Question q WHERE q.objectMName = :objectMName"),
	@NamedQuery(name = "Question.findByObjectFName", query = "SELECT q FROM Question q WHERE q.objectFName = :objectFName"),
	@NamedQuery(name = "Question.findByObjectLName", query = "SELECT q FROM Question q WHERE q.objectLName = :objectLName"),
	@NamedQuery(name = "Question.findByObjectBirthYear", query = "SELECT q FROM Question q WHERE q.objectBirthYear = :objectBirthYear")})
public class Question implements Serializable, HasId, JsonIn, JsonOut {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "SEQ_QQ_QUESTION", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "SEQ_QQ_QUESTION", sequenceName = "SEQ_QQ_QUESTION", allocationSize = 1)
	@Column(name = "QUESTION_ID")
	private Long id;

	@Basic(optional = false)
	@NotNull
	@Column(name = "INSERT_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date insertDate;

	@Basic(optional = false)
	@NotNull
	@Column(name = "UPDATE_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updateDate;

	@Column(name = "STATUS_ID")
	private Long status;

	@Column(name = "CREATE_ORG_ID")
	private Long createOrg;

	@Column(name = "LITERA_ID")
	private Long litera;

	@Size(max = 255)
	@Column(name = "CONTENT")
	private String content;

	@Column(name = "TRANSFER_TYPE_ID")
	private Long transferType;

	@Column(name = "EXEC_ORG_ID")
	private Long execOrg;

	@Basic(optional = false)
	@NotNull
	@Column(name = "INSERT_USER_ID")
	private Long insertUser;

	@Basic(optional = false)
	@NotNull
	@Column(name = "UPDATE_USER_ID")
	private Long updateUser;

	@Column(name = "QUESTION_TYPE_ID")
	private Long questionType;

	@Column(name = "REGISTRATOR_ID")
	private Long registrator;

	@Size(max = 20)
	@Column(name = "PREFIX_NUM")
	private String prefixNum;

	@Size(max = 20)
	@Column(name = "SUFIX_NUM")
	private String sufixNum;

	@Column(name = "MOTIVATED_REFUSAL")
	private Boolean motivatedRefusal;

	@Column(name = "PLANNED_FINISH_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date plannedFinishDate;

	@Column(name = "REG_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;

	@Column(name = "ANSWER_FORM_TYPE_ID")
	private Long answerFormType;

	@Size(max = 255)
	@Column(name = "OBJECT_MNAME")
	private String objectMName;

	@Size(max = 255)
	@Column(name = "OBJECT_FNAME")
	private String objectFName;

	@Size(max = 255)
	@Column(name = "OBJECT_LNAME")
	private String objectLName;

	@Column(name = "OBJECT_BIRTHYEAR")
	private Long objectBirthYear;

	@Transient
	@OneToMany(mappedBy = "question", fetch = FetchType.EAGER)
	private Set<Coordination> coordinations;

	@Transient
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<SendAction> sendActions;

	@Transient
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Execution execution;

	@Transient
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Transmission transmission;

	@Transient
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private WayToSend wayToSend;

	@Transient
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Applicant applicant;

	@Transient
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<AttachedFile> attachedFiles;

	@Transient
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<DeliveryAction> deliveryActions;

	@Transient
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<UsedMaterial> usedMaterials;

	@Transient
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Notification notification;

	@Transient
	@JoinColumn(name = "LITERA_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
		insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue literaValue;

	@Transient
	@JoinColumn(name = "STATUS_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
		insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue statusValue;

	public Question() {
	}

	public Question(Long id) {
		this.id = id;
	}

	public Question(Long id, Date insertDate, Date updateDate) {
		this.id = id;
		this.insertDate = insertDate;
		this.updateDate = updateDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public DescriptorValue getStatusValue() {
		return statusValue;
	}

	public void setStatusValue(DescriptorValue statusValue) {
		this.statusValue = statusValue;
	}

	public String getPrefixNum() {
		return prefixNum;
	}

	public void setPrefixNum(String prefixNum) {
		this.prefixNum = prefixNum;
	}

	public String getSufixNum() {
		return sufixNum;
	}

	public void setSufixNum(String sufixNum) {
		this.sufixNum = sufixNum;
	}

	public DescriptorValue getLiteraValue() {
		return literaValue;
	}

	public void setLiteraValue(DescriptorValue literaValue) {
		this.literaValue = literaValue;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public Long getCreateOrg() {
		return createOrg;
	}

	public void setCreateOrg(Long createOrg) {
		this.createOrg = createOrg;
	}

	public Long getLitera() {
		return litera;
	}

	public void setLitera(Long litera) {
		this.litera = litera;
	}

	public Long getTransferType() {
		return transferType;
	}

	public void setTransferType(Long transferType) {
		this.transferType = transferType;
	}

	public Long getExecOrg() {
		return execOrg;
	}

	public void setExecOrg(Long execOrg) {
		this.execOrg = execOrg;
	}

	public Long getInsertUser() {
		return insertUser;
	}

	public void setInsertUser(Long insertUser) {
		this.insertUser = insertUser;
	}

	public Long getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(Long updateUser) {
		this.updateUser = updateUser;
	}

	public Long getQuestionType() {
		return questionType;
	}

	public void setQuestionType(Long questionType) {
		this.questionType = questionType;
	}

	public Long getRegistrator() {
		return registrator;
	}

	public void setRegistrator(Long registrator) {
		this.registrator = registrator;
	}

	public Long getAnswerFormType() {
		return answerFormType;
	}

	public void setAnswerFormType(Long answerFormType) {
		this.answerFormType = answerFormType;
	}

	public Long getObjectBirthYear() {
		return objectBirthYear;
	}

	public void setObjectBirthYear(Long objectBirthYear) {
		this.objectBirthYear = objectBirthYear;
	}

	public Date getInsertDate() {
		return insertDate;
	}

	public void setInsertDate(Date insertDate) {
		this.insertDate = insertDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Boolean getMotivatedRefusal() {
		return motivatedRefusal;
	}

	public void setMotivatedRefusal(Boolean motivatedRefusal) {
		this.motivatedRefusal = motivatedRefusal;
	}

	public Date getPlannedFinishDate() {
		return plannedFinishDate;
	}

	public void setPlannedFinishDate(Date plannedFinishDate) {
		this.plannedFinishDate = plannedFinishDate;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getObjectMName() {
		return objectMName;
	}

	public void setObjectMName(String objectMName) {
		this.objectMName = objectMName;
	}

	public String getObjectFName() {
		return objectFName;
	}

	public void setObjectFName(String objectFName) {
		this.objectFName = objectFName;
	}

	public String getObjectLName() {
		return objectLName;
	}

	public void setObjectLName(String objectLName) {
		this.objectLName = objectLName;
	}

	public Long getObjectBirthyear() {
		return objectBirthYear;
	}

	public void setObjectBirthyear(Long objectBirthYear) {
		this.objectBirthYear = objectBirthYear;
	}

	public Set<Coordination> getCoordinations() {
		return coordinations;
	}

	public void setCoordinations(Set<Coordination> coordinations) {
		this.coordinations = coordinations;
	}

	public Set<SendAction> getSendActions() {
		return sendActions;
	}

	public void setSendActions(Set<SendAction> sendActions) {
		this.sendActions = sendActions;
	}

	public Execution getExecution() {
		return execution;
	}

	public void setExecution(Execution execution) {
		this.execution = execution;
	}

	public Transmission getTransmission() {
		return transmission;
	}

	public void setTransmission(Transmission transmission) {
		this.transmission = transmission;
	}

	public WayToSend getWayToSend() {
		return wayToSend;
	}

	public void setWayToSend(WayToSend wayToSend) {
		this.wayToSend = wayToSend;
	}

	public Applicant getApplicant() {
		return applicant;
	}

	public void setApplicant(Applicant applicant) {
		this.applicant = applicant;
	}

	public Set<AttachedFile> getAttachedFiles() {
		return attachedFiles;
	}

	public void setAttachedFiles(Set<AttachedFile> attachedFiles) {
		this.attachedFiles = attachedFiles;
	}

	public Set<DeliveryAction> getDeliveryActions() {
		return deliveryActions;
	}

	public void setDeliveryActions(Set<DeliveryAction> deliveryActions) {
		this.deliveryActions = deliveryActions;
	}

	public Set<UsedMaterial> getUsedMaterials() {
		return usedMaterials;
	}

	public void setUsedMaterials(Set<UsedMaterial> usedMaterials) {
		this.usedMaterials = usedMaterials;
	}

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof Question)) {
			return false;
		}
		Question other = (Question) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Question[ questionId=" + id + " ]";
	}

}
