package ru.insoft.archive.qq.service;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import ru.insoft.archive.qq.dao.QuestionDao;
import ru.insoft.archive.qq.entity.Question;

/**
 * Класс для работы с вкладкой "Регистрация запроса"
 *
 * @author Благодатских С.
 */
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Path("question")
public class QuestionService {

	@Inject
	private QuestionDao qd;

	/**
	 * Возвращает запрос с интересующим id
	 *
	 * @param id идентификатор запроса
	 * @return найденный запрос или null
	 */
	@Path("{id}")
	@GET
	public Question getQuestion(@PathParam("id") Long id) {
		return qd.find(id);
	}

	/**
	 * Создает новый запрос
	 *
	 * @param entity запрос
	 * @return запрос
	 */
	@POST
	public Question createQuestion(Question entity) {
		return qd.create(entity);
	}

	/**
	 * Удаляет запрос с указанным id
	 *
	 * @param entity запрос для удаления
	 */
	@Path("{id}")
	@DELETE
	public void removeQuestion(Question entity) {
		qd.remove(entity);
	}

	/**
	 * Обновляет информацию у уже существующего запроса
	 *
	 * @param entity информация для обновления
	 * @return запрос
	 */
	@Path("{id}")
	@PUT
	public Question updateQuestion(Question entity) {
		return qd.update(entity);
	}

}
