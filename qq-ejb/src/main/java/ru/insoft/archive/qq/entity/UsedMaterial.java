package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Данные по используемым материалам. Закладка "исполнение запроса".
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_USED_MATERIAL")

public class UsedMaterial implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "usedMatGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "usedMatGen", sequenceName = "SEQ_QQ_USED_MATERIAL",
		allocationSize = 1)
	@Column(name = "USED_MATERIAL_ID")
	private Long id;

	@Size(max = 255)
	@Column(name = "FOND_NUMBER")
	private String fondNumber;

	@Size(max = 255)
	@Column(name = "OPIS_NUMBER")
	private String opisNumber;

	@Size(max = 255)
	@Column(name = "SERIES_NUMBER")
	private String seriesNumber;

	@Size(max = 255)
	@Column(name = "STORAGE_UNIT_NUMBER")
	private String storageUnitNumber;

	@Size(max = 255)
	@Column(name = "REMARK")
	private String remark;

	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long question;

	public UsedMaterial() {
	}

	public UsedMaterial(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFondNumber() {
		return fondNumber;
	}

	public void setFondNumber(String fondNumber) {
		this.fondNumber = fondNumber;
	}

	public String getOpisNumber() {
		return opisNumber;
	}

	public void setOpisNumber(String opisNumber) {
		this.opisNumber = opisNumber;
	}

	public String getSeriesNumber() {
		return seriesNumber;
	}

	public void setSeriesNumber(String seriesNumber) {
		this.seriesNumber = seriesNumber;
	}

	public String getStorageUnitNumber() {
		return storageUnitNumber;
	}

	public void setStorageUnitNumber(String storageUnitNumber) {
		this.storageUnitNumber = storageUnitNumber;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Long getQuestion() {
		return question;
	}

	public void setQuestion(Long question) {
		this.question = question;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof UsedMaterial)) {
			return false;
		}
		UsedMaterial other = (UsedMaterial) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.UsedMaterial[ usedMaterialId=" + id + " ]";
	}

}
