package ru.insoft.archive.qq.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Общие настройки для всех объектов доступа
 *
 * @author Благодатских С.
 */
public abstract class AbstractDao {

	@PersistenceContext(unitName = "SicEntityManager")
	private EntityManager em;
}
