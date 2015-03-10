package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "ADM_EMPLOYEE")
public class AdmEmployee implements Serializable {

	private static final long serialVersionUID = 1L;
	/**
	 * Идентификатор работника
	 */
	@Id
	@Column(name = "EMPLOYEE_ID", insertable = false, updatable = false)
	private Long employeeId;

	/**
	 * Идентификатор организации работника
	 */
	@Column(name = "DEPARTMENT_ID", insertable = false, updatable = false)
	private Long departmentId;

	/**
	 * Идентификатор пользователя системы
	 */
	@JoinColumn(name = "USER_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
	@OneToOne
	private AdmUser user;

	public Long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	public AdmUser getUser() {
		return user;
	}

	public void setUser(AdmUser user) {
		this.user = user;
	}

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

}
