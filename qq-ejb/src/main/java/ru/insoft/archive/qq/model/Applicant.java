package ru.insoft.archive.qq.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * @author sorokin
 */
@Entity
@Table(name = "qq_applicants")
public class Applicant implements HasId,JsonIn,JsonOut{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "APPLICANTS_ID_GEN")
	@SequenceGenerator(sequenceName = "SEQ_QQ_APPLICANTS", name = "APPLICANTS_ID_GEN", allocationSize = 1)
	@Column(name = "applicant_id")
	private Long id;

	@OneToOne
	@JoinColumn(name = "applicant_type_id")
	private DescriptorValue applicantType;

	@Column(name = "applicant_object")
	private String applicantObject;

	@Column(name = "name")
	private String name;

	@Column(name = "surname")
	private String surname;

	@Column(name = "father_name")
	private String fatherName;

	@Column(name = "birth_year")
	private Integer birthYear;

	@OneToOne
	@JoinColumn(name = "applicant_category_id")
	private DescriptorValue applicantCategory;

	@Column(name = "country")
	private String country;

	@Column(name = "address")
	private String address;

	@Column(name = "phone")
	private String phone;

	// Дополнительные сведения
	@Column(name = "inbox_doc_num")
	private String inboxDocNum;

	@Column(name = "inbox_doc_date")
	private Date inboxDocDate;

	@Column(name = "name_of_jur_person")
	private String nameOfJurPerson;

	@Column(name = "addendum")
	private String addendum;
	
	@OneToOne
	@JoinColumn(name="q_id",nullable=false)
	private Question q;

	@Override
	public Long getId() {
		return id;
	}

	
	public String getPhyzicalApplicantFio(){
		return this.surname+" "+this.name +" "+ this.fatherName;
	}
////////--------------GENERATED CODE BELOW--------------------///////////////
	
	public DescriptorValue getApplicantType() {
		return applicantType;
	}

	public void setApplicantType(DescriptorValue applicantType) {
		this.applicantType = applicantType;
	}

	public String getApplicantObject() {
		return applicantObject;
	}

	public void setApplicantObject(String applicantObject) {
		this.applicantObject = applicantObject;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public Integer getBirthYear() {
		return birthYear;
	}

	public void setBirthYear(Integer birthYear) {
		this.birthYear = birthYear;
	}

	public DescriptorValue getApplicantCategory() {
		return applicantCategory;
	}

	public void setApplicantCategory(DescriptorValue applicantCategory) {
		this.applicantCategory = applicantCategory;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getInboxDocNum() {
		return inboxDocNum;
	}

	public void setInboxDocNum(String inboxDocNum) {
		this.inboxDocNum = inboxDocNum;
	}

	public Date getInboxDocDate() {
		return inboxDocDate;
	}

	public void setInboxDocDate(Date inboxDocDate) {
		this.inboxDocDate = inboxDocDate;
	}

	public String getNameOfJurPerson() {
		return nameOfJurPerson;
	}

	public void setNameOfJurPerson(String nameOfJurPerson) {
		this.nameOfJurPerson = nameOfJurPerson;
	}

	public String getAddendum() {
		return addendum;
	}

	public void setAddendum(String addendum) {
		this.addendum = addendum;
	}

	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
	
	

}
