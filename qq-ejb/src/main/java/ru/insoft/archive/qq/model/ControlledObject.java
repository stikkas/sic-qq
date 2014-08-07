package ru.insoft.archive.qq.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import ru.insoft.archive.core_model.table.adm.AdmUser;

@MappedSuperclass
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
public class ControlledObject {

	@ManyToOne(optional=false)
	@JoinColumn(name="insert_user_id")
	private AdmUser insertUser;
	
	@ManyToOne(optional=false)
	@JoinColumn(name="update_user_id")
	private AdmUser updateUser;
	
	@Column(name="update_date",nullable = false)
	private Date upDate;
	
	@Column(name="insert_date",nullable = false)
	private Date insDate;

	public AdmUser getInsertUser() {
		return insertUser;
	}

	public void setInsertUser(AdmUser insertUser) {
		this.insertUser = insertUser;
	}

	public AdmUser getUpdateUser() {
		return updateUser;
	}

	public void setUpdateUser(AdmUser updateUser) {
		this.updateUser = updateUser;
	}

	public Date getUpDate() {
		return upDate;
	}

	public void setUpDate(Date upDate) {
		this.upDate = upDate;
	}

	public Date getInsDate() {
		return insDate;
	}

	public void setInsDate(Date insDate) {
		this.insDate = insDate;
	}
	
	
	
}
