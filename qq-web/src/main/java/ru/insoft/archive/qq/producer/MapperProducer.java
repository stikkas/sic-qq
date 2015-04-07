package ru.insoft.archive.qq.producer;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.TimeZone;
import javax.enterprise.inject.Produces;
import org.codehaus.jackson.map.ObjectMapper;

/**
 *
 * @author Благодатских С.
 */
public class MapperProducer {

	@Produces
	public ObjectMapper getMapper() {
		ObjectMapper mapper = new ObjectMapper();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");
		dateFormat.setTimeZone(TimeZone.getDefault());
		mapper.setDateFormat(dateFormat);
		return mapper;
	}
}
