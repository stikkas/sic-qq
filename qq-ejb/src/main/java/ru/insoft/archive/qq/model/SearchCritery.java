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

	private Long archiveId;

	private Long litera;

	private Long queryTypeId;

	private String queryContent;

	private Long applicantTypeId;

	private Long applicantCategoryId;

	private Date regDate;

	private String reqFirstName;

	private String reqLastName;

	private String reqMiddleName;

	private String applFirstName;

	private String applLastName;

	private String applMiddleName;

	/**
	 * Позволяет определить, содержатся ли в критериях поиска атрибуты из
	 * связанной модели Applicant. Если содержатся, для поиска нужно join ить
	 * Applicants
	 *
	 * @return
	 */
	public Boolean isApplicantJoinNeeds() {
		if (applicantTypeId != null) {
			return true;
		}
		if (applicantCategoryId != null) {
			return true;
		}
		if (applFirstName != null) {
			return true;
		}
		if (applLastName != null) {
			return true;
		}
		if (applMiddleName != null) {
			return true;
		}
		return false;
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

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
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

	public Long getLitera() {
		return litera;
	}

	public void setLitera(Long litera) {
		this.litera = litera;
	}

}
