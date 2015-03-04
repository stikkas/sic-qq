package ru.insoft.archive.qq.service;

import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;

/**
 * Хранит информацию о пользователе
 *
 * @author Благодатских С.
 */
@SessionScoped
public class UserProfile implements Serializable {

	/**
	 * Идентификатор организации пользователя
	 */
	private Long organization;

	/**
	 * Является ли организация пользователя СИЦ
	 */
	private boolean isSic;

	/**
	 * Отображаемое имя пользователя, например, Иванов И.И.
	 */
	private String name;

	/**
	 * Список кодов доступа пользователя
	 */
	private List<String> access;

	/**
	 * Идентификатор пользователя
	 */
	private Long userId;

	@PostConstruct
	private void init() {

	}

	public Long getOrganization() {
		return organization;
	}

	public boolean isIsSic() {
		return isSic;
	}

	public String getName() {
		return name;
	}

	public List<String> getAccess() {
		return access;
	}

	public Long getUserId() {
		return userId;
	}
}
