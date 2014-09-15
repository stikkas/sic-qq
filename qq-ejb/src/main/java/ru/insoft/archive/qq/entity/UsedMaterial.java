/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.math.BigDecimal;
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

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_USED_MATERIAL")
@NamedQueries({
	@NamedQuery(name = "UsedMaterial.findAll", query = "SELECT u FROM UsedMaterial u"),
	@NamedQuery(name = "UsedMaterial.findByUsedMaterialId", query = "SELECT u FROM UsedMaterial u WHERE u.usedMaterialId = :usedMaterialId"),
	@NamedQuery(name = "UsedMaterial.findByFondNumber", query = "SELECT u FROM UsedMaterial u WHERE u.fondNumber = :fondNumber"),
	@NamedQuery(name = "UsedMaterial.findByOpisNumber", query = "SELECT u FROM UsedMaterial u WHERE u.opisNumber = :opisNumber"),
	@NamedQuery(name = "UsedMaterial.findBySeriesNumber", query = "SELECT u FROM UsedMaterial u WHERE u.seriesNumber = :seriesNumber"),
	@NamedQuery(name = "UsedMaterial.findByStorageUnitNumber", query = "SELECT u FROM UsedMaterial u WHERE u.storageUnitNumber = :storageUnitNumber"),
	@NamedQuery(name = "UsedMaterial.findByRemark", query = "SELECT u FROM UsedMaterial u WHERE u.remark = :remark")})
public class UsedMaterial implements Serializable {
	private static final long serialVersionUID = 1L;
	// @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
	@Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "USED_MATERIAL_ID")
	private BigDecimal usedMaterialId;
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
	private Question questionId;

	public UsedMaterial() {
	}

	public UsedMaterial(BigDecimal usedMaterialId) {
		this.usedMaterialId = usedMaterialId;
	}

	public BigDecimal getUsedMaterialId() {
		return usedMaterialId;
	}

	public void setUsedMaterialId(BigDecimal usedMaterialId) {
		this.usedMaterialId = usedMaterialId;
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

	public Question getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Question questionId) {
		this.questionId = questionId;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (usedMaterialId != null ? usedMaterialId.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are not set
		if (!(object instanceof UsedMaterial)) {
			return false;
		}
		UsedMaterial other = (UsedMaterial) object;
		if ((this.usedMaterialId == null && other.usedMaterialId != null) || (this.usedMaterialId != null && !this.usedMaterialId.equals(other.usedMaterialId))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.UsedMaterial[ usedMaterialId=" + usedMaterialId + " ]";
	}

}
