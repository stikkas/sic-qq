package ru.insoft.archive.qq.dto;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonToken;
import org.codehaus.jackson.map.MappingJsonFactory;

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
	 * Преобразует json строку в объект. Регулярные выражения себя не оправдали
	 * в отношении юникодовых последовательностей (\u0040..) поэтому без всяких
	 * бубнов используем то что работает.
	 *
	 * @param json строка определенного формата
	 * @return объект Filter
	 */
	public static Filter fromString(String json) {

		try {
			Filter filter = new Filter(); // Общий фильтр, содержащий в себе другие

			JsonParser parser = new MappingJsonFactory().createJsonParser(json);

			JsonToken current = parser.nextToken();
			if (current == JsonToken.START_ARRAY) {
				current = parser.nextToken(); // Должен начинаться объект
				while (current != JsonToken.END_ARRAY) { // Перебираем все объекты пока не закончится массив или выпадет ошибка
					if (current != JsonToken.START_OBJECT) { // Каждый заход цикла начинается с нового объекта
						throw new RuntimeException("Неправильный формат данных");
					}

					// Локальные переменные для временного хранения промежуточных данных
					String property = null;
					Object value = null;
					boolean added = false; // Определяет был ли добавлен фильтр, нужен для параметра number

					for (int i = 0; i < 2; ++i) { // Каждый объект имеет два свойства - property и value
						parser.nextToken(); //Токен имени свойста
						String fieldName = parser.getCurrentName();
						if (fieldName.equals("property")) {
							parser.nextToken(); // Токен значения свойста (Всегда латиница из определенного набора)
							property = parser.getText();
						} else if (fieldName.equals("value")) {
							parser.nextToken(); // Токен значения свойста (Можеть быть строка даты формата '2015-03-22T00:03:00',
							// число (long) или текст с юникодовой последовательностью)
							switch (property) { // если value будет идти раньше property то тут будет NullPointerException
								case "litera":
								case "questionType":
								case "status":
								case "executor":
								case "notiStat":
								case "execOrg":
									filter.condition += " AND j." + property + "Id = :" + property;
									value = parser.getLongValue();
									break;
								case "regDate":
								case "execDate":
								case "planDate":
									filter.condition += " AND trunc(j." + property + ") = trunc(:" + property + ")";
									value = dateFormat.parse(parser.getText());
									break;
								case "otKogo":
									filter.condition += " AND (lower(j.organization) like :"
											+ property + " OR lower(j.famaly) like :" + property + ")";
									value = "%" + parser.getText().toLowerCase() + "%";
									break;
								case "number":
									addNumberProperty(filter, parser.getText());
									added = true;
									break;
								default:
									throw new RuntimeException("Недопустимое значение критерия поиска: " + property);
							}
						} else {
							throw new RuntimeException("Неизвестное свойство объекта: " + fieldName);
						}
					}
					current = parser.nextToken();
					if (current != JsonToken.END_OBJECT) {
						throw new RuntimeException("Неправильный формат данных");
					}
					if (!added) {
						filter.filters.add(new Filter(property, value));
					}
					// Следующий объект или конец массива
					current = parser.nextToken();
				}
			}

			return filter;
		} catch (IOException | ParseException ex) {
			throw new RuntimeException(ex.getMessage());
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
