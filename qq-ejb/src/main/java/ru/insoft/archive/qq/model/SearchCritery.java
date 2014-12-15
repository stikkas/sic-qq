/**
 * Критерии поиска
 */
package ru.insoft.archive.qq.model;

import java.util.Date;

import ru.insoft.archive.extcommons.json.JsonIn;

/**
 * @author sorokin
 */
public class SearchCritery implements JsonIn {

	/**
	 * Архив исполнитель
	 */
	private Long archiveId;

	/**
	 * Литера
	 */
	private Long litera;

	/**
	 * Вид запроса
	 */
	private Long queryTypeId;

	/**
	 * Исполнитель
	 */
	private Long executor;

	/**
	 * Содержание запроса
	 */
	private String queryContent;

	/**
	 * Тип заявителя
	 */
	private Long applicantTypeId;

	/**
	 * Категория заявителя
	 */
	private Long applicantCategoryId;

	/**
	 * Дата регистрации с
	 */
	private Date regDateStart;

	/**
	 * Дата регистрации по
	 */
	private Date regDateEnd;

	/**
	 * На кого запрос имя
	 */
	private String reqFirstName;

	/**
	 * На кого запрос фамилия
	 */
	private String reqLastName;

	/**
	 * На кого запрос отчество
	 */
	private String reqMiddleName;

	/**
	 * Заявитель имя
	 */
	private String applFirstName;

	/**
	 * Заявитель фамилия
	 */
	private String applLastName;

	/**
	 * Заявитель отчество
	 */
	private String applMiddleName;

	/**
	 * Заявитель организация
	 */
	private String organization;

	/**
	 * Заявитель № исходящего документа
	 */
	private String issueDocNum;

	/**
	 * Позволяет определить, содержатся ли в критериях поиска атрибуты из
	 * связанной модели Applicant. Если содержатся, для поиска нужно join ить
	 * Applicants
	 *
	 * @return
	 */
	public Boolean isApplicantJoinNeeds() {
		return !(applicantTypeId == null && applicantCategoryId == null
				&& applFirstName == null && applLastName == null
				&& applMiddleName == null && organization == null
				&& issueDocNum == null);
	}

	public Long getArchiveId() {
		return archiveId;
	}

	public void setArchiveId(Long archiveId) {
		this.archiveId = archiveId;
	}

	public Long getQueryTypeId() {
		return queryTypeId;
	}

	public void setQueryTypeId(Long queryTypeId) {
		this.queryTypeId = queryTypeId;
	}

	public String getQueryContent() {
		return queryContent;
	}

	public void setQueryContent(String queryContent) {
		this.queryContent = queryContent;
	}

	public Long getApplicantTypeId() {
		return applicantTypeId;
	}

	public void setApplicantTypeId(Long applicantTypeId) {
		this.applicantTypeId = applicantTypeId;
	}

	public Long getApplicantCategoryId() {
		return applicantCategoryId;
	}

	public void setApplicantCategoryId(Long applicantCategoryId) {
		this.applicantCategoryId = applicantCategoryId;
	}

	public String getReqFirstName() {
		return reqFirstName;
	}

	public void setReqFirstName(String reqFirstName) {
		this.reqFirstName = reqFirstName;
	}

	public String getReqLastName() {
		return reqLastName;
	}

	public void setReqLastName(String reqLastName) {
		this.reqLastName = reqLastName;
	}

	public String getReqMiddleName() {
		return reqMiddleName;
	}

	public void setReqMiddleName(String reqMiddleName) {
		this.reqMiddleName = reqMiddleName;
	}

	public String getApplFirstName() {
		return applFirstName;
	}

	public void setApplFirstName(String applFirstName) {
		this.applFirstName = applFirstName;
	}

	public String getApplLastName() {
		return applLastName;
	}

	public void setApplLastName(String applLastName) {
		this.applLastName = applLastName;
	}

	public String getApplMiddleName() {
		return applMiddleName;
	}

	public void setApplMiddleName(String applMiddleName) {
		this.applMiddleName = applMiddleName;
	}

	public Date getRegDateStart() {
		return regDateStart;
	}

	public void setRegDateStart(Date regDateStart) {
		this.regDateStart = regDateStart;
	}

	public Date getRegDateEnd() {
		return regDateEnd;
	}

	public void setRegDateEnd(Date regDateEnd) {
		this.regDateEnd = regDateEnd;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public String getIssueDocNum() {
		return issueDocNum;
	}

	public void setIssueDocNum(String issueDocNum) {
		this.issueDocNum = issueDocNum;
	}

	public Long getLitera() {
		return litera;
	}

	public void setLitera(Long litera) {
		this.litera = litera;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

}
