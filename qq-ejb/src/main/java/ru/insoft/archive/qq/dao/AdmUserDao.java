package ru.insoft.archive.qq.dao;

import javax.annotation.Resource;
import javax.ejb.EJBContext;
import javax.ejb.Stateless;

/**
 * Получение информации о пользователе
 *
 * @author Благодатских С.
 */
@Stateless
public class AdmUserDao extends AbstractDao {
	@Resource
	private EJBContext ctx;

	
}
