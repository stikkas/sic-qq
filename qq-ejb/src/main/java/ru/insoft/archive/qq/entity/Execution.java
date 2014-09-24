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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import org.codehaus.jackson.annotate.JsonIgnore;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;

/**
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_EXECUTION")
@NamedQueries({
	@NamedQuery(name = "Execution.findAll", query = "SELECT e FROM Execution e"),
	@NamedQuery(name = "Execution.findById", query = "SELECT e FROM Execution e WHERE e.id = :id"),
	@NamedQuery(name = "Execution.findByExecDate", query = "SELECT e FROM Execution e WHERE e.execDate = :execDate")})
public class Execution implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "QUESTION_ID")
	private Long id;

	@Column(name = "ANSWER_RESULT_ID")
	private Long answerResult;

	@Column(name = "USAGE_ANSWER_ID")
	private Long usageAnswer;

	@Column(name = "CATEGORY_COMPLEXITY_ID")
	private Long categoryComplexity;

	@Column(name = "EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	@JsonIgnore
	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID",
		insertable = false, updatable = false)
	@OneToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	@JsonIgnore
	@JoinColumn(name = "USAGE_ANSWER_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
		insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private DescriptorValue usageAnswerValue;

	@JsonIgnore
	@JoinColumn(name = "ANSWER_RESULT_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
		insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private DescriptorValue answerResultValue;

	public Execution() {
	}

	public Execution(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAnswerResult() {
		return answerResult;
	}

	public void setAnswerResult(Long answerResult) {
		this.answerResult = answerResult;
	}

	public DescriptorValue getAnswerResultValue() {
		return answerResultValue;
	}

	public void setAnswerResultValue(DescriptorValue answerResultValue) {
		this.answerResultValue = answerResultValue;
	}

	public Long getUsageAnswer() {
		return usageAnswer;
	}

	public void setUsageAnswer(Long usageAnswer) {
		this.usageAnswer = usageAnswer;
	}

	public DescriptorValue getUsageAnswerValue() {
		return usageAnswerValue;
	}

	public void setUsageAnswerValue(DescriptorValue usageAnswerValue) {
		this.usageAnswerValue = usageAnswerValue;
	}

	public Long getCategoryComplexity() {
		return categoryComplexity;
	}

	public void setCategoryComplexity(Long categoryComplexity) {
		this.categoryComplexity = categoryComplexity;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
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
		if (!(object instanceof Execution)) {
			return false;
		}
		Execution other = (Execution) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.Execution[ questionId=" + id + " ]";
	}

}
