package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "CORE_SUBSYSTEM")
@NamedQueries({
	@NamedQuery(name = "CoreSubsystem.findAll", query = "SELECT c FROM CoreSubsystem c")})
public class CoreSubsystem implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "SUBSYSTEM_NUMBER")
	private Long subsystemNumber;
	@Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 300)
    @Column(name = "SUBSYSTEM_NAME")
	private String subsystemName;
	@Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 30)
    @Column(name = "SUBSYSTEM_CODE")
	private String subsystemCode;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "subsystemNumber")
	private List<AdmAccessRule> admAccessRuleList;
	@OneToMany(mappedBy = "subsystemNumber")
	private List<DescriptorGroup> descriptorGroupList;

	public CoreSubsystem() {
	}

	public CoreSubsystem(Long subsystemNumber) {
		this.subsystemNumber = subsystemNumber;
	}

	public CoreSubsystem(Long subsystemNumber, String subsystemName, String subsystemCode) {
		this.subsystemNumber = subsystemNumber;
		this.subsystemName = subsystemName;
		this.subsystemCode = subsystemCode;
	}

	public Long getSubsystemNumber() {
		return subsystemNumber;
	}

	public void setSubsystemNumber(Long subsystemNumber) {
		this.subsystemNumber = subsystemNumber;
	}

	public String getSubsystemName() {
		return subsystemName;
	}

	public void setSubsystemName(String subsystemName) {
		this.subsystemName = subsystemName;
	}

	public String getSubsystemCode() {
		return subsystemCode;
	}

	public void setSubsystemCode(String subsystemCode) {
		this.subsystemCode = subsystemCode;
	}

	public List<AdmAccessRule> getAdmAccessRuleList() {
		return admAccessRuleList;
	}

	public void setAdmAccessRuleList(List<AdmAccessRule> admAccessRuleList) {
		this.admAccessRuleList = admAccessRuleList;
	}

	public List<DescriptorGroup> getDescriptorGroupList() {
		return descriptorGroupList;
	}

	public void setDescriptorGroupList(List<DescriptorGroup> descriptorGroupList) {
		this.descriptorGroupList = descriptorGroupList;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (subsystemNumber != null ? subsystemNumber.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof CoreSubsystem)) {
			return false;
		}
		CoreSubsystem other = (CoreSubsystem) object;
		if ((this.subsystemNumber == null && other.subsystemNumber != null) || (this.subsystemNumber != null && !this.subsystemNumber.equals(other.subsystemNumber))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.CoreSubsystem[ subsystemNumber=" + subsystemNumber + " ]";
	}

}
