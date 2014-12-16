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

		plannedDate = q.getPlannedFinishDate();

		Execution ex = q.getExecution();
		if (ex != null) {
			execDate = ex.getExecDate();
		}

		DescriptorValue qt = q.getQuestionTypeValue();
		if (qt != null) {
			queryType = qt.getShortValue();
		}
		DescriptorValue notistat = q.getNotifyStatusValue();
		if (notistat != null) {
			notifyStatus = notistat.getValue();
		}
		DescriptorValue statusdv = q.getStatusValue();
		if (statusdv != null) {
			status = statusdv.getValue();
		}

		Transmission t = q.getTransmission();
		if (t != null && t.getExecutor() != null) {
			executor = t.getExecutorValue().getName();
		}

		DescriptorValue eo = q.getExecOrgValue();
		if (eo != null) {
			execOrg = eo.getShortValue();
		}

	}

	private Date execDate;

	private String queryType;

	private Date plannedDate;

	private String status;

	private String executor;

	private String execOrg;
	private String notifyStatus;

	public String getNotifyStatus() {
		return notifyStatus;
	}

	public void setNotifyStatus(String notifyStatus) {
		this.notifyStatus = notifyStatus;
	}

	public Date getPlannedDate() {
		return plannedDate;
	}

	public void setPlannedDate(Date plannedDate) {
		this.plannedDate = plannedDate;
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

	public String getExecOrg() {
		return execOrg;
	}

	public void setExecOrg(String execOrg) {
		this.execOrg = execOrg;
	}

	public String getQueryType() {
		return queryType;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

}
