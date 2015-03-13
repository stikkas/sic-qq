package ru.insoft.archive.qq.dao;

/**
 * Абстрактрый класс для операций создания, обнавления, нахождения по id и
 * удаления
 *
 * @author Благодатских С.
 * @param <T> Тип сущности, с которой работает наследующий бин
 */
public abstract class AbstractCRUDDao<T> extends AbstractDao{

	private Class<T> type;

	public AbstractCRUDDao(Class<T> type) {
		this.type = type;
	}

	public T create(T entity) {
		em.persist(entity);
		return entity;
	}

	public T update(T entity) {
		em.persist(entity);
		return entity;
	}

	public T find(Long id) {
		return em.find(type, id);
	}

	public void remove(T entity) {
		em.remove(entity);
	}
}
