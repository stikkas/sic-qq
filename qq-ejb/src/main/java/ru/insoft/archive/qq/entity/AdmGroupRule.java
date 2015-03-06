package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Table(name = "ADM_GROUP_RULE")
@Entity
@IdClass(AdmGroupRuleId.class)
public class AdmGroupRule implements Serializable {

	@Id
	@Column(name = "GROUP_ID", insertable = false, updatable = false)
	private Long groupId;

	@Id
	@Column(name = "ACCESS_RULE_ID", insertable = false, updatable = false)
	private Long ruleId;

	@JoinColumn(name = "GROUP_ID", referencedColumnName = "GROUP_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private AdmGroup group;

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public Long getRuleId() {
		return ruleId;
	}

	public void setRuleId(Long ruleId) {
		this.ruleId = ruleId;
	}

	public AdmGroup getGroup() {
		return group;
	}

	public void setGroup(AdmGroup group) {
		this.group = group;
	}

}
