package ru.insoft.archive.qq.dto;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.codehaus.jackson.map.ObjectMapper;


/**
 * Класс для передачи сортировки в табличных данных
 *
 * @author Благодатских С.
 */
public class Sort {

	/**
	 * Поле, по которому сортируем
	 */
	private String property;
	/**
	 * Направление, в котором сортируем
	 */
	private String direction;

	public static Sort fromString(String json) {
		try {
			return new ObjectMapper().readValue(json, Sort[].class)[0];
		} catch (IOException ex) {
			Logger.getLogger(Sort.class.getName()).log(Level.SEVERE, null, ex);
		}
		return new Sort();
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getDirection() {
		return direction;
	}

	public void setDirection(String direction) {
		this.direction = direction;
	}

}
