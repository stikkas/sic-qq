package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;

/**
 * Прикрепленные файлы. Могут быть в запросе и в ответе (два типа файлов)
 *
 * @author С. Благодатских
 */
@Entity
@Table(name = "QQ_ATTACHED_FILE")
@NamedQueries({
	@NamedQuery(name = "AttachedFile.findAll", query = "SELECT a FROM AttachedFile a"),
	@NamedQuery(name = "AttachedFile.findById", query = "SELECT a FROM AttachedFile a WHERE a.id = :id"),
	@NamedQuery(name = "AttachedFile.findByFileName", query = "SELECT a FROM AttachedFile a WHERE a.fileName = :fileName")})
public class AttachedFile implements Serializable, HasId, JsonIn, JsonOut {

	private static final long serialVersionUID = 1L;
	@Id
	@Basic(optional = false)
	@NotNull
	@Column(name = "ATTACHED_FILE_ID")
	private Long id;

	@Basic(optional = false)
	@NotNull
	@Size(min = 1, max = 256)
	@Column(name = "FILE_NAME")
	private String fileName;

	@Basic(optional = false)
	@NotNull
	@Column(name = "FILE_TYPE_ID")
	private Long fileType;

	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public AttachedFile() {
	}

	public AttachedFile(Long id) {
		this.id = id;
	}

	public AttachedFile(Long id, String fileName) {
		this.id = id;
		this.fileName = fileName;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFileType() {
		return fileType;
	}

	public void setFileType(Long fileType) {
		this.fileType = fileType;
	}

	public Long getAttachedFileId() {
		return id;
	}

	public void setAttachedFileId(Long id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public Question getQuestion() {
		return question;
	}

	public void setQuestion(Question question) {
		this.question = question;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (id != null ? id.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		if (!(object instanceof AttachedFile)) {
			return false;
		}
		AttachedFile other = (AttachedFile) object;
		return this.id.equals(other.id);
	}

	@Override
	public String toString() {
		return "ru.insoft.archive.qq.entity.AttachedFile[ attachedFileId=" + id + " ]";
	}

}
