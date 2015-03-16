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
 * Класс уведомления. Уведомление без запроса существовать не может, поэтому id
 * не генерится автоматически.
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "SIC_QUESTION")
public class Notification implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@NotNull
	@Column(name = "ID")
	private Long id;

	/**
	 * Исполнитель уведомления (регистратор)
	 */
	@Column(name = "NOTI_EXECUTOR_ID")
	private Long executor;

	/**
	 * Тип документов
	 */
	@Column(name = "TIP_DOCS_ID")
	private Long docType;

	/**
	 * Кому. Используется в форме ответа.
	 */
	@Column(name = "NOTI_KOMU")
	private String toWhom;

	/**
	 * Дата уведомления
	 */
	@Column(name = "NOTI_DATE", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date notiDate;

	/**
	 * Способ передачи уведомления
	 */
	@Column(name = "NOTI_SPOSOB_PEREDACHI_ID")
	private Long delType;

	/**
	 * Дата выдачи / отпавки документа
	 */
	@Column(name = "NOTI_DATE_OTPRAVKI_DOC", columnDefinition = "DATE")
	@Temporal(TemporalType.TIMESTAMP)
	private Date issueDate;

	/**
	 * Статус уведомления
	 */
	@Column(name = "NOTI_STATUS_ID")
	private Long status;

	/**
	 * Подготовленный документ уведомления, устанавливаются при получении
	 * информации по id
	 */
	@OneToMany(mappedBy = "notification", fetch = FetchType.LAZY)
	private List<AttachedFile> files;

	public Notification(Long id) {
		this.id = id;
	}

	public Notification() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getExecutor() {
		return executor;
	}

	public void setExecutor(Long executor) {
		this.executor = executor;
	}

	public Long getDocType() {
		return docType;
	}

	public void setDocType(Long docType) {
		this.docType = docType;
	}

	public String getToWhom() {
		return toWhom;
	}

	public void setToWhom(String toWhom) {
		this.toWhom = toWhom;
	}

	public Date getNotiDate() {
		return notiDate;
	}

	public void setNotiDate(Date notiDate) {
		this.notiDate = notiDate;
	}

	public Long getDelType() {
		return delType;
	}

	public void setDelType(Long delType) {
		this.delType = delType;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	public Long getStatus() {
		return status;
	}

	public void setStatus(Long status) {
		this.status = status;
	}

	public List<AttachedFile> getFiles() {
		return files;
	}

	public void setFiles(List<AttachedFile> files) {
		this.files = files;
	}

}
