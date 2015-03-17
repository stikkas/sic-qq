package ru.insoft.archive.qq.service.dto;

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
	 * Имеет ли пользователь право регистратора
	 */
	public boolean reg;
	/**
	 * Имеет ли пользователь право исполнителя
	 */
	public boolean exec;
	/**
	 * Имеет ли пользователь право координатора
	 */
	public boolean coor;
	/**
	 * Имеет ли пользователь право суперисполнителя
	 */
	public boolean superex;
	/**
	 * Имеет ли пользователь право супервизора
	 */
	public boolean supervis;
	/**
	 * Идентификатор СИЦ. К пользователю это мало относится, но чтобы не делать
	 * два запроса отправляем посылку с данными по пользователю
	 */
	public Long sicId;
}