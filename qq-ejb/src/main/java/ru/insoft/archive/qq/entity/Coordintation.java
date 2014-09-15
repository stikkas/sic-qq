package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_COORDINTATION")
@NamedQueries({
	@NamedQuery(name = "Coordintation.findAll", query = "SELECT c FROM Coordintation c"),
	@NamedQuery(name = "Coordintation.findById", query = "SELECT c FROM Coordintation c WHERE c.id = :id"),
	@NamedQuery(name = "Coordintation.findByStageDate", query = "SELECT c FROM Coordintation c WHERE c.stageDate = :stageDate")})
public class Coordintation implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "COORDINATION_ID")
	private Long id;

	@Column(name = "STAGE_ID")
	private Long stage;

	@Column(name = "STAGE_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date stageDate;

	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	@ManyToOne(fetch = FetchType.LAZY)
	private Question question;

	public Coordintation() {
	}

	public Coordintation(Long id) {
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
		if (!(object instanceof Coordintation)) {
			return false;
		}
		Coordintation other = (Coordintation) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Coordintation[ coordinationId=" + id + " ]";
	}

}
