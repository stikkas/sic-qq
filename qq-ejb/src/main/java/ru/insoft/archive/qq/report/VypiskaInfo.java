package ru.insoft.archive.qq.report;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Класс формирования данных для вставки в документ "Выписка".
 *
 * @author С. Благодатских
 */
public class VypiskaInfo {

	/**
	 * Дата регистрации
	 */
	private final Date regDate;
	/**
	 * Организация-заявитель
	 */
	private final String organization;
	/**
	 * Фамилия частного заявителя
	 */
	private final String lastName;
	/**
	 * Имя частного заявителя
	 */
	private final String firstName;
	/**
	 * Отчество частного заявителя
	 */
	private final String middleName;
	/**
	 * Контактный адрес
	 */
	private final String address;
	/**
	 * Контактный телефон
	 */
	private final String phone;
	/**
	 * Содержание запроса
	 */
	private final String content;
	/**
	 * Дата выполнения не позднее
	 */
	private final Date plannedDate;
	/**
	 * ФИО регистратора
	 */
	private final String registrator;

	private static final SimpleDateFormat timeFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

	public VypiskaInfo() {
		plannedDate = regDate = new Date();
		organization = lastName = firstName = middleName = address = phone = content = registrator = "";
	}

	public VypiskaInfo(Date regDate, String organization, String lastName,
		String firstName, String middleName, String address,
		String phone, String content, Date plannedDate, String registrator) {
		this.regDate = regDate;
		this.organization = organization;
		this.lastName = lastName;
		this.firstName = firstName;
		this.middleName = middleName;
		this.address = address;
		this.phone = phone;
		this.content = content;
		this.plannedDate = plannedDate;
		this.registrator = registrator;
	}

//Дата регистрации: 19.11.2014 16:13:06
	public String getRegDate() {
		return timeFormat.format(regDate);
	}

//Планируемая дата выдачи: 18.12.2014
	public String getPlannedDate() {
		return dateFormat.format(plannedDate);
	}

//Дата выдачи: 19.12.2014
	public String getFinishDate() {
		Calendar cal = GregorianCalendar.getInstance();
		cal.setTime(plannedDate);
		cal.add(Calendar.DATE, 1);
		return dateFormat.format(cal.getTime());

	}

//Организация: Правительство Москвы
// или Кузнецов Олег Васильевич
	public String getApplicant() {
		if (organization != null) {
			return organization;
		} else {
			StringBuilder builder = new StringBuilder();
			if (lastName != null) {
				builder.append(lastName);
			}
			if (firstName != null) {
				builder.append(" ").append(firstName);
			}
			if (middleName != null) {
				builder.append(" ").append(middleName);
			}
			return builder.toString();
		}
	}

//Содержимое запроса: Об эвакуации Малого театра в годы ВОВ
	public String getContent() {
		return content;
	}

//Адрес: г. Москва, Тверская, д.4, тел. 8-903-897-56-56
	public String getAddress() {
		boolean addr = false;
		StringBuilder sb = new StringBuilder();
		if (address != null) {
			sb.append(address);
			addr = true;
		}
		if (phone != null) {
			if (addr) {
				sb.append(", ");
			}
			sb.append(phone);
		}
		return sb.toString();
	}

//Регистартор: Иванов И. И.
	public String getRegistrator() {
		return registrator;
	}

}
