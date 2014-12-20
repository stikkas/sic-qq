package ru.insoft.archive.qq.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 *
 * @author basa
 */
public class AssistantPK implements Serializable {

	private Long transmission;

	private Long user;

	public AssistantPK() {
	}

	public AssistantPK(Long transmission, Long user) {
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

	@Override
	public int hashCode() {
		int hash = 7;
		hash = 29 * hash + Objects.hashCode(this.transmission);
		hash = 29 * hash + Objects.hashCode(this.user);
		return hash;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof AssistantPK) {
			AssistantPK pk = (AssistantPK)obj;
			return pk.transmission.equals(this.transmission) && 
					pk.user.equals(this.user);
		}
		return false;
	}

}
