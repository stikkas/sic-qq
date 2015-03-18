package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

/**
 * Класс Исполнение запроса. без запроса существовать не может, поэтому id не
 * генерится автоматически.
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "SIC_QUESTION")
public class Execution implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@NotNull
	@Column(name = "ID", insertable = false, updatable = false)
	private Long id;

	/**
	 * Дата исполнения
	 */
	@Column(name = "EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date execDate;

	/**
	 * Уведомление о продлении сроков
	 */
	@Column(name = "NOTI_PRODLENIE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date prolongDate;

	/**
	 * Результат ответа
	 */
	@Column(name = "ANS_RESULT_ID")
	private Long replyRes;

	/**
	 * Исполнитель
	 */
	@Column(name = "EXECUTOR_ID", insertable = false, updatable = false)
	private Long executor;

	/**
	 * Тематика ответа
	 */
	@Column(name = "TEMATIC_ANS_ID")
	private Long replyTema;

	/**
	 * Переадресовка, Рекомендация
	 */
	@Column(name = "RECOMENDATION")
	private String refer;

	/**
	 * Категория сложности
	 */
	@Column(name = "CAT_SLOJNOSTI_ID")
	private Long difCat;

	/**
	 * Исходящий №
	 */
	@Column(name = "NUM_ISHODYACHEGO")
	private String issueNum;

	/**
	 * Примечание
	 */
	@Column(name = "PRIMECHANIE")
	private String remark;

	/**
	 * Статус запроса
	 */
	@Column(name = "STATUS_ID")
	private Long status;

	/**
	 * Плановая дата исполнения запроса
	 */
	@Column(name = "PLAN_EXEC_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date planDate;

	/**
	 * Файлы ответа, устанавливаются при получении информации по id
	 */
	@OneToMany(mappedBy = "execution", fetch = FetchType.LAZY)
	private List<AttachedFile> files;

	public Execution() {
	}

	public Execution(Long id, Long status, Long executor) {
		this.id = id;
		this.status = status;
		this.executor = executor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

	public Date getProlongDate() {
		return prolongDate;
	}

	public void setProlongDate(Date prolongDate) {
		this.prolongDate = prolongDate;
	}

	public Long getReplyRes() {
		return replyRes;
	}

	public void setReplyRes(Long replyRes) {
		this.replyRes = replyRes;
	}

	public Long getReplyTema() {
		return replyTema;
	}

	public void setReplyTema(Long replyTema) {
		this.replyTema = replyTema;
	}

	public String getRefer() {
		return refer;
	}

	public void setRefer(String refer) {
		this.refer = refer;
	}

	public Long getDifCat() {
		return difCat;
	}

	public void setDifCat(Long difCat) {
		this.difCat = difCat;
	}

	public String getIssueNum() {
		return issueNum;
	}

	public void setIssueNum(String issueNum) {
		this.issueNum = issueNum;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public Date getPlanDate() {
		return planDate;
	}

	public void setPlanDate(Date planDate) {
		this.planDate = planDate;
	}

	public List<AttachedFile> getFiles() {
		return files;
	}

	public void setFiles(List<AttachedFile> files) {
		this.files = files;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

}
