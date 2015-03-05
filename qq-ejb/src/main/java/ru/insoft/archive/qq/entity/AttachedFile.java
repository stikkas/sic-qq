package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	@Column(name = "QUESTION_ID")
	private Long question;



	@JsonIgnore
	@JoinColumn(name = "FILE_TYPE_ID", referencedColumnName = "DESCRIPTOR_VALUE_ID", updatable = false, insertable = false)
	@ManyToOne
	private DescriptorValue typeValue;

	public AttachedFile() {
	}

	public AttachedFile(Long id) {
		this.id = id;
	}

	public AttachedFile(Long id, String name, Long type) {
		this.id = id;
		this.name = name;
		this.type = type;
	}

	public AttachedFile(String name, Long type, Long question) {
		this.name = name;
		this.type = type;
		this.question = question;
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

	public Long getQuestion() {
		return question;
	}

	public void setQuestion(Long question) {
		this.question = question;
	}


	public DescriptorValue getTypeValue() {
		return typeValue;
	}

	public void setTypeValue(DescriptorValue typeValue) {
		this.typeValue = typeValue;
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
