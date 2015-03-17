package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author basa
 */
public class AssistantPK implements Serializable {

	private Long id;

	private Long user;

	public AssistantPK() {
	}

	public AssistantPK(Long id, Long user) {
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

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 29 * hash + Objects.hashCode(id);
		hash = 29 * hash + Objects.hashCode(user);
		return hash;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof AssistantPK) {
			AssistantPK pk = (AssistantPK)obj;
			return pk.id.equals(id) && 
					pk.user.equals(user);
		}
		return false;
	}

}
