package ru.insoft.archive.qq.service.dto;

/**
 * Класс для передачи данных после выполнени действия submit формы. если вернуть
 * просто T тогда сенча не найдя success посчитает это за ошибку.
 *
 * @author stikkas<stikkas@yandex.ru>
 * @param <T> тип нагрузки 
 */
public class SubmitAnswer<T> {

	private boolean success;
	private T data;

	public SubmitAnswer() {
	}

	public SubmitAnswer(boolean success, T data) {
		this.success = success;
		this.data = data;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

}
