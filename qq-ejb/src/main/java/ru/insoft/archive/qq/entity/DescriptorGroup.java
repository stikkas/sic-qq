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
@Table(name = "DESCRIPTOR_GROUP")
@NamedQueries({
	@NamedQuery(name = "DescriptorGroup.findAll", query = "SELECT d FROM DescriptorGroup d")})
public class DescriptorGroup implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "DESCRIPTOR_GROUP_ID")
	private Long descriptorGroupId;
	@Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 300)
    @Column(name = "GROUP_NAME")
	private String groupName;
	@Size(max = 30)
    @Column(name = "GROUP_CODE")
	private String groupCode;
	@Basic(optional = false)
    @NotNull
    @Column(name = "SORT_ORDER")
	private int sortOrder;
	@Basic(optional = false)
    @NotNull
    @Column(name = "IS_SYSTEM")
	private short isSystem;
	@Basic(optional = false)
    @NotNull
    @Column(name = "IS_HIERARCHICAL")
	private short isHierarchical;
	@Basic(optional = false)
    @NotNull
    @Column(name = "SHORT_VALUE_SUPPORTED")
	private short shortValueSupported;
	@Basic(optional = false)
    @NotNull
    @Column(name = "ALPHABETIC_SORT")
	private short alphabeticSort;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "descriptorGroupId")
	private List<DescriptorValue> descriptorValueList;
	@JoinColumn(name = "SUBSYSTEM_NUMBER", referencedColumnName = "SUBSYSTEM_NUMBER")
    @ManyToOne
	private CoreSubsystem subsystemNumber;

	public DescriptorGroup() {
	}

	public DescriptorGroup(Long descriptorGroupId) {
		this.descriptorGroupId = descriptorGroupId;
	}

	public DescriptorGroup(Long descriptorGroupId, String groupName, int sortOrder, short isSystem, short isHierarchical, short shortValueSupported, short alphabeticSort) {
		this.descriptorGroupId = descriptorGroupId;
		this.groupName = groupName;
		this.sortOrder = sortOrder;
		this.isSystem = isSystem;
		this.isHierarchical = isHierarchical;
		this.shortValueSupported = shortValueSupported;
		this.alphabeticSort = alphabeticSort;
	}

	public Long getDescriptorGroupId() {
		return descriptorGroupId;
	}

	public void setDescriptorGroupId(Long descriptorGroupId) {
		this.descriptorGroupId = descriptorGroupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	public int getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}

	public short getIsSystem() {
		return isSystem;
	}

	public void setIsSystem(short isSystem) {
		this.isSystem = isSystem;
	}

	public short getIsHierarchical() {
		return isHierarchical;
	}

	public void setIsHierarchical(short isHierarchical) {
		this.isHierarchical = isHierarchical;
	}

	public short getShortValueSupported() {
		return shortValueSupported;
	}

	public void setShortValueSupported(short shortValueSupported) {
		this.shortValueSupported = shortValueSupported;
	}

	public short getAlphabeticSort() {
		return alphabeticSort;
	}

	public void setAlphabeticSort(short alphabeticSort) {
		this.alphabeticSort = alphabeticSort;
	}

	public List<DescriptorValue> getDescriptorValueList() {
		return descriptorValueList;
	}

	public void setDescriptorValueList(List<DescriptorValue> descriptorValueList) {
		this.descriptorValueList = descriptorValueList;
	}

	public CoreSubsystem getSubsystemNumber() {
		return subsystemNumber;
	}

	public void setSubsystemNumber(CoreSubsystem subsystemNumber) {
		this.subsystemNumber = subsystemNumber;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (descriptorGroupId != null ? descriptorGroupId.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof DescriptorGroup)) {
			return false;
		}
		DescriptorGroup other = (DescriptorGroup) object;
		if ((this.descriptorGroupId == null && other.descriptorGroupId != null) || (this.descriptorGroupId != null && !this.descriptorGroupId.equals(other.descriptorGroupId))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.DescriptorGroup[ descriptorGroupId=" + descriptorGroupId + " ]";
	}

}
