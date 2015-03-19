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

	public ArchiveJvkDto(String questionType, Date execDate, Date controlDate, 
			Date planDate, String status, String executor, Long id, 
			String litera, String number, Date regDate, String otKogo) {
		super(controlDate, planDate, status, executor, id, litera, number, regDate, otKogo);
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
