package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Stateless;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import ru.insoft.archive.qq.ejb.DictCodes;

/**
 * Получение информации о пользователе
 *
 * @author Благодатских С.
 */
@Stateless
public class AdmUserDao extends AbstractDao {

	@Resource
	private EJBContext ctx;

	/**
	 * Возвращает массив из трех объектов: 0 - идентификатор пользователя
	 * системы 1 - отображаемое имя, например, Иванов И.И. 2 - идентификатор
	 * организации, к которой относится пользователь
	 *
	 * @return массив объектов
	 */
	public Object[] getUserInfo() {
		try {
			return (Object[]) em.createNamedQuery("AdmUser.userDataByLogin")
					.setParameter("login", ctx.getCallerPrincipal().getName())
					.getSingleResult();
		} catch (NoResultException | NonUniqueResultException ex) {
			throw new WebApplicationException(ex, Response.Status.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Возвращает список кодов прав доступа пользователя
	 *
	 * @return список кодов
	 */
	public List<String> getUserRules() {
		return em.createNamedQuery("AdmUser.userRules")
				.setParameter("login", ctx.getCallerPrincipal().getName())
				.getResultList();
	}

	/**
	 * Возвращает идентификатор для СИЦ
	 *
	 * @return идентификатор СИЦ
	 */
	public Long getSicId() {
		return store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);
	}
}
