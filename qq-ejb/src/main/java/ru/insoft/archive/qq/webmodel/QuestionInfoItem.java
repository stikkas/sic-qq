package ru.insoft.archive.qq.webmodel;

import java.util.Date;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.core_model.view.desc.VDescAttrValue;
import ru.insoft.archive.qq.model.Applicant;
import ru.insoft.archive.qq.model.Question;

public class QuestionInfoItem {

	
	
	public QuestionInfoItem(Question q){
		this.id = q.getId();
		
		DescriptorValue createOrg = q.getLitera();
		if (createOrg != null) {
			for (VDescAttrValue a : createOrg.getAttrValues()) {
				if ("MEMBER_LETTER".equals(a.getCode())) {
					this.litera = a.getAttrValue();
				}
			}
		}
		this.inboxDocNum = q.getInboxNum();
		this.regDate = q.getRegDate();
		
		
		
		Applicant a = q.getApplicant();
		if (a != null) {
			String r = "";
			DescriptorValue applicantType = a.getApplicantType();
			switch (applicantType.getCode()) {
			case "Q_VALUE_APP_TYPE_FFACE":
				if (a.getSurname() != null) {
					r += a.getSurname();
					r += " ";
				}
				if (a.getName() != null) {
					r += a.getName();
					r += " ";
				}
				if (a.getFatherName() != null) {
					r += a.getFatherName();
					r += " ";
				}
				break;
			case "Q_VALUE_APP_TYPE_JURFACE":
				r = a.getApplicantObject();
				break;
			default:
				break;
			}
			this.fioOrg = r;

		}
	}
	
	
	protected Long id;
	
	private String fioOrg;
	
	protected String litera;
	
	protected String inboxDocNum;
	
	protected Date regDate;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLitera() {
		return litera;
	}

	public void setLitera(String litera) {
		this.litera = litera;
	}

	public String getInboxDocNum() {
		return inboxDocNum;
	}

	public void setInboxDocNum(String inboxDocNum) {
		this.inboxDocNum = inboxDocNum;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public String getFioOrg() {
		return fioOrg;
	}

	public void setFioOrg(String fioOrg) {
		this.fioOrg = fioOrg;
	}
	
	
	
	
	
}
