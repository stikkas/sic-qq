/**
 * 
 */
package ru.insoft.archive.qq.webmodel;

import java.util.Date;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.qq.model.ExecutionInfo;
import ru.insoft.archive.qq.model.QuestionModel;
import ru.insoft.archive.qq.model.Transmission;

/**
 * @author sorokin
 * 
 */
public class JournalItem extends QuestionInfoItem implements JsonOut {
	public JournalItem(QuestionModel q) {
		super(q);

		ExecutionInfo ei = q.getExecInfo();
		if (ei != null) {
			this.execDate = ei.getExecDate();
		}

		DescriptorValue statusdv = q.getStatus();
		if (statusdv != null) {
			this.status = statusdv.getValue();
		}

		Transmission t = q.getTransmission();
		if (t != null) {
			this.executor = t.getExecutorName().getName();
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
