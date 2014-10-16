/**
 *
 */
package ru.insoft.archive.qq.webmodel;

import java.util.Date;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.qq.entity.Execution;
import ru.insoft.archive.qq.entity.Question;
import ru.insoft.archive.qq.entity.Transmission;

/**
 * @author sorokin
 *
 */
public class JournalItem extends QuestionInfoItem implements JsonOut {

	public JournalItem(Question q) {
		super(q);

		this.execDate = q.getPlannedFinishDate();

		DescriptorValue statusdv = q.getStatusValue();
		if (statusdv != null) {
			this.status = statusdv.getValue();
		}

		Transmission t = q.getTransmission();
		if (t != null && t.getExecutor() != null) {
			this.executor = t.getExecutorValue().getName();
		}

	}

	private Date execDate;

	private String status;

	private String executor;

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getExecutor() {
		return executor;
	}

	public void setExecutor(String executor) {
		this.executor = executor;
	}

}
