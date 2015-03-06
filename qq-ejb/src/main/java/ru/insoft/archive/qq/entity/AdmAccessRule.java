package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * Сущность прав доступа
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Entity
@Table(name = "ADM_ACCESS_RULE")
@NamedQueries({
	@NamedQuery(name = "AdmAccessRule.idsByCodes", query
			= "SELECT a.ruleCode, a.id FROM AdmAccessRule a WHERE a.ruleCode in :codes"
	)
})
public class AdmAccessRule implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@Column(name = "ACCESS_RULE_ID", insertable = false, updatable = false)
	private Long id;

	@Column(name = "RULE_CODE", insertable = false, updatable = false)
	private String ruleCode;

	public String getRuleCode() {
		return ruleCode;
	}

	public void setRuleCode(String ruleCode) {
		this.ruleCode = ruleCode;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
