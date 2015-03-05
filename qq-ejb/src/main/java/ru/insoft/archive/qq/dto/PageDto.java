package ru.insoft.archive.qq.dto;

import java.util.List;

/**
 * Класс для предоставления информации для постраничного просмотра
 *
 * @author Благодатских С.
 * @param <T> тип найденных данных
 */
public class PageDto <T> {
	/**
	 * Всего найденных результатов
	 */
	Long total;
	List<T> items;

	public PageDto(Long total, List<T> items) {
		this.total = total;
		this.items = items;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public List<T> getItems() {
		return items;
	}

	public void setItems(List<T> items) {
		this.items = items;
	}
	
}
