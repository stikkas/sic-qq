package ru.insoft.archive.qq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 *
 * @author sorokin
 */
@Entity
@Table(name = "qq_used_material")
public class UsedMaterial implements HasId,JsonIn,JsonOut{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator="USED_MATERIAL_IDGEN")
    @SequenceGenerator(allocationSize=1,sequenceName="SEQ_QQ_USED_MATERIAL",name="USED_MATERIAL_IDGEN")
    @Column(name = "used_material_id")
    private Long id;

    @Column(name = "fund_num")
    private String fundNum;

    @Column(name = "series_num")
    private String seriesNum;

    @Column(name = "storage_unit_num")
    private String storageUnitNum;

	@Column(name = "list_num")
    private String listNum;
    
    @OneToOne
    @JoinColumn(name = "q_id",nullable=false)
    private Question q;
////////--------------GENERATED CODE BELOW--------------------///////////////
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFundNum() {
		return fundNum;
	}

	public void setFundNum(String fundNum) {
		this.fundNum = fundNum;
	}

	public String getSeriesNum() {
		return seriesNum;
	}

	public void setSeriesNum(String seriesNum) {
		this.seriesNum = seriesNum;
	}

	public String getStorageUnitNum() {
		return storageUnitNum;
	}

	public void setStorageUnitNum(String storageUnitNum) {
		this.storageUnitNum = storageUnitNum;
	}

	public String getListNum() {
		return listNum;
	}

	public void setListNum(String listNum) {
		this.listNum = listNum;
	}

	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}
    
    
    
    

}
