package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Данные по используемым материалам. Закладка "исполнение запроса".
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_USED_MATERIAL")
@NamedQueries({
	@NamedQuery(name = "UsedMaterial.findAll", query = "SELECT u FROM UsedMaterial u"),
	@NamedQuery(name = "UsedMaterial.findById", query = "SELECT u FROM UsedMaterial u WHERE u.id = :id"),
	@NamedQuery(name = "UsedMaterial.findByFondNumber", query = "SELECT u FROM UsedMaterial u WHERE u.fondNumber = :fondNumber"),
	@NamedQuery(name = "UsedMaterial.findByOpisNumber", query = "SELECT u FROM UsedMaterial u WHERE u.opisNumber = :opisNumber"),
	@NamedQuery(name = "UsedMaterial.findBySeriesNumber", query = "SELECT u FROM UsedMaterial u WHERE u.seriesNumber = :seriesNumber"),
	@NamedQuery(name = "UsedMaterial.findByStorageUnitNumber", query = "SELECT u FROM UsedMaterial u WHERE u.storageUnitNumber = :storageUnitNumber"),
	@NamedQuery(name = "UsedMaterial.findByRemark", query = "SELECT u FROM UsedMaterial u WHERE u.remark = :remark")})
public class UsedMaterial implements Serializable, HasId, JsonIn, JsonOut {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
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

	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

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

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
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
