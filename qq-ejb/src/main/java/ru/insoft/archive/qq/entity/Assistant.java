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
import org.codehaus.jackson.annotate.JsonIgnore;
import ru.insoft.archive.core_model.table.adm.AdmUser;

/**
 *
 * @author basa
 */
@NamedQueries({
	@NamedQuery(name = "Assistant.findByTrans", query = "SELECT a FROM Assistant a WHERE a.trans = :trans")
})
@Entity
@Table(name = "QQ_ASSISTANTS")
@IdClass(AssistantPK.class)
public class Assistant implements Serializable {

	/**
	 * Уникальный идентификатор запроса
	 */
	@Id
	@Column(name = "TRANSMISSION_ID", nullable = false)
	private Long transmission;

	/**
	 * Уникальный идентификатор помощника
	 */
	@Id
	@Column(name = "ASSISTANT_ID", nullable = false)
	private Long user;
	/**
	 * Дата выполнения для помощника
	 */
	@Column(name = "EXEC_DATE", columnDefinition = "DATE")
	@Temporal(javax.persistence.TemporalType.TIMESTAMP)
	private Date execDate;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "TRANSMISSION_ID", referencedColumnName = "QUESTION_ID", insertable = false, updatable = false)
	private Transmission trans;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "ASSISTANT_ID", referencedColumnName = "USER_ID", insertable = false, updatable = false)
	private AdmUser userValue;

	public Assistant() {
	}

	public Assistant(Long transmission, Long user) {
		this.transmission = transmission;
		this.user = user;
	}

	public Long getTransmission() {
		return transmission;
	}

	public void setTransmission(Long transmission) {
		this.transmission = transmission;
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

	public Transmission getTrans() {
		return trans;
	}

	public void setTrans(Transmission trans) {
		this.trans = trans;
	}

	public AdmUser getUserValue() {
		return userValue;
	}

	public void setUserValue(AdmUser userValue) {
		this.userValue = userValue;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 37 * hash + Objects.hashCode(this.transmission);
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
		return Objects.equals(this.transmission, other.transmission)
				&& Objects.equals(this.user, other.user);
	}

}
