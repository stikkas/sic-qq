package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Set;
import java.util.TimeZone;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.codehaus.jackson.annotate.JsonIgnore;
import ru.insoft.archive.core_model.table.adm.AdmUser;
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
	@NamedQuery(name = "Question.maxNumber",
			query = "SELECT MAX(q.prefixNum) FROM Question q WHERE q.sufixNum = :year AND q.litera = :litera")})
public class Question implements Serializable, HasId, JsonIn, JsonOut {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "SEQ_QQ_QUESTION", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "SEQ_QQ_QUESTION", sequenceName = "SEQ_QQ_QUESTION", allocationSize = 1)
	@Column(name = "QUESTION_ID")
	private Long id;

	@Column(name = "STATUS_ID")
	private Long status;

	@Column(name = "CREATE_ORG_ID")
	private Long createOrg;

	@Basic(optional = false)
	@NotNull
	@Column(name = "LITERA_ID")
	private Long litera;

	@Size(max = 255)
	@Column(name = "CONTENT")
	private String content;

	@Column(name = "TRANSFER_TYPE_ID")
	private Long transferType;

	@Column(name = "NOTIFY_STATUS_ID")
	private Long notifyStatus;

	@Column(name = "EXEC_ORG_ID")
	private Long execOrg;

	@Column(name = "QUESTION_TYPE_ID")
	private Long questionType;

	@Column(name = "REGISTRATOR_ID")
	private Long registrator;

	@Basic(optional = false)
	@NotNull
	@Column(name = "PREFIX_NUM")
	private Long prefixNum;

	@Basic(optional = false)
	@NotNull
	@Column(name = "SUFIX_NUM")
	private Long sufixNum;

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

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<SendAction> sendActions;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Execution execution;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Transmission transmission;

	@OneToOne(cascade = CascadeType.MERGE, mappedBy = "question", fetch = FetchType.EAGER)
	private Applicant applicant;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<DeliveryAction> deliveryActions;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Set<UsedMaterial> usedMaterials;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "question", fetch = FetchType.EAGER)
	private Notification notification;

	@JsonIgnore
	@JoinColumn(name = "LITERA_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue literaValue;

	@JsonIgnore
	@JoinColumn(name = "STATUS_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue statusValue;

	@JsonIgnore
	@JoinColumn(name = "QUESTION_TYPE_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue questionTypeValue;

	@JsonIgnore
	@JoinColumn(name = "NOTIFY_STATUS_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue notifyStatusValue;

	@JsonIgnore
	@JoinColumn(name = "EXEC_ORG_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.EAGER)
	private DescriptorValue execOrgValue;

	@JsonIgnore
	@JoinColumn(name = "REGISTRATOR_ID", referencedColumnName = "USER_ID", updatable = false, insertable = false)
	@ManyToOne
	private AdmUser registratorId;

	@OneToMany(mappedBy = "questionValue", fetch = FetchType.EAGER)
	private Set<AttachedFile> files;

	public Question() {
	}

	public Question(Long id) {
		this.id = id;
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

	public Long getPrefixNum() {
		return prefixNum;
	}

	public DescriptorValue getQuestionTypeValue() {
		return questionTypeValue;
	}

	public void setQuestionTypeValue(DescriptorValue questionTypeValue) {
		this.questionTypeValue = questionTypeValue;
	}

	public void setPrefixNum(Long prefixNum) {
		this.prefixNum = prefixNum;
	}

	public Long getSufixNum() {
		return sufixNum;
	}

	public void setSufixNum(Long sufixNum) {
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

	public Long getNotifyStatus() {
		return notifyStatus;
	}

	public void setNotifyStatus(Long notifyStatus) {
		this.notifyStatus = notifyStatus;
	}

	public Long getExecOrg() {
		return execOrg;
	}

	public void setExecOrg(Long execOrg) {
		this.execOrg = execOrg;
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
		this.plannedFinishDate = convertDate(plannedFinishDate);
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = convertDate(regDate);
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

	public Applicant getApplicant() {
		return applicant;
	}

	public void setApplicant(Applicant applicant) {
		this.applicant = applicant;
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

	public DescriptorValue getExecOrgValue() {
		return execOrgValue;
	}

	public void setExecOrgValue(DescriptorValue execOrgValue) {
		this.execOrgValue = execOrgValue;
	}

	public DescriptorValue getNotifyStatusValue() {
		return notifyStatusValue;
	}

	public void setNotifyStatusValue(DescriptorValue notifyStatusValue) {
		this.notifyStatusValue = notifyStatusValue;
	}

	public AdmUser getRegistratorId() {
		return registratorId;
	}

	public void setRegistratorId(AdmUser registratorId) {
		this.registratorId = registratorId;
	}

	public Set<AttachedFile> getFiles() {
		return files;
	}

	public void addFile(AttachedFile file) {
		if (file.getTypeValue().getCode().equals("Q_VALUE_FILE_TYPE_APP_DOCS")) {
			files.add(file);
		}
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

	private Date convertDate(Date date) {
		Calendar cal = GregorianCalendar.getInstance();
		cal.setTimeInMillis(date.getTime() - TimeZone.getDefault().getRawOffset());
		return cal.getTime();
	}
}
