package ru.insoft.archive.qq.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import ru.insoft.archive.qq.dao.TableDao;
import ru.insoft.archive.qq.entity.TableEntity;

/**
 * Общий сервис для табличных данных на вкладке "Исполнение запроса"
 *
 * @author Благодатских С.
 * @param <T> Тип сущности, с которой работает класс реализации
 */
@Produces(MediaType.APPLICATION_JSON)
public abstract class TableService<T extends TableEntity> {

	protected abstract TableDao<T> getDao();

	protected abstract Class<T[]> getArrayClass();

	@GET
	@Path("{id}")
	public List<T> get(@PathParam("id") Long questionId) {
		return getDao().find(questionId);
	}

	@POST
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
	public List<T> update(@PathParam("id") Long questionId,
			@FormParam("data") String data) {
		try {
			return getDao().update(Arrays.asList(new ObjectMapper().readValue(data, getArrayClass())), questionId);
		} catch (IOException ex) {
			Logger.getLogger(getClass().getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Неправильный формат данных");
		}
	}

}
