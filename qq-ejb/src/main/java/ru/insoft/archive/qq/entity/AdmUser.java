package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "ADM_USER")
@NamedQueries({
	@NamedQuery(name = "AdmUser.userDataByLogin", query
			= "SELECT u.id, u.displayedName, e.departmentId FROM AdmUser u "
			+ "JOIN u.employee e WHERE lower(u.login) = lower(:login)"),
	@NamedQuery(name = "AdmUser.userRules", query
			= "SELECT r.ruleCode FROM AdmUser u JOIN u.groups g JOIN g.rules "
					+ "r WHERE lower(u.login) = lower(:login)")
})
public class AdmUser implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "USER_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "LOGIN", insertable = false, updatable = false)
	private String login;

	@Column(name = "DISPLAYED_NAME", insertable = false, updatable = false)
	private String displayedName;

	@ManyToMany(mappedBy = "users")
	private List<AdmGroup> groups;

	@OneToOne(mappedBy = "user")
	private AdmEmployee employee;

	public AdmUser() {
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getDisplayedName() {
		return displayedName;
	}

	public void setDisplayedName(String displayedName) {
		this.displayedName = displayedName;
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
			group.addUser(this);
		}
	}

	public AdmEmployee getEmployee() {
		return employee;
	}

	public void setEmployee(AdmEmployee employee) {
		this.employee = employee;
	}

}
