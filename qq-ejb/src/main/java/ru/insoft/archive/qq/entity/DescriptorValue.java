package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Сущность справочника
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_VALUE")
@NamedQueries({
	@NamedQuery(name = "DescriptorValue.fullShortValues",
			query = "SELECT NEW ru.insoft.archive.qq.dto.DictSVDto(d.id, d.fullValue, d.shortValue) "
			+ "from DescriptorValue d JOIN d.group g WHERE d.groupId = :groupId "
			+ "ORDER BY CASE WHEN g.alphabeticSort != 0 THEN d.fullValue "
			+ "ELSE CONCAT(d.sortOrder,'') END"),
	@NamedQuery(name = "DescriptorValue.fullShortCodeValues",
			query = "SELECT NEW ru.insoft.archive.qq.dto.DictSCVDto(d.id, d.fullValue, d.shortValue, d.valueCode) "
			+ "from DescriptorValue d JOIN d.group g WHERE d.groupId = :groupId "
			+ "ORDER BY CASE WHEN g.alphabeticSort != 0 THEN d.fullValue "
			+ "ELSE CONCAT(d.sortOrder,'') END"),
	@NamedQuery(name = "DescriptorValue.fullValue",
			query = "SELECT NEW ru.insoft.archive.qq.dto.DictDto(d.id, d.fullValue) "
			+ "from DescriptorValue d JOIN d.group g WHERE d.groupId = :groupId "
			+ "ORDER BY CASE WHEN g.alphabeticSort != 0 THEN d.fullValue "
			+ "ELSE CONCAT(d.sortOrder,'') END"),
	@NamedQuery(name = "DescriptorValue.literasArchive",
			query = "SELECT NEW ru.insoft.archive.qq.dto.DictSVDto(d.id, d.fullValue, d.shortValue) "
			+ "FROM DescriptorValue d JOIN d.group g WHERE d.id in (:sic, :archive) "
			+ "ORDER BY CASE WHEN g.alphabeticSort != 0 THEN d.fullValue "
			+ "ELSE CONCAT(d.sortOrder,'') END"),
	@NamedQuery(name = "DescriptorValue.fullCodeValue",
			query = "SELECT NEW ru.insoft.archive.qq.dto.DictSVDto(d.id, d.fullValue, d.valueCode) "
			+ "FROM DescriptorValue d JOIN d.group g WHERE d.groupId = :groupId "
			+ "ORDER BY CASE WHEN g.alphabeticSort != 0 THEN d.fullValue "
			+ "ELSE CONCAT(d.sortOrder,'') END"),
	@NamedQuery(name = "DescriptorValue.idsByCodes",
			query = "SELECT d.valueCode, d.id FROM DescriptorValue d WHERE d.valueCode in :codes")
})
public class DescriptorValue implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "DESCRIPTOR_VALUE_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "FULL_VALUE", insertable = false, updatable = false)
	private String fullValue;

	@Column(name = "SHORT_VALUE", insertable = false, updatable = false)
	private String shortValue;

	@Column(name = "VALUE_CODE", insertable = false, updatable = false)
	private String valueCode;

	@Column(name = "SORT_ORDER", insertable = false, updatable = false)
	private Integer sortOrder;

	@Column(name = "DESCRIPTOR_GROUP_ID", insertable = false, updatable = false)
	private Long groupId;

	@OneToMany(mappedBy = "parent")
	private List<DescriptorValue> children;

	@JoinColumn(name = "PARENT_VALUE_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue parent;

	@JoinColumn(name = "DESCRIPTOR_GROUP_ID", referencedColumnName = "DESCRIPTOR_GROUP_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorGroup group;

	public DescriptorValue() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<DescriptorValue> getChildren() {
		return children;
	}

	public void addChild(DescriptorValue child) {
		if (!children.contains(child)) {
			children.add(child);
			DescriptorValue parent = child.getParent();
			if (parent != this) {
				if (parent != null) {
					parent.children.remove(child);
				}
				child.setParent(this);
			}
		}
	}

	public DescriptorValue getParent() {
		return parent;
	}

	public void setParent(DescriptorValue parent) {
		this.parent = parent;
	}
	/*
	 public DescriptorGroup getGroup() {
	 return group;
	 }

	 public void setGroup(DescriptorGroup group) {
	 this.group = group;
	 }
	 */

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

	public Integer getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(Integer sortOrder) {
		this.sortOrder = sortOrder;
	}

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public DescriptorGroup getGroup() {
		return group;
	}

	public void setGroup(DescriptorGroup group) {
		this.group = group;
	}

}
