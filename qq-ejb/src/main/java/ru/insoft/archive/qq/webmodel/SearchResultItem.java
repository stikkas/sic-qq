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
			if (ei.getUsageAnswerValue() != null) {
				this.answerTematic = ei.getUsageAnswerValue().getValue();
			}
			if (ei.getAnswerResultValue() != null) {
				this.answerResult = ei.getAnswerResultValue().getValue();
			}
		}
	}

	private String answerTematic;

	private String answerResult;

	public String getAnswerTematic() {
		return answerTematic;
	}

	public void setAnswerTematic(String answerTematic) {
		this.answerTematic = answerTematic;
	}

	public String getAnswerResult() {
		return answerResult;
	}

	public void setAnswerResult(String answerResult) {
		this.answerResult = answerResult;
	}

}
