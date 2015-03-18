package ru.insoft.archive.qq.dao;

import java.util.List;

/**
 * Интерфейс для объектов доступа к табличным данным, таким как "Используемые
 * материалы" и т.п. Все таблицы находятся на вкладке "Исполнение запроса"
 *
 * @author Благодатских С.
 * @param <T> Тип сущности, с которой имеет дело реализующий класс
 */
public interface TableDao<T> {

	List<T> find(Long id);

	void remove(Long id);

	public List<T> update(List<T> items, Long id);
}
