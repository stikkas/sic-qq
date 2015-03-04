package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

/**
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "ADM_GROUP")
public class AdmGroup implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "GROUP_ID", insertable = false, updatable = false)
	private Long id;

	@JoinTable(name = "ADM_USER_GROUP", joinColumns = {
		@JoinColumn(name = "GROUP_ID", referencedColumnName = "GROUP_ID")}, inverseJoinColumns = {
		@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID")})
	@ManyToMany
	private List<AdmUser> users;

	@ManyToMany(mappedBy = "groups")
	private List<AdmAccessRule> rules;

	public AdmGroup() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<AdmUser> getUsers() {
		return users;
	}

	public void addUser(AdmUser user) {
		if (!users.contains(user)){
			users.add(user);
			user.addGroup(this);
		}
	}

	public List<AdmAccessRule> getRules() {
		return rules;
	}

	public void addRule(AdmAccessRule rule) {
		if (!rules.contains(rule)) {
			rules.add(rule);
			rule.addGroup(this);
		}
	}

}
