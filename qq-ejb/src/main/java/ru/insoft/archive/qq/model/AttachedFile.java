package ru.insoft.archive.qq.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import ru.insoft.archive.core_model.table.desc.DescriptorValue;
import ru.insoft.archive.extcommons.entity.HasId;
import ru.insoft.archive.extcommons.json.JsonIn;
import ru.insoft.archive.extcommons.json.JsonOut;
import ru.insoft.archive.extcommons.json.JsonReplaceById;

@Entity
@Table(name = "qq_attached_file")
public class AttachedFile implements HasId,JsonIn,JsonOut{

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "attached_file_id_gen")
	@SequenceGenerator(allocationSize = 1, sequenceName = "SEQ_QQ_ATTACHED_FILE", name = "attached_file_id_gen")
	@Column(name = "attached_file_id")
	private Long id;

	@Column(name = "file_name", length = 256, nullable = false)
	private String fileName;

	@ManyToOne(optional = false)
	@JoinColumn(name = "file_type_id")
	@JsonReplaceById
	private DescriptorValue fileType;

	@OneToOne
	@JoinColumn(name = "q_id", nullable = true)
	private Question q;

	@Override
	public Object getId() {
		return id;
	}

////////--------------GENERATED CODE BELOW--------------------///////////////
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public DescriptorValue getFileType() {
		return fileType;
	}

	public void setFileType(DescriptorValue fileType) {
		this.fileType = fileType;
	}

	public Question getQ() {
		return q;
	}

	public void setQ(Question q) {
		this.q = q;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	

}
