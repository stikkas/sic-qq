package ru.insoft.archive.qq.service;

import java.util.Objects;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import ru.insoft.archive.qq.entity.Question;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("question")
public class QuestionFacadeREST extends AbstractFacade<Question> {

	public QuestionFacadeREST() {
		super(Question.class);
	}

	/**
	 * Проверяет есть ли в базе запись с таким же номером.
	 *
	 * @param entity запись для сохранения или обновления
	 * @return Строку с описанием ошибки
	 */
	private Question exists(final Question entity) {
		try {
			return super.findEntityWhereAnd(new Clause[]{
				new Clause<>("prefixNum", entity.getPrefixNum()),
				new Clause<>("sufixNum", entity.getSufixNum())
			});
		} catch (NoResultException e) {
			return null;
		}
	}

	@POST
	@Produces({"application/json"})
	@Consumes({"application/json"})
	public Object createEntity(Question entity) {
		Question check = exists(entity);
		if (check == null) {
			return super.create(entity).getId();
		}
		return "Запрос с таким номером уже существует";
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public Object edit(@PathParam("id") Long id, Question entity) {
		Question check = exists(entity);
		if (check == null || Objects.equals(check.getId(), id)) {
			super.edit(entity);
			return true;
		}
		return "Запрос с таким номером уже существует";
	}

	@DELETE
	@Path("{id}")
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	@Override
	public void remove(@PathParam("id") Long id) {
		super.remove(id);
	}

	@GET
	@Path("{id}")
	@Produces({"application/json"})
	public Question findById(@PathParam("id") Long id) {
		return super.find(id);
	}

}
