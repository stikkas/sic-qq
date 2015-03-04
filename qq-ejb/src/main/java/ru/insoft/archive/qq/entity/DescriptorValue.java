package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "DESCRIPTOR_VALUE")
@NamedQueries({
	@NamedQuery(name = "DescriptorValue.findAll", query = "SELECT d FROM DescriptorValue d")})
public class DescriptorValue implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "DESCRIPTOR_VALUE_ID")
	private Long descriptorValueId;
	@Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 4000)
    @Column(name = "FULL_VALUE")
	private String fullValue;
	@Size(max = 250)
    @Column(name = "SHORT_VALUE")
	private String shortValue;
	@Size(max = 30)
    @Column(name = "VALUE_CODE")
	private String valueCode;
	@Basic(optional = false)
    @NotNull
    @Column(name = "SORT_ORDER")
	private long sortOrder;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "userTypeId")
	private List<AdmUser> admUserList;
	@OneToMany(mappedBy = "parentValueId")
	private List<DescriptorValue> descriptorValueList;
	@JoinColumn(name = "PARENT_VALUE_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID")
    @ManyToOne
	private DescriptorValue parentValueId;
	@JoinColumn(name = "DESCRIPTOR_GROUP_ID", referencedColumnName = "DESCRIPTOR_GROUP_ID")
    @ManyToOne(optional = false)
	private DescriptorGroup descriptorGroupId;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "departmentId")
	private List<AdmEmployee> admEmployeeList;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "positionId")
	private List<AdmEmployee> admEmployeeList1;

	public DescriptorValue() {
	}

	public DescriptorValue(Long descriptorValueId) {
		this.descriptorValueId = descriptorValueId;
	}

	public DescriptorValue(Long descriptorValueId, String fullValue, long sortOrder) {
		this.descriptorValueId = descriptorValueId;
		this.fullValue = fullValue;
		this.sortOrder = sortOrder;
	}

	public Long getDescriptorValueId() {
		return descriptorValueId;
	}

	public void setDescriptorValueId(Long descriptorValueId) {
		this.descriptorValueId = descriptorValueId;
	}

	public String getFullValue() {
		return fullValue;
	}

	public void setFullValue(String fullValue) {
		this.fullValue = fullValue;
	}

	public String getShortValue() {
		return shortValue;
	}

	public void setShortValue(String shortValue) {
		this.shortValue = shortValue;
	}

	public String getValueCode() {
		return valueCode;
	}

	public void setValueCode(String valueCode) {
		this.valueCode = valueCode;
	}

	public long getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(long sortOrder) {
		this.sortOrder = sortOrder;
	}

	public List<AdmUser> getAdmUserList() {
		return admUserList;
	}

	public void setAdmUserList(List<AdmUser> admUserList) {
		this.admUserList = admUserList;
	}

	public List<DescriptorValue> getDescriptorValueList() {
		return descriptorValueList;
	}

	public void setDescriptorValueList(List<DescriptorValue> descriptorValueList) {
		this.descriptorValueList = descriptorValueList;
	}

	public DescriptorValue getParentValueId() {
		return parentValueId;
	}

	public void setParentValueId(DescriptorValue parentValueId) {
		this.parentValueId = parentValueId;
	}

	public DescriptorGroup getDescriptorGroupId() {
		return descriptorGroupId;
	}

	public void setDescriptorGroupId(DescriptorGroup descriptorGroupId) {
		this.descriptorGroupId = descriptorGroupId;
	}

	public List<AdmEmployee> getAdmEmployeeList() {
		return admEmployeeList;
	}

	public void setAdmEmployeeList(List<AdmEmployee> admEmployeeList) {
		this.admEmployeeList = admEmployeeList;
	}

	public List<AdmEmployee> getAdmEmployeeList1() {
		return admEmployeeList1;
	}

	public void setAdmEmployeeList1(List<AdmEmployee> admEmployeeList1) {
		this.admEmployeeList1 = admEmployeeList1;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (descriptorValueId != null ? descriptorValueId.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof DescriptorValue)) {
			return false;
		}
		DescriptorValue other = (DescriptorValue) object;
		if ((this.descriptorValueId == null && other.descriptorValueId != null) || (this.descriptorValueId != null && !this.descriptorValueId.equals(other.descriptorValueId))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.DescriptorValue[ descriptorValueId=" + descriptorValueId + " ]";
	}

}
