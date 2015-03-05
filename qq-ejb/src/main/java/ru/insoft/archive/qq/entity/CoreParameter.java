package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author Благодатских С.
 */
@Entity
@Table(name = "CORE_PARAMETER")
@NamedQueries({
	@NamedQuery(name = "CoreParameter.paramsByCodes", query
			= "SELECT p FROM CoreParameter p WHERE p.code in :codes")})
public class CoreParameter implements Serializable {

	@Id
	@Column(name = "PARAMETER_CODE", insertable = false, updatable = false)
	private String code;

	@Column(name = "PARAMETER_VALUE", insertable = false, updatable = false)
	private String value;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
