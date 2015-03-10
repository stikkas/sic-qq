package ru.insoft.archive.qq.dto;

import java.util.Date;

/**
 * Класс для передачи результатов поиска ЖВК для Архивов
 *
 * @author Благодатских С.
 */
public class ArchiveJvkDto extends JvkDto {

	private String questionType;
	private Date execDate;

	public ArchiveJvkDto(Long id, String litera, String number, Date regDate,
			Date controlDate, Date planDate, String otKogo,
			String status, String executor, String questionType,
			Date execDate) {
		super(id, litera, number, regDate, controlDate, planDate, otKogo, status, executor);
		this.questionType = questionType;
		this.execDate = execDate;
	}

	public String getQuestionType() {
		return questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

}
