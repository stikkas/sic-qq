package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Сущность запроса. Применяется на вкладке "Регистрация запроса"
 *
 * @author Благодатских С.
 */
@NamedQueries({
	@NamedQuery(name = "Question.maxNumber",
			query = "SELECT MAX(q.prefix) FROM Question q WHERE q.litera = :litera AND q.sufix = :sufix")})
@Entity
@Table(name = "SIC_QUESTION")
public class Question implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "sicQuestionGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "sicQuestionGen", sequenceName = "SEQ_SIC_QUESTION", allocationSize = 1)
	@Column(name = "ID")
	private Long id;

	/**
	 * Литера
	 */
	@Column(name = "LITERA_ID")
	private Long litera;

	/**
	 * № Входящего документа, префикс
	 */
	@Column(name = "PREFIX_VHOD_DOC")
	private Long prefix;

	/**
	 * № Входящего документа, суффикс
	 */
	@Column(name = "SUFIX_VHOD_DOC")
	private Integer sufix;

	/**
	 * Дата регистрации
	 */
	@Column(name = "REG_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;

	/**
	 * Способ передачи
	 */
	@Column(name = "SPOSOB_PEREDACHI_ID")
	private Long transferMethod;

	/**
	 * Исполняющая организация
	 */
	@Column(name = "EXEC_ORG_ID")
	private Long execOrg;

	/**
	 * Регистратор
	 */
	@Column(name = "REGISTRATOR_ID")
	private Long registrator;

	/**
	 * Тип запроса (Биографический, Социально-...)
	 */
	@Column(name = "QUESTION_VID_ID")
	private Long questionType;

	/**
	 * Плановая дата исполнения запроса
	 */
	@Column(name = "PLAN_EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date planDate;

	/**
	 * Содержание запроса
	 */
	@Column(name = "CONTENT")
	private String content;

	/**
	 * Форма выдачи ответа
	 */
	@Column(name = "FORM_VYDACHI_ANS_ID")
	private Long replyForm;

	/**
	 * Мотивированный отказ
	 */
	@Column(name = "MOTIV_OTKAZ")
	private Boolean motivRefuse;

	/**
	 * Тип заявителя
	 */
	@Column(name = "TIP_ZAYAV_ID")
	private Long applType;

	/**
	 * Фамилия
	 */
	@Column(name = "FAMALY")
	private String lName;

	/**
	 * Имя
	 */
	@Column(name = "NAME")
	private String fName;

	/**
	 * Отчество
	 */
	@Column(name = "OTCHESTVO")
	private String mName;

	/**
	 * Страна
	 */
	@Column(name = "COUNTRY")
	private String country;

	/**
	 * Адрес
	 */
	@Column(name = "ADRES")
	private String adres;

	/**
	 * Телефон
	 */
	@Column(name = "PHONE")
	private String phone;

	/**
	 * Организация
	 */
	@Column(name = "ORGANIZATION")
	private String orgName;

	/**
	 * Категория заявителя
	 */
	@Column(name = "CATEGOR_ZAYAV_ID")
	private Long applCat;

	/**
	 * № Исходящего документа
	 */
	@Column(name = "NUM_ISHOD_DOC")
	private String issueDocNum;

	/**
	 * Дата исходящего документа
	 */
	@Column(name = "DATE_ISHOD_DOC", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date issueDocDate;

	/**
	 * ФИО юр. лица (кто подписал исходящий документ)
	 */
	@Column(name = "FIO_KTO_PODPISAL_ISHOD_DOC")
	private String issueDocFio;

	/**
	 * Приложения
	 */
	@Column(name = "PRILOGENIYA")
	private String apps;

	/**
	 * На кого запрос, Фамилия
	 */
	@Column(name = "NA_KOGO_Q_FAMALY")
	private String objLName;

	/**
	 * На кого запрос, Имя
	 */
	@Column(name = "NA_KOGO_Q_NAME")
	private String objFName;

	/**
	 * На кого запрос, Отчество
	 */
	@Column(name = "NA_KOGO_Q_OTCHESTVO")
	private String objMName;

	/**
	 * На кого запрос, год рождения
	 */
	@Column(name = "NA_KOGO_Q_GOD_ROJDENIYA")
	private Integer objBYear;

	/**
	 * Статус запроса
	 */
	@Column(name = "STATUS_ID")
	private Long status;

	/**
	 * Статус уведомления
	 */
	@Column(name = "NOTI_STATUS_ID")
	private Long notiStatus;

	/**
	 * Результат ответа
	 * Используется при построении отчета по статистики
	 */
	@JsonIgnore
	@Column(name = "ANS_RESULT_ID", insertable = false, updatable = false)
	private Long replyRes;

	/**
	 * Дата исполнения
	 * Используется при построении отчета по статистики
	 */
	@JsonIgnore
	@Column(name = "EXEC_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	/**
	 * Документы заявителя, устанавливаются при получении запроса по id
	 */
	@OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
	private List<AttachedFile> files;

	@JsonIgnore
	@JoinColumn(name = "REGISTRATOR_ID", referencedColumnName = "USER_ID", insertable = false,
			updatable = false)
	@ManyToOne
	private AdmUser registratorValue;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLitera() {
		return litera;
	}

	public void setLitera(Long litera) {
		this.litera = litera;
	}

	public Long getPrefix() {
		return prefix;
	}

	public void setPrefix(Long prefix) {
		this.prefix = prefix;
	}

	public Integer getSufix() {
		return sufix;
	}

	public void setSufix(Integer sufix) {
		this.sufix = sufix;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Long getTransferMethod() {
		return transferMethod;
	}

	public void setTransferMethod(Long transferMethod) {
		this.transferMethod = transferMethod;
	}

	public Long getExecOrg() {
		return execOrg;
	}

	public void setExecOrg(Long execOrg) {
		this.execOrg = execOrg;
	}

	public Long getRegistrator() {
		return registrator;
	}

	public void setRegistrator(Long registrator) {
		this.registrator = registrator;
	}

	public Long getQuestionType() {
		return questionType;
	}

	public void setQuestionType(Long questionType) {
		this.questionType = questionType;
	}

	public Date getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getReplyForm() {
		return replyForm;
	}

	public void setReplyForm(Long replyForm) {
		this.replyForm = replyForm;
	}

	public Boolean getMotivRefuse() {
		return motivRefuse;
	}

	public void setMotivRefuse(Boolean motivRefuse) {
		this.motivRefuse = motivRefuse;
	}

	public Long getApplType() {
		return applType;
	}

	public void setApplType(Long applType) {
		this.applType = applType;
	}

	public String getlName() {
		return lName;
	}

	public void setlName(String lName) {
		this.lName = lName;
	}

	public String getfName() {
		return fName;
	}

	public void setfName(String fName) {
		this.fName = fName;
	}

	public String getmName() {
		return mName;
	}

	public void setmName(String mName) {
		this.mName = mName;
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

	public String getOrgName() {
		return orgName;
	}

	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}

	public Long getApplCat() {
		return applCat;
	}

	public void setApplCat(Long applCat) {
		this.applCat = applCat;
	}

	public String getIssueDocNum() {
		return issueDocNum;
	}

	public void setIssueDocNum(String issueDocNum) {
		this.issueDocNum = issueDocNum;
	}

	public Date getIssueDocDate() {
		return issueDocDate;
	}

	public void setIssueDocDate(Date issueDocDate) {
		this.issueDocDate = issueDocDate;
	}

	public String getIssueDocFio() {
		return issueDocFio;
	}

	public void setIssueDocFio(String issueDocFio) {
		this.issueDocFio = issueDocFio;
	}

	public String getApps() {
		return apps;
	}

	public void setApps(String apps) {
		this.apps = apps;
	}

	public String getObjLName() {
		return objLName;
	}

	public void setObjLName(String objLName) {
		this.objLName = objLName;
	}

	public String getObjFName() {
		return objFName;
	}

	public void setObjFName(String objFName) {
		this.objFName = objFName;
	}

	public String getObjMName() {
		return objMName;
	}

	public void setObjMName(String objMName) {
		this.objMName = objMName;
	}

	public Integer getObjBYear() {
		return objBYear;
	}

	public void setObjBYear(Integer objBYear) {
		this.objBYear = objBYear;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public List<AttachedFile> getFiles() {
		return files;
	}

	public void setFiles(List<AttachedFile> files) {
		this.files = files;
	}

	public Long getNotiStatus() {
		return notiStatus;
	}

	public void setNotiStatus(Long notiStatus) {
		this.notiStatus = notiStatus;
	}

	public AdmUser getRegistratorValue() {
		return registratorValue;
	}

	public void setRegistratorValue(AdmUser registratorValue) {
		this.registratorValue = registratorValue;
	}

	public Long getReplyRes() {
		return replyRes;
	}

	public void setReplyRes(Long replyRes) {
		this.replyRes = replyRes;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

}
