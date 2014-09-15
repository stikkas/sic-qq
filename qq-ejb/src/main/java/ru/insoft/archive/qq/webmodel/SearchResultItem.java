
package ru.insoft.archive.qq.webmodel;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.core_model.view.desc.VDescAttrValue;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.qq.model.Applicant;
import ru.insoft.archive.qq.model.ExecutionInfo;
import ru.insoft.archive.qq.model.QuestionModel;

/**
 * @author sorokin
 */
public class SearchResultItem extends QuestionInfoItem implements JsonOut, JsonIn {

	public SearchResultItem(QuestionModel q) {
		super(q);

		ExecutionInfo ei = q.getExecInfo();
		if (ei != null) {
			if (ei.getUsageAnswer() != null)
				this.answerTematic = q.getExecInfo().getUsageAnswer()
						.getValue();
			if (ei.getAnswerResult() != null)
				this.answerResult = q.getExecInfo().getAnswerResult()
						.getValue();
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
