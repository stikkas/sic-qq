package ru.insoft.archive.qq.producer;

import java.text.SimpleDateFormat;
import javax.enterprise.inject.Produces;

/**
 * Производит различные форматы.
 * @author Благодатских С.
 */
public class Formats {

	@Produces
	public SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
}
