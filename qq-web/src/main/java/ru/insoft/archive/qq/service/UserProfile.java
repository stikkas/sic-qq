package ru.insoft.archive.qq.service;

import java.io.Serializable;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import ru.insoft.archive.qq.dao.AdmUserDao;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.ejb.Store;

/**
 * Предоставляет данные по пользователю сессии
 *
 * @author Благодатских С.
 */
@SessionScoped
public class UserProfile implements Serializable {

	@Inject
	private AdmUserDao userDao;

	@Inject
	private Store store;

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

		List<Long> rules = userDao.getUserRules(data.userId);
		data.coor = rules.contains(store.getIdByCode(DictCodes.Q_RULE_COORDINATOR));
		data.exec = rules.contains(store.getIdByCode(DictCodes.Q_RULE_EXECUTOR));
		data.reg = rules.contains(store.getIdByCode(DictCodes.Q_RULE_REGISTRATOR));
		data.superex = rules.contains(store.getIdByCode(DictCodes.Q_RULE_SEXECUTOR));
		data.supervis = rules.contains(store.getIdByCode(DictCodes.Q_RULE_SUPERVISOR));

		data.sicId = store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);

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
