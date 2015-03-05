package ru.insoft.archive.qq.service;

import java.util.List;

/**
 * Класс для хранения данных о текущем пользователе
 *
 * @author Благодатских С.
 */
public class UserData {

	/**
	 * Идентификатор пользователя
	 */
	public Long userId;
	/**
	 * Отображаемое имя пользователя, например, Иванов И.И.
	 */
	public String name;
	/**
	 * Идентификатор организации пользователя
	 */
	public Long organization;

	/**
	 * Является ли организация пользователя СИЦ
	 */
	public boolean sic;

	/**
	 * Список кодов доступа пользователя
	 */
	public List<String> access;
	/**
	 * Идентификатор СИЦ. К пользователю это мало относится, но чтобы не делать
	 * два запроса отправляем посылку с данными по пользователю
	 */
	public Long sicId;
}
