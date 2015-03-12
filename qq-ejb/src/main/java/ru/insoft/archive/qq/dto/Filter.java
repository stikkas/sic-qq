package ru.insoft.archive.qq.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Класс для передачи критериев поиска
 *
 * @author Благодатских С.
 */
public class Filter {

	/**
	 * Поле, по которому ограничиваем поиск
	 */
	private String property;
	/**
	 * Значение, ограничиваеющее поиск
	 */
	private Object value;

	/**
	 * Список всех полей для поиска
	 */
	private List<Filter> filters;

	/**
	 * Строка для поиска. начинается с ' AND '
	 */
	private String condition;

	private static final Pattern dictPattern = Pattern.compile(
			"\\{\"property\":\"(?<dictp>litera|questionType|status|executor|"
			+ "notiStat|execOrg)\",\"value\":(?<dictv>\\d+)\\}");

	private static final Pattern datePattern = Pattern.compile(
			"\\{\"property\":\"(?<datep>regDate|execDate|planDate)\","
			+ "\"value\":\"(?<datev>\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})\"\\}");

	private static final Pattern linePattern = Pattern.compile(
			"\\{\"property\":\"(?<linep>number|otKogo)\","
			+ "\"value\":\"(?<linev>(\\p{L}|\\P{L}|\\w|\\.|\"|'|,|\\s)*?)\"\\}");

	private static final Pattern fullPattern = Pattern.compile("^\\[((" + dictPattern.pattern() + "|"
			+ datePattern.pattern() + "|" + linePattern.pattern() + "),?){1,9}\\]$");

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

	/**
	 * Исползутся для отдельного фильтра, предоставляющего один критерий
	 * ограничения
	 *
	 * @param property поле ограничения
	 * @param value значение ограничения
	 */
	private Filter(String property, Object value) {
		this.property = property;
		this.value = value;
	}

	/**
	 * Используется для созданияю объединяющего фильтра
	 */
	private Filter() {
		filters = new ArrayList<>();
		condition = "";
	}

	/**
	 * Типы объектов используемых фильтром
	 */
	private static enum ObjectType {

		STRING, LONG, DATE
	};

	/**
	 * Преобразует json строку в объект. Выбираем преобразование с помощью
	 * регулярок по тем же соображениям что и сортировку.
	 *
	 * @param json строка определенного формата
	 * @return объект Filter
	 */
	public static Filter fromString(String json) {

		Filter filter = new Filter();

		try {
			if (fullPattern.matcher(json).matches()) {
				createFilter(dictPattern.matcher(json), "dictp", "dictv", ObjectType.LONG, filter);
				createFilter(datePattern.matcher(json), "datep", "datev", ObjectType.DATE, filter);
				createFilter(linePattern.matcher(json), "linep", "linev", ObjectType.STRING, filter);
			} else {
				throwError(json);
			}

		} catch (Exception ex) {
			throwError(json);
		}
		return filter;
	}

	private static <T> void createFilter(Matcher matcher, String pgroup, String vgroup,
			ObjectType type, Filter filter) throws ParseException {
		int start = 0;
		while (matcher.find(start)) {
			String prop = matcher.group(pgroup);
			String val = matcher.group(vgroup);

			start = matcher.end();

			if (prop.equals("number")) {
				addNumberProperty(filter, val);
				continue;
			}

			switch (prop) {
				case "litera":
				case "questionType":
				case "status":
				case "executor":
				case "notiStat":
				case "execOrg":
					filter.condition += " AND j." + prop + "Id = :" + prop;
					break;
				case "regDate":
				case "execDate":
				case "planDate":
					filter.condition += " AND trunc(j." + prop + ") = trunc(:" + prop + ")";
					break;
				case "otKogo":
					filter.condition += " AND (lower(j.organization) like :"
							+ prop + " OR lower(j.famaly) like :" + prop + ")";
			}

			filter.filters.add(new Filter(prop, parseObject(val, type)));
		}
	}

	/**
	 * Добавляет фильтр поиска по номеру запроса. В случае неправильной строки
	 * номера не должны найти записей.
	 *
	 * @param filter общий фильтр
	 * @param value значение номера
	 */
	private static void addNumberProperty(Filter filter, String value) {
		String prefix = "numPrefix";
		String sufix = "numSufix";
		String[] parts = value.split("/");
		Long prefixVal;
		Integer sufixVal;
		try {
			prefixVal = Long.parseLong(parts[0]);
			sufixVal = Integer.parseInt(parts[1]);
		} catch (Exception ex) {
			prefixVal = -1l;
			sufixVal = -1;
		}
		filter.condition += " AND j." + prefix + " = :" + prefix + " AND j." + sufix + " = :" + sufix;
		filter.filters.add(new Filter(prefix, prefixVal));
		filter.filters.add(new Filter(sufix, sufixVal));
	}

	/**
	 * Метод для запуска сообщения с обшибкой для клиента
	 *
	 * @param json полученая json строка в запросе
	 */
	private static void throwError(String json) {
		throw new RuntimeException(json);
		/*
		throw new WebApplicationException(Response.status(Response.Status.PRECONDITION_FAILED)
				.entity("Плохой запрос: " + json).type(MediaType.TEXT_PLAIN).build());
		*/
	}

	/**
	 * Преобразует строку либо к дате либо к числу либо к строке
	 */
	private static Object parseObject(String source, ObjectType type) throws ParseException {
		if (type == ObjectType.DATE) {
			return dateFormat.parse(source);
		} else if (type == ObjectType.LONG) {
			return Long.valueOf(source);
		}
		System.out.println(source);
		return "%" + source.toLowerCase() + "%";
	}

	public String getProperty() {
		return property;
	}

	public Object getValue() {
		return value;
	}

	public List<Filter> getFilters() {
		return filters;
	}

	public String getCondition() {
		return condition;
	}

}
