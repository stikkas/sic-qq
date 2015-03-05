package ru.insoft.archive.qq.service;

import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import ru.insoft.archive.qq.dao.AdmUserDao;

/**
 * Предоставляет данные по пользователю сессии
 *
 * @author Благодатских С.
 */
@SessionScoped
public class UserProfile implements Serializable {

	@Inject
	private AdmUserDao userDao;

	/**
	 * Данные пользователя. Делается именно так, иначе REST не может правильно
	 * игнорировать userDao при передаче пользователю и вываливается с ошибкой.
	 */
	private UserData data = new UserData();

	@PostConstruct
	private void init() {
		Object[] info = userDao.getUserInfo();
		data.userId = (Long) info[0];
		data.name = (String) info[1];
		data.organization = (Long) info[2];
		data.access = userDao.getUserRules();
		data.sicId = userDao.getSicId();
		data.sic = data.organization.equals(data.sicId);
	}

	public Long getOrganization() {
		return data.organization;
	}

	public boolean isSic() {
		return data.sic;
	}

	public String getName() {
		return data.name;
	}

	public List<String> getAccess() {
		return data.access;
	}

	public Long getUserId() {
		return data.userId;
	}

	public UserData getData() {
		return data;
	}

	public AdmUserDao getUserDao() {
		return userDao;
	}

}
