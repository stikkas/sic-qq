package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.codehaus.jackson.annotate.JsonIgnore;

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
	@NamedQuery(name = "AttachedFile.findByName", query = "SELECT a FROM AttachedFile a WHERE a.name = :name")})
public class AttachedFile implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(generator = "attachedGen", strategy = GenerationType.SEQUENCE)
	@SequenceGenerator(name = "attachedGen", sequenceName = "SEQ_QQ_ATTACHED_FILE",
		allocationSize = 1)
	@Column(name = "ATTACHED_FILE_ID")
	private Long id;

	@Basic(optional = false)
	@NotNull
	@Size(min = 1, max = 256)
	@Column(name = "FILE_NAME")
	private String name;

	@Basic(optional = false)
	@NotNull
	@Column(name = "FILE_TYPE_ID")
	private Long type;

	@Basic(optional = false)
	@NotNull
	@Size(min = 1, max = 256)
	@Column(name = "FILE_LINK")
	private String link;

	@JsonIgnore
	@JoinColumn(name = "QUESTION_ID", referencedColumnName = "QUESTION_ID")
	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	private Question question;

	public AttachedFile() {
	}

	public AttachedFile(Long id) {
		this.id = id;
	}

	public AttachedFile(Long id, String name, Long type, String link) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.link = link;
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

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
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
