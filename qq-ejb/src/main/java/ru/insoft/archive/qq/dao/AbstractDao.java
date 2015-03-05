package ru.insoft.archive.qq.dao;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import ru.insoft.archive.qq.ejb.Store;

/**
 * Общие настройки для всех объектов доступа
 *
 * @author Благодатских С.
 */
public abstract class AbstractDao {

	@PersistenceContext(unitName = "SicEntityManager")
	protected EntityManager em;

	@Inject
	protected Store store;
}
