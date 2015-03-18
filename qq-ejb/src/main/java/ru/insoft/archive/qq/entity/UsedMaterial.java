package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Данные по используемым материалам. Закладка "исполнение запроса".
 *
 * @author С. Благодатских
 */
@NamedQueries({
	@NamedQuery(name = "UsedMaterial.materialByQid",
			query = "SELECT m FROM UsedMaterial m WHERE m.qid = :id"),
	@NamedQuery(name = "UsedMaterial.delMaterialByQid",
			query = "DELETE FROM UsedMaterial m WHERE m.qid = :id"),
	@NamedQuery(name = "UsedMaterial.delMaterialByIds",
			query = "DELETE FROM UsedMaterial m WHERE m.id in :ids")
})
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

	@Column(name = "FOND_NUMBER")
	private String fondNum;

	@Column(name = "OPIS_NUMBER")
	private String opisNum;

	@Column(name = "SERIES_NUMBER")
	private String seriesNum;

	@Column(name = "STORAGE_UNIT_NUMBER")
	private String storeUnitNum;

	@Column(name = "REMARK")
	private String remark;

	@JsonIgnore
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long qid;

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

	public String getFondNum() {
		return fondNum;
	}

	public void setFondNum(String fondNum) {
		this.fondNum = fondNum;
	}

	public String getOpisNum() {
		return opisNum;
	}

	public void setOpisNum(String opisNum) {
		this.opisNum = opisNum;
	}

	public String getSeriesNum() {
		return seriesNum;
	}

	public void setSeriesNum(String seriesNum) {
		this.seriesNum = seriesNum;
	}

	public String getStoreUnitNum() {
		return storeUnitNum;
	}

	public void setStoreUnitNum(String storeUnitNum) {
		this.storeUnitNum = storeUnitNum;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Long getQid() {
		return qid;
	}

	public void setQid(Long qid) {
		this.qid = qid;
	}


	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
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
