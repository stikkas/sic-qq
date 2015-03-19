package ru.insoft.archive.qq.entity;

import java.io.Serializable;

/**
 * Интерфейс для сущностей используемых в табличных данных на вкладке
 * "Исполнение запроса"
 *
 * @author Благодатских С.
 */
public interface TableEntity extends Serializable {

	/**
	 * возвращает идентификатор сущности
	 *
	 * @return идентификатор сущности
	 */
	Long getId();

	/**
	 * Устанавливает идентификатор запроса, которому принадлежит сущность
	 *
	 * @param questionId идентификатор запроса
	 */
	void setQid(Long questionId);
}
