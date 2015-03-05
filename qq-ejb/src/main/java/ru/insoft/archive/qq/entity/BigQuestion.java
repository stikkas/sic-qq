package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

/**
 *
 * @author Благодатских С.
 */
public class BigQuestion implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "SEQ_SIC_QUESTION", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "SEQ_SIC_QUESTION", sequenceName = "SEQ_SIC_QUESTION", allocationSize = 1)
	@Column(name = "ID")
	private Long id;

	@Column(name = "LITERA_ID")
	private Long literaId;

	@Column(name = "PREFIX_VHOD_DOC")
	private Long prefixVhodDoc;

	@Column(name = "SUFIX_VHOD_DOC")
	private Integer sufixVhodDoc;

	@Column(name = "REG_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;

	@Column(name = "SPOSOB_PEREDACHI_ID")
	private Long sposobPeredachiId;

	@Column(name = "EXEC_ORG_ID")
	private Long execOrgId;

	@Column(name = "REGISTRATOR_ID")
	private Long registratorId;

	@Column(name = "QUESTION_VID_ID")
	private Long questionTypeId;

	@Column(name = "PLAN_EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date planExecDate;

	@Size(max = 4000)
	@Column(name = "CONTENT")
	private String content;

	@Column(name = "FORM_VYDACHI_ANS_ID")
	private Long formaVydachyOtvetaId;

	@Column(name = "MOTIV_OTKAZ")
	private Short motivOtkaz;

	@Column(name = "TIP_ZAYAV_ID")
	private Long tipZayavitelyaId;

	@Size(max = 255)
	@Column(name = "FAMALY")
	private String famaly;

	@Size(max = 255)
	@Column(name = "NAME")
	private String name;

	@Size(max = 255)
	@Column(name = "OTCHESTVO")
	private String otchestvo;

	@Size(max = 255)
	@Column(name = "COUNTRY")
	private String country;

	@Size(max = 255)
	@Column(name = "ADRES")
	private String adres;

	@Size(max = 255)
	@Column(name = "PHONE")
	private String phone;

	@Size(max = 255)
	@Column(name = "ORGANIZATION")
	private String organization;

	@Column(name = "CATEGOR_ZAYAV_ID")
	private Long categoryZayvitelyaId;

	@Size(max = 255)
	@Column(name = "NUM_ISHOD_DOC")
	private String numIshodDoc;

	@Column(name = "DATE_ISHOD_DOC", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateIshodDoc;

	@Size(max = 255)
	@Column(name = "FIO_KTO_PODPISAL_ISHOD_DOC")
	private String fioKtoPodpisalIshodDoc;

	@Size(max = 255)
	@Column(name = "PRILOGENIYA")
	private String prilogeniya;

	@Size(max = 255)
	@Column(name = "NA_KOGO_Q_FAMALY")
	private String naKogoQFamaly;

	@Size(max = 255)
	@Column(name = "NA_KOGO_Q_NAME")
	private String naKogoQName;

	@Size(max = 255)
	@Column(name = "NA_KOGO_Q_OTCHESTVO")
	private String naKogoQOtchestvo;

	@Column(name = "NA_KOGO_Q_GOD_ROJDENIYA")
	private Integer naKogoQGodRojdeniya;

	@Column(name = "NOTI_EXECUTOR_ID")
	private Long notificationExecutorId;

	@Column(name = "TIP_DOCS_ID")
	private Long typeNotificationDocs;

	@Size(max = 255)
	@Column(name = "NOTI_KOMU")
	private String notiKomu;

	@Column(name = "NOTI_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiDate;

	@Column(name = "NOTI_SPOSOB_PEREDACHI_ID")
	private Long notificationSposobPeredachiId;

	@Column(name = "NOTI_DATE_OTPRAVKI_DOC", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiDateOtpravkiDoc;

	@Column(name = "BOSS_EXECUTOR_ID")
	private Long bossExecutorId;

	@Column(name = "BOSS_EXECUTOR_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date bossExecutorDate;

	@Column(name = "EXECUTOR_ID")
	private Long executorId;

	@Column(name = "EXECUTOR_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date executorDate;

	@Column(name = "CONTROL")
	private Short control;

	@Column(name = "CONTROL_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date controlDate;

	@Size(max = 255)
	@Column(name = "RESOLUTION_AUTHOR")
	private String resolutionAuthor;

	@Column(name = "STORAGE_TERRITORY_ID")
	private Long storageTerritoryId;

	@Size(max = 255)
	@Column(name = "STORAGE_NAME")
	private String storageName;

	@Column(name = "EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	@Column(name = "NOTI_PRODLENIE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiProdlenie;

	@Column(name = "ANS_RESULT_ID")
	private Long answerResultId;

	@Column(name = "TEMATIC_ANS_ID")
	private Long tematicAnswerId;

	@Size(max = 4000)
	@Column(name = "RECOMENDATION")
	private String recomendation;

	@Column(name = "CAT_SLOJNOSTI_ID")
	private Long categorySlojnostiId;

	@Size(max = 255)
	@Column(name = "NUM_ISHODYACHEGO")
	private String numIshodyachego;

	@Size(max = 4000)
	@Column(name = "PRIMECHANIE")
	private String primechanie;

	@Column(name = "STATUS_ID")
	private Long statusId;

	@Column(name = "NOTI_STATUS_ID")
	private Long notificationStatusId;

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPrefixVhodDoc() {
		return prefixVhodDoc;
	}

	public void setPrefixVhodDoc(Long prefixVhodDoc) {
		this.prefixVhodDoc = prefixVhodDoc;
	}

	public Integer getSufixVhodDoc() {
		return sufixVhodDoc;
	}

	public void setSufixVhodDoc(Integer sufixVhodDoc) {
		this.sufixVhodDoc = sufixVhodDoc;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Date getPlanExecDate() {
		return planExecDate;
	}

	public void setPlanExecDate(Date planExecDate) {
		this.planExecDate = planExecDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Short getMotivOtkaz() {
		return motivOtkaz;
	}

	public void setMotivOtkaz(Short motivOtkaz) {
		this.motivOtkaz = motivOtkaz;
	}

	public String getFamaly() {
		return famaly;
	}

	public void setFamaly(String famaly) {
		this.famaly = famaly;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOtchestvo() {
		return otchestvo;
	}

	public void setOtchestvo(String otchestvo) {
		this.otchestvo = otchestvo;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAdres() {
		return adres;
	}

	public void setAdres(String adres) {
		this.adres = adres;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public String getNumIshodDoc() {
		return numIshodDoc;
	}

	public void setNumIshodDoc(String numIshodDoc) {
		this.numIshodDoc = numIshodDoc;
	}

	public Date getDateIshodDoc() {
		return dateIshodDoc;
	}

	public void setDateIshodDoc(Date dateIshodDoc) {
		this.dateIshodDoc = dateIshodDoc;
	}

	public String getFioKtoPodpisalIshodDoc() {
		return fioKtoPodpisalIshodDoc;
	}

	public void setFioKtoPodpisalIshodDoc(String fioKtoPodpisalIshodDoc) {
		this.fioKtoPodpisalIshodDoc = fioKtoPodpisalIshodDoc;
	}

	public String getPrilogeniya() {
		return prilogeniya;
	}

	public void setPrilogeniya(String prilogeniya) {
		this.prilogeniya = prilogeniya;
	}

	public String getNaKogoQFamaly() {
		return naKogoQFamaly;
	}

	public void setNaKogoQFamaly(String naKogoQFamaly) {
		this.naKogoQFamaly = naKogoQFamaly;
	}

	public String getNaKogoQName() {
		return naKogoQName;
	}

	public void setNaKogoQName(String naKogoQName) {
		this.naKogoQName = naKogoQName;
	}

	public String getNaKogoQOtchestvo() {
		return naKogoQOtchestvo;
	}

	public void setNaKogoQOtchestvo(String naKogoQOtchestvo) {
		this.naKogoQOtchestvo = naKogoQOtchestvo;
	}

	public Integer getNaKogoQGodRojdeniya() {
		return naKogoQGodRojdeniya;
	}

	public void setNaKogoQGodRojdeniya(Integer naKogoQGodRojdeniya) {
		this.naKogoQGodRojdeniya = naKogoQGodRojdeniya;
	}

	public String getNotiKomu() {
		return notiKomu;
	}

	public void setNotiKomu(String notiKomu) {
		this.notiKomu = notiKomu;
	}

	public Date getNotiDate() {
		return notiDate;
	}

	public void setNotiDate(Date notiDate) {
		this.notiDate = notiDate;
	}

	public Date getNotiDateOtpravkiDoc() {
		return notiDateOtpravkiDoc;
	}

	public void setNotiDateOtpravkiDoc(Date notiDateOtpravkiDoc) {
		this.notiDateOtpravkiDoc = notiDateOtpravkiDoc;
	}

	public Date getBossExecutorDate() {
		return bossExecutorDate;
	}

	public void setBossExecutorDate(Date bossExecutorDate) {
		this.bossExecutorDate = bossExecutorDate;
	}

	public Date getExecutorDate() {
		return executorDate;
	}

	public void setExecutorDate(Date executorDate) {
		this.executorDate = executorDate;
	}

	public Short getControl() {
		return control;
	}

	public void setControl(Short control) {
		this.control = control;
	}

	public Date getControlDate() {
		return controlDate;
	}

	public void setControlDate(Date controlDate) {
		this.controlDate = controlDate;
	}

	public String getResolutionAuthor() {
		return resolutionAuthor;
	}

	public void setResolutionAuthor(String resolutionAuthor) {
		this.resolutionAuthor = resolutionAuthor;
	}

	public String getStorageName() {
		return storageName;
	}

	public void setStorageName(String storageName) {
		this.storageName = storageName;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

	public Date getNotiProdlenie() {
		return notiProdlenie;
	}

	public void setNotiProdlenie(Date notiProdlenie) {
		this.notiProdlenie = notiProdlenie;
	}

	public String getRecomendation() {
		return recomendation;
	}

	public void setRecomendation(String recomendation) {
		this.recomendation = recomendation;
	}

	public String getNumIshodyachego() {
		return numIshodyachego;
	}

	public void setNumIshodyachego(String numIshodyachego) {
		this.numIshodyachego = numIshodyachego;
	}

	public String getPrimechanie() {
		return primechanie;
	}

	public void setPrimechanie(String primechanie) {
		this.primechanie = primechanie;
	}

	public Long getLiteraId() {
		return literaId;
	}

	public void setLiteraId(Long literaId) {
		this.literaId = literaId;
	}

	public Long getSposobPeredachiId() {
		return sposobPeredachiId;
	}

	public void setSposobPeredachiId(Long sposobPeredachiId) {
		this.sposobPeredachiId = sposobPeredachiId;
	}

	public Long getExecOrgId() {
		return execOrgId;
	}

	public void setExecOrgId(Long execOrgId) {
		this.execOrgId = execOrgId;
	}

	public Long getRegistratorId() {
		return registratorId;
	}

	public void setRegistratorId(Long registratorId) {
		this.registratorId = registratorId;
	}

	public Long getQuestionTypeId() {
		return questionTypeId;
	}

	public void setQuestionTypeId(Long questionTypeId) {
		this.questionTypeId = questionTypeId;
	}

	public Long getFormaVydachyOtvetaId() {
		return formaVydachyOtvetaId;
	}

	public void setFormaVydachyOtvetaId(Long formaVydachyOtvetaId) {
		this.formaVydachyOtvetaId = formaVydachyOtvetaId;
	}

	public Long getTipZayavitelyaId() {
		return tipZayavitelyaId;
	}

	public void setTipZayavitelyaId(Long tipZayavitelyaId) {
		this.tipZayavitelyaId = tipZayavitelyaId;
	}

	public Long getCategoryZayvitelyaId() {
		return categoryZayvitelyaId;
	}

	public void setCategoryZayvitelyaId(Long categoryZayvitelyaId) {
		this.categoryZayvitelyaId = categoryZayvitelyaId;
	}

	public Long getNotificationExecutorId() {
		return notificationExecutorId;
	}

	public void setNotificationExecutorId(Long notificationExecutorId) {
		this.notificationExecutorId = notificationExecutorId;
	}

	public Long getTypeNotificationDocs() {
		return typeNotificationDocs;
	}

	public void setTypeNotificationDocs(Long typeNotificationDocs) {
		this.typeNotificationDocs = typeNotificationDocs;
	}

	public Long getNotificationSposobPeredachiId() {
		return notificationSposobPeredachiId;
	}

	public void setNotificationSposobPeredachiId(Long notificationSposobPeredachiId) {
		this.notificationSposobPeredachiId = notificationSposobPeredachiId;
	}

	public Long getBossExecutorId() {
		return bossExecutorId;
	}

	public void setBossExecutorId(Long bossExecutorId) {
		this.bossExecutorId = bossExecutorId;
	}

	public Long getExecutorId() {
		return executorId;
	}

	public void setExecutorId(Long executorId) {
		this.executorId = executorId;
	}

	public Long getStorageTerritoryId() {
		return storageTerritoryId;
	}

	public void setStorageTerritoryId(Long storageTerritoryId) {
		this.storageTerritoryId = storageTerritoryId;
	}

	public Long getAnswerResultId() {
		return answerResultId;
	}

	public void setAnswerResultId(Long answerResultId) {
		this.answerResultId = answerResultId;
	}

	public Long getTematicAnswerId() {
		return tematicAnswerId;
	}

	public void setTematicAnswerId(Long tematicAnswerId) {
		this.tematicAnswerId = tematicAnswerId;
	}

	public Long getCategorySlojnostiId() {
		return categorySlojnostiId;
	}

	public void setCategorySlojnostiId(Long categorySlojnostiId) {
		this.categorySlojnostiId = categorySlojnostiId;
	}

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	public Long getNotificationStatusId() {
		return notificationStatusId;
	}

	public void setNotificationStatusId(Long notificationStatusId) {
		this.notificationStatusId = notificationStatusId;
	}


}
