package ru.insoft.archive.qq.dto;

import java.util.Date;

/**
 *
 * @author Благодатских С.
 */
public class SearchDto extends SearchJvkDto{

	private String content;
	private String questionType;
	private String replyResult;

	public SearchDto(String content, String questionType, String replyResult, 
			Long id, String litera, String number, Date regDate, String otKogo) {
		super(id, litera, number, regDate, otKogo);
		this.content = content;
		this.questionType = questionType;
		this.replyResult = replyResult;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getQuestionType() {
		return questionType;
	}

	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}

	public String getReplyResult() {
		return replyResult;
	}

	public void setReplyResult(String replyResult) {
		this.replyResult = replyResult;
	}

}
