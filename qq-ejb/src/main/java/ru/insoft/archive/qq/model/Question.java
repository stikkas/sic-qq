package ru.insoft.archive.qq.model;

import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.adm.AdmUser;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author sorokin
 */
@Entity
@Table(name = "qq_question")
public class Question extends ControlledObject implements HasId,JsonIn,JsonOut{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="QQ_QUESTION_IDGEN")
    @SequenceGenerator(allocationSize=1,name="QQ_QUESTION_IDGEN",sequenceName="SEQ_QQ_QUESTION")
    @Column(name = "question_id")
    //id
    private Long id;

    //клиентский айдишник
    private transient String cliId;
    
    //Входящий документ
    @Column(name = "inbox_num")
    private String inboxNum;

    @OneToOne
    @JoinColumn(name="status_id")
    private DescriptorValue status;
    
    @Column(name = "reg_date")
    private Date regDate;

    @OneToOne
    @JoinColumn(name = "litera_id")
    private DescriptorValue litera;

    @OneToOne
    @JoinColumn(name = "transfer_type_id")
    private DescriptorValue transferType;


    @OneToOne
    @JoinColumn(name = "execution_organization_id")
    private DescriptorValue execOrg;

    @OneToOne
    @JoinColumn(name = "registrator_id")
    private AdmUser registrator;

    //Запрос
    //вид запроса
    @OneToOne
    @JoinColumn(name = "question_type_id")
    private DescriptorValue questionType;

    @Column(name = "planned_finish_date")
    private Date plannedFinishDate;

    @Column(name = "content")
    private String content;

    @OneToOne
    @JoinColumn(name="answer_form_type_id")
    private DescriptorValue answerFormType;

    @Column(name = "motivated_refusal")
    private Boolean motivatedRefusal;
    
  //На кого запрос
    @Column(name = "request_object_surname")
    private String requestObjectSurname;

    @Column(name = "request_object_name")
    private String requestObjectName;

    @Column(name = "request_father_name")
    private String requestFatherName;

    @Column(name = "request_object_birthyear")
    private Integer request_object_birthyear;


    @OneToOne(mappedBy="q",cascade={CascadeType.PERSIST,CascadeType.MERGE})
    private Applicant applicant;

    @OneToOne(mappedBy="q",cascade=CascadeType.ALL)
    private Transmission transmission;
    
    
    @OneToOne
    @JoinColumn(name="create_org_id")
    private DescriptorValue createOrg;
    
    @OneToOne(mappedBy="q",cascade=CascadeType.ALL)
    private Notification notify;
    
    
    @OneToOne(mappedBy="q",cascade=CascadeType.ALL)
    private ExecutionInfo execInfo;

    @OneToMany(mappedBy="q",cascade=CascadeType.ALL,targetEntity=AttachedFile.class)
    private Set<AttachedFile> files = new LinkedHashSet<AttachedFile>();
    
    @OneToMany(mappedBy="q",cascade=CascadeType.ALL,targetEntity=DeliveryAction.class)
    private Set<DeliveryAction> delActions = new LinkedHashSet<DeliveryAction>();

    @OneToMany(mappedBy="q",cascade=CascadeType.ALL,targetEntity=UsedMaterial.class)
    private Set<UsedMaterial> usedMaterials = new LinkedHashSet<UsedMaterial>();
    
    @OneToMany(mappedBy="q",cascade=CascadeType.ALL,orphanRemoval=true,targetEntity=Coordination.class)
    private Set<Coordination> coordinations = new LinkedHashSet<Coordination>();
    
    @OneToMany(mappedBy="q",cascade=CascadeType.ALL,orphanRemoval=true,targetEntity=SendAction.class)
    private Set<SendAction> sendActions = new LinkedHashSet<SendAction>();
    
    @OneToOne(mappedBy="q",cascade=CascadeType.ALL)
    private WayToSend wayToSend;

	public Long getId() {
		return id;
	}

