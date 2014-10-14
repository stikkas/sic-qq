package ru.insoft.archive.qq.webmodel;

import java.util.Date;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.core_model.view.desc.VDescAttrValue;
import ru.insoft.archive.qq.entity.Applicant;
import ru.insoft.archive.qq.entity.Question;

public class QuestionInfoItem {

	public QuestionInfoItem(Question q) {
		id = q.getId();

		DescriptorValue createOrg = q.getLiteraValue();
		if (createOrg != null) {
			for (VDescAttrValue a : createOrg.getAttrValues()) {
				if ("MEMBER_LETTER".equals(a.getCode())) {
					litera = a.getAttrValue();
				}
			}
		}
		inboxDocNum = String.valueOf(q.getPrefixNum()) + "/" + String.valueOf(q.getSufixNum());
		regDate = q.getRegDate();

		Applicant a = q.getApplicant();
		if (a != null) {
			DescriptorValue applicantType = a.getApplicantTypeValue();
			if (applicantType != null) {
				switch (applicantType.getCode()) {
					case "Q_VALUE_APP_TYPE_FFACE":
						String name = a.getLastName();
						if (name != null) {
							fioOrg += name + " ";
						}
						name = a.getFirstName();
						if (name != null) {
							fioOrg += name + " ";
						}
						name = a.getMiddleName();
						if (name != null) {
							fioOrg += name;
						}
						break;
					case "Q_VALUE_APP_TYPE_JURFACE":
						fioOrg = a.getOrganization();
						break;
					default:
						break;
				}
			}
		}
	}

	protected Long id;

	private String fioOrg = "";

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
