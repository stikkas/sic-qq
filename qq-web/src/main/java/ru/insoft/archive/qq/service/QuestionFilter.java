package ru.insoft.archive.qq.service;

import javax.ws.rs.WebApplicationException;

/**
 * Класс для получения данных от ExtJS. когда ExtJs запрашивает "hasMany"
 * ассоциацию, то отправляет GET запрос со следующими параметрами:
 * <ul>
 * <li>_dc	1411555654125</li>
 * <li>filter	[{"property":"question","value":152}]</li>
 * <li>limit	25</li>
 * <li>page	1</li>
 * <li>start	0</li>
 * <ul>
 * Чтобы получить свойство filter, а точнее его свойство value нужет этот класс
 * с конструктором, в который передается строка типа
 * [{"property":"question","value":152}] или [{"property":"question"}] когда
 * запросу еще не назначен id
 *
 * @author С. Благодатских
 */
public class QuestionFilter {

	private Long id;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "QuestionFilter{" + ", id=" + id + '}';
	}

	public QuestionFilter() {
	}

	public QuestionFilter(String json) {
		String value;
		try {
			value = json.substring(json.lastIndexOf(":") + 1,
					json.lastIndexOf("}"));
			if (value.equals("\"question\"")) {
				id = -1L;
			} else {
				id = Long.parseLong(value);
			}
		} catch (Exception e) {
			throw new WebApplicationException();
		}
	}

}
