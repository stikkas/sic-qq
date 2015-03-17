package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.validation.constraints.NotNull;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * Класс соисполнителей запроса
 *
 * @author basa
 */
@NamedQueries({
	@NamedQuery(name = "Assistant.removeTransmission",
			query = "DELETE FROM Assistant a WHERE a.id = :id"),
	@NamedQuery(name = "Assistant.assistTransmission",
			query = "SELECT a FROM Assistant a WHERE a.id = :id")
})
@Entity
@Table(name = "QQ_ASSISTANTS")
@IdClass(AssistantPK.class)
public class Assistant implements Serializable {

	/**
	 * Уникальный идентификатор запроса
	 */
	@JsonIgnore
	@Id
	@NotNull
	@Column(name = "TRANSMISSION_ID", nullable = false)
	private Long id;

	/**
	 * Уникальный идентификатор помощника
	 */
	@Id
	@NotNull
	@Column(name = "ASSISTANT_ID", nullable = false)
	private Long user;
	/**
	 * Дата выполнения для помощника
	 */
	@Column(name = "EXEC_DATE", columnDefinition = "DATE")
	@Temporal(javax.persistence.TemporalType.TIMESTAMP)
	private Date execDate;

	@JsonIgnore
	@JoinColumn(name = "TRANSMISSION_ID", referencedColumnName = "ID", insertable = false, updatable = false)
	@ManyToOne
	private Transmission transmission;

	public Assistant() {
	}

	public Assistant(Long id, Long user) {
		this.id = id;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUser() {
		return user;
	}

	public void setUser(Long user) {
		this.user = user;
	}

	public Date getExecDate() {
		return execDate;
	}

	public void setExecDate(Date execDate) {
		this.execDate = execDate;
	}

	public Transmission getTransmission() {
		return transmission;
	}

	public void setTransmission(Transmission transmission) {
		this.transmission = transmission;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 37 * hash + Objects.hashCode(this.id);
		hash = 37 * hash + Objects.hashCode(this.user);
		return hash;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (getClass() != obj.getClass()) {
			return false;
		}
		final Assistant other = (Assistant) obj;
		return Objects.equals(this.id, other.id)
				&& Objects.equals(this.user, other.user);
	}

}