////////--------------GENERATED CODE BELOW--------------------///////////////
	public void setId(Long id) {
		this.id = id;
	}

	public String getInboxNum() {
		return inboxNum;
	}

	public void setInboxNum(String inboxNum) {
		this.inboxNum = inboxNum;
	}

	public DescriptorValue getStatus() {
		return status;
	}

	public void setStatus(DescriptorValue status) {
		this.status = status;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public DescriptorValue getLitera() {
		return litera;
	}

	public void setLitera(DescriptorValue litera) {
		this.litera = litera;
	}

	public DescriptorValue getTransferType() {
		return transferType;
	}

	public void setTransferType(DescriptorValue transferType) {
		this.transferType = transferType;
	}

	public DescriptorValue getExecOrg() {
		return execOrg;
	}

	public void setExecOrg(DescriptorValue execOrg) {
		this.execOrg = execOrg;
	}

	public AdmUser getRegistrator() {
		return registrator;
	}

	public void setRegistrator(AdmUser registrator) {
		this.registrator = registrator;
	}

	public DescriptorValue getQuestionType() {
		return questionType;
	}

	public void setQuestionType(DescriptorValue questionType) {
		this.questionType = questionType;
	}

	public Date getPlannedFinishDate() {
		return plannedFinishDate;
	}

	public void setPlannedFinishDate(Date plannedFinishDate) {
		this.plannedFinishDate = plannedFinishDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public DescriptorValue getAnswerFormType() {
		return answerFormType;
	}

	public void setAnswerFormType(DescriptorValue answerFormType) {
		this.answerFormType = answerFormType;
	}

	public Boolean getMotivatedRefusal() {
		return motivatedRefusal;
	}

	public void setMotivatedRefusal(Boolean motivatedRefusal) {
		this.motivatedRefusal = motivatedRefusal;
	}

	public Set<AttachedFile> getFiles() {
		return files;
	}

	public void setFiles(Set<AttachedFile> files) {
		this.files = files;
	}

	public String getRequestObjectSurname() {
		return requestObjectSurname;
	}

	public void setRequestObjectSurname(String requestObjectSurname) {
		this.requestObjectSurname = requestObjectSurname;
	}

	public String getRequestObjectName() {
		return requestObjectName;
	}

	public void setRequestObjectName(String requestObjectName) {
		this.requestObjectName = requestObjectName;
	}

	public String getRequestFatherName() {
		return requestFatherName;
	}

	public void setRequestFatherName(String requestFatherName) {
		this.requestFatherName = requestFatherName;
	}

	public Integer getRequest_object_birthyear() {
		return request_object_birthyear;
	}

	public void setRequest_object_birthyear(Integer request_object_birthyear) {
		this.request_object_birthyear = request_object_birthyear;
	}

	public Applicant getApplicant() {
		return applicant;
	}

	public void setApplicant(Applicant applicant) {
		this.applicant = applicant;
	}

	public Transmission getTransmission() {
		return transmission;
	}

	public void setTransmission(Transmission transmission) {
		this.transmission = transmission;
	}

	public DescriptorValue getCreateOrg() {
		return createOrg;
	}

	public void setCreateOrg(DescriptorValue createOrg) {
		this.createOrg = createOrg;
	}

	public Notification getNotify() {
		return notify;
	}

	public void setNotify(Notification notify) {
		this.notify = notify;
	}

	public ExecutionInfo getExecInfo() {
		return execInfo;
	}

	public void setExecInfo(ExecutionInfo execInfo) {
		this.execInfo = execInfo;
	}

	public Set<DeliveryAction> getDelActions() {
		return delActions;
	}

	public void setDelActions(Set<DeliveryAction> delActions) {
		this.delActions = delActions;
	}

	public Set<UsedMaterial> getUsedMaterials() {
		return usedMaterials;
	}

	public void setUsedMaterials(Set<UsedMaterial> usedMaterials) {
		this.usedMaterials = usedMaterials;
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

	public WayToSend getWayToSend() {
		return wayToSend;
	}

	public void setWayToSend(WayToSend wayToSend) {
		this.wayToSend = wayToSend;
	}
    

   
}
