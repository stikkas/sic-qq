package ru.insoft.archive.qq.entity;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Сущность для получения ЖВК для Архивов
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "SIC_QUESTION")
public class ArchiveJvk extends Jvk {

	@Column(name = "QUESTION_VID_ID", insertable = false, updatable = false)
	private Long questionTypeId;

	@JoinColumn(name = "QUESTION_VID_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID",
			insertable = false, updatable = false)
	@ManyToOne
	private DescriptorValue questionType;

	@Column(name = "EXEC_DATE", columnDefinition = "DATE", insertable = false, updatable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	public Long getQuestionTypeId() {
		return questionTypeId;
	}

	public void setQuestionTypeId(Long questionTypeId) {
		this.questionTypeId = questionTypeId;
	}

	public DescriptorValue getQuestionType() {
		return questionType;
	}

	public void setQuestionType(DescriptorValue questionType) {
		this.questionType = questionType;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

}
