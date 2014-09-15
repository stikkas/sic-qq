package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
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
	@NamedQuery(name = "Question.findByInboxNum", query = "SELECT q FROM Question q WHERE q.inboxNum = :inboxNum"),
	@NamedQuery(name = "Question.findByMotivatedRefusal", query = "SELECT q FROM Question q WHERE q.motivatedRefusal = :motivatedRefusal"),
	@NamedQuery(name = "Question.findByPlannedFinishDate", query = "SELECT q FROM Question q WHERE q.plannedFinishDate = :plannedFinishDate"),
	@NamedQuery(name = "Question.findByRegDate", query = "SELECT q FROM Question q WHERE q.regDate = :regDate"),
	@NamedQuery(name = "Question.findByObjectMname", query = "SELECT q FROM Question q WHERE q.objectMname = :objectMname"),
	@NamedQuery(name = "Question.findByObjectFname", query = "SELECT q FROM Question q WHERE q.objectFname = :objectFname"),
	@NamedQuery(name = "Question.findByObjectLname", query = "SELECT q FROM Question q WHERE q.objectLname = :objectLname"),
	@NamedQuery(name = "Question.findByObjectBirthyear", query = "SELECT q FROM Question q WHERE q.objectBirthyear = :objectBirthyear")})
public class Question implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
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
	private Long tarnserType;

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

	@Size(max = 255)
	@Column(name = "INBOX_NUM")
	private String inboxNum;

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

	@OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
	private Collection<Coordintation> coordintationCollection;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Collection<SendAction> sendActionCollection;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Execution execution;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Transmissions transmissions;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private WayToSend wayToSend;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Applicant applicant;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Collection<AttachedFile> attachedFileCollection;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Collection<DeliveryAction> deliveryActionCollection;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Collection<UsedMaterial> usedMaterialCollection;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.LAZY)
	private Notification notification;

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

	public Long getTarnserType() {
		return tarnserType;
	}

	public void setTarnserType(Long tarnserType) {
		this.tarnserType = tarnserType;
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

	public String getInboxNum() {
		return inboxNum;
	}

	public void setInboxNum(String inboxNum) {
		this.inboxNum = inboxNum;
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

	public void setObjectLname(String objectLName) {
		this.objectLName = objectLName;
	}

	public Long getObjectBirthyear() {
		return objectBirthYear;
	}

	public void setObjectBirthyear(Long objectBirthYear) {
		this.objectBirthYear = objectBirthYear;
	}

	public Collection<Coordintation> getCoordintationCollection() {
		return coordintationCollection;
	}

	public void setCoordintationCollection(Collection<Coordintation> coordintationCollection) {
		this.coordintationCollection = coordintationCollection;
	}

	public Collection<SendAction> getSendActionCollection() {
		return sendActionCollection;
	}

	public void setSendActionCollection(Collection<SendAction> sendActionCollection) {
		this.sendActionCollection = sendActionCollection;
	}

	public Execution getExecution() {
		return execution;
	}

	public void setExecution(Execution execution) {
		this.execution = execution;
	}

	public Transmissions getTransmissions() {
		return transmissions;
	}

	public void setTransmissions(Transmissions transmissions) {
		this.transmissions = transmissions;
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

	public Collection<AttachedFile> getAttachedFileCollection() {
		return attachedFileCollection;
	}

	public void setAttachedFileCollection(Collection<AttachedFile> attachedFileCollection) {
		this.attachedFileCollection = attachedFileCollection;
	}

	public Collection<DeliveryAction> getDeliveryActionCollection() {
		return deliveryActionCollection;
	}

	public void setDeliveryActionCollection(Collection<DeliveryAction> deliveryActionCollection) {
		this.deliveryActionCollection = deliveryActionCollection;
	}

	public Collection<UsedMaterial> getUsedMaterialCollection() {
		return usedMaterialCollection;
	}

	public void setUsedMaterialCollection(Collection<UsedMaterial> usedMaterialCollection) {
		this.usedMaterialCollection = usedMaterialCollection;
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
