package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Сущность для поиска
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "SIC_QUESTION")
public class Search implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "LITERA_ID", insertable = false, updatable = false)
	private Long literaId;

	@Column(name = "PREFIX_VHOD_DOC", insertable = false, updatable = false)
	private Long numPrefix;

	@Column(name = "SUFIX_VHOD_DOC", insertable = false, updatable = false)
	private Integer numSufix;

	@Column(name = "REG_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date regDate;

	@Column(name = "EXEC_ORG_ID", insertable = false, updatable = false)
	private Long execOrgId;

	@Column(name = "QUESTION_VID_ID", insertable = false, updatable = false)
	private Long questionTypeId;

	@Column(name = "CONTENT", insertable = false, updatable = false)
	private String content;

	@Column(name = "TIP_ZAYAV_ID", insertable = false, updatable = false)
	private Long aplTypeId;

	@Column(name = "FAMALY", insertable = false, updatable = false)
	private String lName;

	@Column(name = "NAME", insertable = false, updatable = false)
	private String fName;

	@Column(name = "OTCHESTVO", insertable = false, updatable = false)
	private String mName;

	@Column(name = "COUNTRY", insertable = false, updatable = false)
	private String country;

	@Column(name = "ORGANIZATION", insertable = false, updatable = false)
	private String organization;

	@Column(name = "CATEGOR_ZAYAV_ID", insertable = false, updatable = false)
	private Long aplCatId;

	@Column(name = "NUM_ISHOD_DOC", insertable = false, updatable = false)
	private String numIshodDoc;

	@Column(name = "NA_KOGO_Q_FAMALY", insertable = false, updatable = false)
	private String naKogoLName;

	@Column(name = "NA_KOGO_Q_NAME", insertable = false, updatable = false)
	private String naKogoFName;

	@Column(name = "NA_KOGO_Q_OTCHESTVO", insertable = false, updatable = false)
	private String naKogoMName;

	@Column(name = "EXECUTOR_ID", insertable = false, updatable = false)
	private Long executorId;

	@Column(name = "ANS_RESULT_ID", insertable = false, updatable = false)
	private Long replyResultId;

	@Column(name = "STATUS_ID", insertable = false, updatable = false)
	private Long statusId;

	@JoinColumn(name = "LITERA_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue litera;

	@JoinColumn(name = "QUESTION_VID_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue questionType;

	@JoinColumn(name = "ANS_RESULT_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue replyResult;

	public DescriptorValue getReplyResult() {
		return replyResult;
	}

	public void setReplyResult(DescriptorValue replyResult) {
		this.replyResult = replyResult;
	}

	public DescriptorValue getQuestionType() {
		return questionType;
	}

	public void setQuestionType(DescriptorValue questionType) {
		this.questionType = questionType;
	}

	public DescriptorValue getLitera() {
		return litera;
	}

	public void setLitera(DescriptorValue litera) {
		this.litera = litera;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLiteraId() {
		return literaId;
	}

	public void setLiteraId(Long literaId) {
		this.literaId = literaId;
	}

	public Long getNumPrefix() {
		return numPrefix;
	}

	public void setNumPrefix(Long numPrefix) {
		this.numPrefix = numPrefix;
	}

	public Integer getNumSufix() {
		return numSufix;
	}

	public void setNumSufix(Integer numSufix) {
		this.numSufix = numSufix;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public Long getExecOrgId() {
		return execOrgId;
	}

	public void setExecOrgId(Long execOrgId) {
		this.execOrgId = execOrgId;
	}

	public Long getQuestionTypeId() {
		return questionTypeId;
	}

	public void setQuestionTypeId(Long questionTypeId) {
		this.questionTypeId = questionTypeId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getAplTypeId() {
		return aplTypeId;
	}

	public void setAplTypeId(Long aplTypeId) {
		this.aplTypeId = aplTypeId;
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

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public Long getAplCatId() {
		return aplCatId;
	}

	public void setAplCatId(Long aplCatId) {
		this.aplCatId = aplCatId;
	}

	public String getNumIshodDoc() {
		return numIshodDoc;
	}

	public void setNumIshodDoc(String numIshodDoc) {
		this.numIshodDoc = numIshodDoc;
	}

	public String getNaKogoLName() {
		return naKogoLName;
	}

	public void setNaKogoLName(String naKogoLName) {
		this.naKogoLName = naKogoLName;
	}

	public String getNaKogoFName() {
		return naKogoFName;
	}

	public void setNaKogoFName(String naKogoFName) {
		this.naKogoFName = naKogoFName;
	}

	public String getNaKogoMName() {
		return naKogoMName;
	}

	public void setNaKogoMName(String naKogoMName) {
		this.naKogoMName = naKogoMName;
	}

	public Long getExecutorId() {
		return executorId;
	}

	public void setExecutorId(Long executorId) {
		this.executorId = executorId;
	}

	public Long getReplyResultId() {
		return replyResultId;
	}

	public void setReplyResultId(Long replyResultId) {
		this.replyResultId = replyResultId;
	}

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

}
