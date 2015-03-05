package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "ADM_ACCESS_RULE")
@NamedQueries({@NamedQuery(name = "AdmAccessRule.usersWithRule", query = 
		"SELECT NEW ru.insoft.archive.qq.dto.DictDto(u.id, u.displayedName)"
				+ " FROM AdmAccessRule r JOIN r.groups g JOIN g.users u WHERE r.ruleCode = :code")})
public class AdmAccessRule implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "ACCESS_RULE_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "RULE_CODE", insertable = false, updatable = false)
	private String ruleCode;

	@JoinTable(name = "ADM_GROUP_RULE", joinColumns = {
		@JoinColumn(name = "ACCESS_RULE_ID", referencedColumnName = "ACCESS_RULE_ID")}, inverseJoinColumns = {
		@JoinColumn(name = "GROUP_ID", referencedColumnName = "GROUP_ID")})
	@ManyToMany
	private List<AdmGroup> groups;

	public AdmAccessRule() {
	}

	public String getRuleCode() {
		return ruleCode;
	}

	public void setRuleCode(String ruleCode) {
		this.ruleCode = ruleCode;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<AdmGroup> getGroups() {
		return groups;
	}

	public void addGroup(AdmGroup group) {
		if (!groups.contains(group)) {
			groups.add(group);
			group.addRule(this);
		}
	}

}
