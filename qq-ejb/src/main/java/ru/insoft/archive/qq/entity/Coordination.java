package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_COORDINATION")
@NamedQueries({
	@NamedQuery(name = "Coordination.findAll", query = "SELECT c FROM Coordination c"),
	@NamedQuery(name = "Coordination.findById", query = "SELECT c FROM Coordination c WHERE c.id = :id"),
	@NamedQuery(name = "Coordination.findByStageDate", query = "SELECT c FROM Coordination c WHERE c.stageDate = :stageDate")})
public class Coordination implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "coordinationGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "coordinationGen", sequenceName = "SEQ_QQ_COORDINATION",
		allocationSize = 1)
	@Column(name = "COORDINATION_ID")
	private Long id;

	@Column(name = "STAGE_ID")
	private Long stage;

	@Column(name = "STAGE_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date stageDate;

	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long question;
	/*
	 @JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	 @ManyToOne(fetch = FetchType.LAZY)
	 private Question question;
	 */

	public Coordination() {
	}

	public Coordination(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getStage() {
		return stage;
	}

	public void setStage(Long stage) {
		this.stage = stage;
	}

	public Date getStageDate() {
		return stageDate;
	}

	public void setStageDate(Date stageDate) {
		this.stageDate = stageDate;
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
		if (!(object instanceof Coordination)) {
			return false;
		}
		Coordination other = (Coordination) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Coordination[ coordinationId=" + id + " ]";
	}

}
