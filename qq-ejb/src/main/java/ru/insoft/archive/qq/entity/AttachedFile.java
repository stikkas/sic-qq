package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Прикрепленные файлы. Могут быть в запросе, в ответе или в уведомлении
 *
 * @author С. Благодатских
 */
@NamedQueries({
	@NamedQuery(name = "AttachedFile.questionFilesWithType",
			query = "SELECT a from AttachedFile a WHERE a.qid = :question and a.type = :type")})
@Entity
@Table(name = "QQ_ATTACHED_FILE")
public class AttachedFile implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "attachedGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "attachedGen", sequenceName = "SEQ_QQ_ATTACHED_FILE",
			allocationSize = 1)
	@Column(name = "ATTACHED_FILE_ID")
	private Long id;

	@Column(name = "FILE_NAME")
	private String name;

	@JsonIgnore
	@Column(name = "FILE_TYPE_ID")
	private Long type;

	@Column(name = "QUESTION_ID")
	private Long qid;

	@JsonIgnore
	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "ID", insertable = false, updatable = false)
	@ManyToOne(fetch = FetchType.LAZY)
	private Question question;

	public AttachedFile() {
	}

	public AttachedFile(String name, Long type, Long qid) {
		this.name = name;
		this.type = type;
		this.qid = qid;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getType() {
		return type;
	}

	public void setType(Long type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getQid() {
		return qid;
	}

	public void setQid(Long qid) {
		this.qid = qid;
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
