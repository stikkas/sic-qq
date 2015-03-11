package ru.insoft.archive.qq.dto;

import java.util.Objects;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Класс для передачи сортировки в табличных данных. Используется поиск по
 * регулярным выражения, чтобы избежать непредвиденных данных. Т.е. набор
 * возможных параметров сортировки заранее известен.
 *
 * @author Благодатских С.
 */
public class Sort {

	private static final Pattern pattern = Pattern.compile(
			"^\\[\\{\"property\":\"(?<property>litera|number|regDate|planDate|otKogo|status|"
			+ "executor|notiStat|execOrg|questionType|execDate)\",\"direction\":\""
					+ "(?<direction>ASC|DESC)\"\\}\\]$");
	/**
	 * Поле, по которому сортируем
	 */
	private String property;
	/**
	 * Направление, в котором сортируем
	 */
	private String direction;

	// Конструкторы не должны использоваться. Они здесть только для тестовых целей.
	public Sort() {
	}

	public Sort(String property, String direction) {
		this.property = property;
		this.direction = direction;
	}

	public static Sort fromString(String json) {
		Sort sort = new Sort();
		Matcher matcher = pattern.matcher(json);
		if (matcher.find()) {
			sort.property = matcher.group("property");
			sort.direction = matcher.group("direction");
		}
		return sort;
	}

	/**
	 * Форирует строку сортировки.
	 *
	 * @return строка
	 */
	@Override
	public String toString() {
		if (property != null && direction != null) {
			String field = null;
			switch (property) {
				case "questionType":
				case "executor":
				case "status":
				case "execOrg":
				case "notiStat":
				case "litera":
					// Добавляем сортировку по id, т.к. почему-то при сортировке по справочнику
					// часто отдается одна и та же страница, 
					// когда очень много одинаковых значений, больше чем помещается на страницу
					// это особенность Oracle, Postgresql и говорят что MySql тоже при определенных
					// условиях, т.е. вроде моих
					return " ORDER BY " + property + " " + direction + ",id " + direction;
				case "number":
					return  " ORDER BY j.numSufix " + direction + ",j.numPrefix " + direction;
				case "otKogo":
					field = property;
					break;
				case "regDate":
				case "planDate":
				case "execDate":
					field = "j." + property;
			}

			if (field != null) {
				return " ORDER BY " + field + " " + direction;
			}
		}
		return "";
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Sort) {
			Sort other = (Sort) obj;
			return Objects.equals(property,other.property)
					&& Objects.equals(direction,other.direction);
		}
		return false;
	}

	@Override
	public int hashCode() {
		int hash = 3;
		hash = 13 * hash + Objects.hashCode(this.property);
		hash = 13 * hash + Objects.hashCode(this.direction);
		return hash;
	}

}
