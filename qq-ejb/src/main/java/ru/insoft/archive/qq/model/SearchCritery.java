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

	private Long queryTypeId;

	private String queryContent;

	private Long applicantTypeId;

	private Long applicantCategoryId;

	private Date regDate;

	private String reqObjName;

	private String reqObjSurname;

	private String reqObjFatherName;

	private String applName;

	private String applSurname;

	private String applFatherName;

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
		if (applName != null) {
			return true;
		}
		if (applSurname != null) {
			return true;
		}
		if (applFatherName != null) {
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

	public String getReqObjName() {
		return reqObjName;
	}

	public void setReqObjName(String reqObjName) {
		this.reqObjName = reqObjName;
	}

	public String getReqObjSurname() {
		return reqObjSurname;
	}

	public void setReqObjSurname(String reqObjSurname) {
		this.reqObjSurname = reqObjSurname;
	}

	public String getReqObjFatherName() {
		return reqObjFatherName;
	}

	public void setReqObjFatherName(String reqObjFatherName) {
		this.reqObjFatherName = reqObjFatherName;
	}

	public String getApplName() {
		return applName;
	}

	public void setApplName(String applName) {
		this.applName = applName;
	}

	public String getApplSurname() {
		return applSurname;
	}

	public void setApplSurname(String applSurname) {
		this.applSurname = applSurname;
	}

	public String getApplFatherName() {
		return applFatherName;
	}

	public void setApplFatherName(String applFatherName) {
		this.applFatherName = applFatherName;
	}
}
