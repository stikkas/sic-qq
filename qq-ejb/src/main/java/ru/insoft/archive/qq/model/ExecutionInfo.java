package ru.insoft.archive.qq.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Сведения об исполнении
 * 
 * @author sorokin
 */
@Entity
@Table(name = "qq_execution")
public class ExecutionInfo implements HasId,JsonIn,JsonOut{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QQ_EXECUTION_IDGEN")
	@SequenceGenerator(allocationSize = 1, sequenceName = "SEQ_QQ_EXECUTION", name = "QQ_EXECUTION_IDGEN")
	@Column(name = "execution_id")
	private Long id;

	// Дата исполнения
	@Column(name = "exec_date")
	private Date execDate;

	// Результат ответа
	@OneToOne
	@JoinColumn(name = "answer_result_id")
	private DescriptorValue answerResult;

	// Тематика ответа
	@OneToOne
	@JoinColumn(name = "usage_answer_id")
	private DescriptorValue usageAnswer;

	// Категория сложности
	@OneToOne
	@JoinColumn(name = "category_complexity_id")
	private DescriptorValue categoryComplexity;

	// Запрос
	@OneToOne
	@JoinColumn(name = "q_id")
	private Question q;

	@Override
	public Object getId() {
		return id;
	}
	
////////--------------GENERATED CODE BELOW--------------------///////////////

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

	public DescriptorValue getAnswerResult() {
		return answerResult;
	}

	public void setAnswerResult(DescriptorValue answerResult) {
		this.answerResult = answerResult;
	}

	public DescriptorValue getUsageAnswer() {
		return usageAnswer;
	}

	public void setUsageAnswer(DescriptorValue usageAnswer) {
		this.usageAnswer = usageAnswer;
	}

	public DescriptorValue getCategoryComplexity() {
		return categoryComplexity;
	}

	public void setCategoryComplexity(DescriptorValue categoryComplexity) {
		this.categoryComplexity = categoryComplexity;
	}

	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	
}
