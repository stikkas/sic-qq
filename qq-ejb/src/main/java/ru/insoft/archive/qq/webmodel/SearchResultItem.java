package ru.insoft.archive.qq.webmodel;

import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.qq.entity.Execution;
import ru.insoft.archive.qq.entity.Question;

/**
 * @author sorokin
 */
public class SearchResultItem extends QuestionInfoItem implements JsonOut, JsonIn {

	public SearchResultItem(Question q) {
		super(q);

		Execution ei = q.getExecution();
		if (ei != null) {
			if (ei.getAnswerResultValue() != null) {
				this.answerResult = ei.getAnswerResultValue().getValue();
			}
		}
		content = q.getContent();
	}

	private String content;

	private String answerResult;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAnswerResult() {
		return answerResult;
	}

	public void setAnswerResult(String answerResult) {
		this.answerResult = answerResult;
	}

}
