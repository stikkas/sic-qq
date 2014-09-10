package ru.insoft.archive.qq.ejb;

import java.io.Serializable;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import ru.insoft.archive.core_model.table.adm.AdmEmployee;
import ru.insoft.archive.core_model.table.adm.AdmUser;

/**
 * Нужен для тестовых операций. Когда пользователь реально не залогинился, а
 * нужна информация о нем.
 *
 * @author С. Благодатских
 */
@Stateless(name = "QQ_UserInfo")
@LocalBean
public class UserInfo implements Serializable {

	@PersistenceContext
	private EntityManager em;

	/**
	 * Возвращает сотрудника, которому соответствует пользователь системы,
	 * передаваемый в параметре. Необходимо для получения информации о
	 * пользователе, такой как: организация и другое.
	 *
	 * @param user пользователь системы
	 * @return сотрудник учреждения
	 */
	public AdmEmployee getEmployee(AdmUser user) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmEmployee> cq = cb.createQuery(AdmEmployee.class);
		cq.where(cb.equal(cq.from(AdmEmployee.class).<String>get("userId"), user.getId()));
		return em.createQuery(cq).getSingleResult();
	}

	/**
	 * Возвращает пользователя соответствующего login.<br>
	 * Нужен для получения данных о пользователе, когда в системе не
	 * залогинился. Для ускорения разработки.
	 *
	 * @param name имя пользователя (login)
	 * @return пользователь {@code AdmUser}
	 */
	public AdmUser getUser(String name) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AdmUser> cq = cb.createQuery(AdmUser.class);
		cq.where(cb.equal(cq.from(AdmUser.class).<String>get("login"), name));
		return em.createQuery(cq).getSingleResult();
	}
}
