package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * Сущность группы справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "DESCRIPTOR_GROUP")
@NamedQueries({
	@NamedQuery(name = "DescriptorGroup.idByCode",
			query = "SELECT g.id FROM DescriptorGroup g WHERE g.groupCode = :code")
})
public class DescriptorGroup implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "DESCRIPTOR_GROUP_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "GROUP_CODE", insertable = false, updatable = false)
	private String groupCode;

	@Column(name = "ALPHABETIC_SORT", insertable = false, updatable = false)
	private short alphabeticSort;
	/*
	 @OneToMany(mappedBy = "group")
	 private List<DescriptorValue> values;
	 */

	public DescriptorGroup() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getGroupCode() {
		return groupCode;
	}

	public void setGroupCode(String groupCode) {
		this.groupCode = groupCode;
	}

	/*
	 public List<DescriptorValue> getValues() {
	 return values;
	 }

	 public void addValue(DescriptorValue value) {
	 if (!values.contains(value)) {
	 values.add(value);
	 DescriptorGroup group = value.getGroup();
	 if (group != this) {
	 if (group != null) {
	 group.values.remove(value);
	 }
	 value.setGroup(this);
	 }
	 }
	 }
	 */
	public short getAlphabeticSort() {
		return alphabeticSort;
	}

	public void setAlphabeticSort(short alphabeticSort) {
		this.alphabeticSort = alphabeticSort;
	}

}
