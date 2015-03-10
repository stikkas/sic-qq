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
	@NamedQuery(name = "DescriptorGroup.idsByCodes",
			query = "SELECT g.groupCode, g.id FROM DescriptorGroup g WHERE g.groupCode in :codes")
})
public class DescriptorGroup implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "DESCRIPTOR_GROUP_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "GROUP_CODE", insertable = false, updatable = false)
	private String groupCode;

	@Column(name = "ALPHABETIC_SORT", insertable = false, updatable = false)
	private Short alphabeticSort;

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

	public Short getAlphabeticSort() {
		return alphabeticSort;
	}

	public void setAlphabeticSort(Short alphabeticSort) {
		this.alphabeticSort = alphabeticSort;
	}

}
