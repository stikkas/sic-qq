package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
public class AdmGroupRuleId implements Serializable {

	private Long groupId;
	private Long ruleId;

	public Long getGroupId() {
		return groupId;
	}

	public void setGroupId(Long groupId) {
		this.groupId = groupId;
	}

	public Long getRuleId() {
		return ruleId;
	}

	public void setRuleId(Long ruleId) {
		this.ruleId = ruleId;
	}

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 59 * hash + Objects.hashCode(this.groupId);
		hash = 59 * hash + Objects.hashCode(this.ruleId);
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
		final AdmGroupRuleId other = (AdmGroupRuleId) obj;
		return Objects.equals(this.groupId, other.groupId)
				&& Objects.equals(this.ruleId, other.ruleId);
	}

}
