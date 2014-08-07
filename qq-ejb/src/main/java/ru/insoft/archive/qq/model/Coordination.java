package ru.insoft.archive.qq.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Согласование документа
 * 
 * @author sorokin
 */
@Entity
@Table(name = "qq_coordintation")
public class Coordination implements HasId,JsonIn,JsonOut{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QQ_COORDINATION_ID_GEN")
	@SequenceGenerator(allocationSize = 1, sequenceName = "SEQ_QQ_COORDINATION", name = "QQ_COORDINATION_ID_GEN")
	@Column(name = "coordination_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "q_id")
	private Question q;

	@OneToOne
	@JoinColumn(name = "stage_id")
	private DescriptorValue stage;

	@Column(name = "stage_date")
	private Date stageDate;

	@Override
	public Long getId() {
		return id;
	}

////////--------------GENERATED CODE BELOW--------------------///////////////
	
	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public DescriptorValue getStage() {
		return stage;
	}

	public void setStage(DescriptorValue stage) {
		this.stage = stage;
	}

	public Date getStageDate() {
		return stageDate;
	}

	public void setStageDate(Date stageDate) {
		this.stageDate = stageDate;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

}
