package ru.insoft.archive.sicqq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 * Данные заявителя
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "QQ_APPLICANT")
public class Applicant implements Serializable {

	/**
	 * Идентификатор
	 */
	@Id
	@Basic(optional = false)
	@Column(name = "QUESTION_ID")
	private Long id;
	/**
	 * Приложения
	 */
	@Column(name = "APPENDS")
	private String appends;
	/**
	 * Адрес
	 */
	@Column(name = "ADDRESS")
	private String address;
	/**
	 * Название организации (для ЮЛ)
	 */
	@Column(name = "ORGANIZATION")
	private String organization;
	/**
	 * Год рождения заявителя
	 */
	@Column(name = "BIRTH_YEAR")
	private Integer birthYear;
	/**
	 * Страна
	 */
	@Column(name = "COUNTRY")
	private String country;
	/**
	 * Отчество заявителя (для ФЛ)
	 */
	@Column(name = "MIDDLE_NAME")
	private String middleName;
	/**
	 * Дата исходящего документа
	 */
	@Column(name = "ISSUE_DOC_DATE")
	@Temporal(javax.persistence.TemporalType.DATE)
	private Date issueDocDate;
	/**
	 * Номер исходящего документа
	 */
	@Column(name = "ISSUE_DOC_NUM")
	private String issueDocNum;
	/**
	 * Имя заявителя (для ФЛ)
	 */
	@Column(name = "FIRST_NAME")
	private String firstName;
	/**
	 * ФИО юридического лица (кто подписал исходящий документ)
	 */
	@Column(name = "FIO_JUR_PERSON")
	private String fioJurPerson;
	/**
	 * Телефон
	 */
	@Column(name = "PHONE")
	private String phone;
	/**
	 * Фамилия заявителя
	 */
	@Column(name = "LAST_NAME")
	private String lastName;
	/**
	 * Категория заявителя
	 */
	@Column(name = "APPLICANT_CATEGORY_ID")
	private Long applicantCategory;
	/**
	 * Тип заявителя
	 */
	@Column(name = "APPLICANT_TYPE_ID")
	private Long applicantType;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAppends() {
		return appends;
	}

	public void setAppends(String appends) {
		this.appends = appends;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public Integer getBirthYear() {
		return birthYear;
	}

	public void setBirthYear(Integer birthYear) {
		this.birthYear = birthYear;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getMiddleName() {
		return middleName;
	}

	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}

	public Date getIssueDocDate() {
		return issueDocDate;
	}

	public void setIssueDocDate(Date issueDocDate) {
		this.issueDocDate = issueDocDate;
	}

	public String getIssueDocNum() {
		return issueDocNum;
	}

	public void setIssueDocNum(String issueDocNum) {
		this.issueDocNum = issueDocNum;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getFioJurPerson() {
		return fioJurPerson;
	}

	public void setFioJurPerson(String fioJurPerson) {
		this.fioJurPerson = fioJurPerson;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Long getApplicantCategory() {
		return applicantCategory;
	}

	public void setApplicantCategory(Long applicantCategory) {
		this.applicantCategory = applicantCategory;
	}

	public Long getApplicantType() {
		return applicantType;
	}

	public void setApplicantType(Long applicantType) {
		this.applicantType = applicantType;
	}

}
/*
 CREATE TABLE "SIC"."QQ_APPLICANT"
 (
 "QUESTION_ID" NUMBER(19,0) NOT NULL ENABLE,
 "APPENDS" VARCHAR2(255 CHAR),
 "ADDRESS" VARCHAR2(255 CHAR),
 "ORGANIZATION" VARCHAR2(255 CHAR),
 "BIRTH_YEAR" NUMBER(4,0),
 "COUNTRY" VARCHAR2(255 CHAR),
 "MIDDLE_NAME" VARCHAR2(255 CHAR),
 "ISSUE_DOC_DATE" DATE,
 "ISSUE_DOC_NUM" VARCHAR2(255 CHAR),
 "FIRST_NAME" VARCHAR2(255 CHAR),
 "FIO_JUR_PERSON" VARCHAR2(255 CHAR),
 "PHONE" VARCHAR2(255 CHAR),
 "LAST_NAME" VARCHAR2(255 CHAR),
 "APPLICANT_CATEGORY_ID" NUMBER(19,0),
 "APPLICANT_TYPE_ID" NUMBER(19,0),
 PRIMARY KEY ("QUESTION_ID")
 USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
 STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
 TABLESPACE "SIC_DATA"  ENABLE,
 CONSTRAINT "FKD854F530CBC2602D" FOREIGN KEY ("APPLICANT_TYPE_ID")
 REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE,
 CONSTRAINT "FKD854F530F2F69269" FOREIGN KEY ("APPLICANT_CATEGORY_ID")
 REFERENCES "SIC"."DESCRIPTOR_VALUE" ("DESCRIPTOR_VALUE_ID") ENABLE,
 CONSTRAINT "QQ_APPLICANT_FK1" FOREIGN KEY ("QUESTION_ID")
 REFERENCES "SIC"."QQ_QUESTION" ("QUESTION_ID") ON DELETE CASCADE ENABLE
 ) SEGMENT CREATION IMMEDIATE
 PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
 STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
 PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
 TABLESPACE "SIC_DATA" ;

 */
