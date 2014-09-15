package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Данные по заявителю
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_APPLICANT")
@NamedQueries({
	@NamedQuery(name = "Applicant.findAll", query = "SELECT a FROM Applicant a"),
	@NamedQuery(name = "Applicant.findById", query = "SELECT a FROM Applicant a WHERE a.id = :id"),
	@NamedQuery(name = "Applicant.findByAppends", query = "SELECT a FROM Applicant a WHERE a.appends = :appends"),
	@NamedQuery(name = "Applicant.findByAddress", query = "SELECT a FROM Applicant a WHERE a.address = :address"),
	@NamedQuery(name = "Applicant.findByOrganization", query = "SELECT a FROM Applicant a WHERE a.organization = :organization"),
	@NamedQuery(name = "Applicant.findByBirthYear", query = "SELECT a FROM Applicant a WHERE a.birthYear = :birthYear"),
	@NamedQuery(name = "Applicant.findByCountry", query = "SELECT a FROM Applicant a WHERE a.country = :country"),
	@NamedQuery(name = "Applicant.findByMiddleName", query = "SELECT a FROM Applicant a WHERE a.middleName = :middleName"),
	@NamedQuery(name = "Applicant.findByIssueDocDate", query = "SELECT a FROM Applicant a WHERE a.issueDocDate = :issueDocDate"),
	@NamedQuery(name = "Applicant.findByIssueDocNum", query = "SELECT a FROM Applicant a WHERE a.issueDocNum = :issueDocNum"),
	@NamedQuery(name = "Applicant.findByFirstName", query = "SELECT a FROM Applicant a WHERE a.firstName = :firstName"),
	@NamedQuery(name = "Applicant.findByFioJurPerson", query = "SELECT a FROM Applicant a WHERE a.fioJurPerson = :fioJurPerson"),
	@NamedQuery(name = "Applicant.findByPhone", query = "SELECT a FROM Applicant a WHERE a.phone = :phone"),
	@NamedQuery(name = "Applicant.findByLastName", query = "SELECT a FROM Applicant a WHERE a.lastName = :lastName")})
public class Applicant implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long id;

	@Column(name = "APPLICANT_CATEGORY_ID")
	private Long applicantCategory;

	@Column(name = "APPLICANT_TYPE_ID")
	private Long applicantType;

	@Size(max = 255)
	@Column(name = "APPENDS")
	private String appends;

	@Size(max = 255)
	@Column(name = "ADDRESS")
	private String address;

	@Size(max = 255)
	@Column(name = "ORGANIZATION")
	private String organization;

	@Column(name = "BIRTH_YEAR")
	private Short birthYear;

	@Size(max = 255)
	@Column(name = "COUNTRY")
	private String country;

	@Size(max = 255)
	@Column(name = "MIDDLE_NAME")
	private String middleName;

	@Column(name = "ISSUE_DOC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date issueDocDate;

	@Size(max = 255)
	@Column(name = "ISSUE_DOC_NUM")
	private String issueDocNum;

	@Size(max = 255)
	@Column(name = "FIRST_NAME")
	private String firstName;

	@Size(max = 255)
	@Column(name = "FIO_JUR_PERSON")
	private String fioJurPerson;

	@Size(max = 255)
	@Column(name = "PHONE")
	private String phone;

	@Size(max = 255)
	@Column(name = "LAST_NAME")
	private String lastName;

	@JoinColumn(name = "QUESTION_ID",
		referencedColumnName = "QUESTION_ID", insertable = false, updatable = false)
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public Applicant() {
	}

	public Applicant(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Short getBirthYear() {
		return birthYear;
	}

	public void setBirthYear(Short birthYear) {
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

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof Applicant)) {
			return false;
		}
		Applicant other = (Applicant) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Applicant[ questionId=" + id + " ]";
	}

}
