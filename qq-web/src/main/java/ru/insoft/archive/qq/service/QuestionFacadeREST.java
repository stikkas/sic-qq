package ru.insoft.archive.qq.service;

import java.util.Calendar;
import java.util.GregorianCalendar;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;
import ru.insoft.archive.qq.entity.Applicant;
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
				new Clause<Long>("prefixNum", entity.getPrefixNum()),
				new Clause<Long>("sufixNum", entity.getSufixNum()),
				new Clause<Long>("litera", entity.getLitera())
			});
		} catch (NoResultException e) {
			return null;
		}
	}

	/**
	 * Создает новый запрос. Назначает ему номер.
	 *
	 * @param entity Объект запроса
	 * @return идентификатор нового запроса
	 */
	@POST
	@Produces({"application/json"})
	@Consumes({"application/json"})
	public Question createEntity(Question entity) {
		Long suffix = (long) new GregorianCalendar().get(Calendar.YEAR);
		Long prefix = em.createNamedQuery("Question.maxNumber", Long.class)
				.setParameter("year", suffix)
				.setParameter("litera", entity.getLitera())
				.getSingleResult();
		if (prefix == null) {
			prefix = 1l;
		} else {
			++prefix;
		}
		entity.setPrefixNum(prefix);
		entity.setSufixNum(suffix);
		super.create(entity);
		Applicant applicant = entity.getApplicant();
		applicant.setId(entity.getId());
		em.persist(applicant);
		return entity;
		/*
		 Question check = exists(entity);
		 if (check == null) {
		 return super.create(entity).getId();
		 }

		 ResponseBuilder builder = Response.status(Status.NOT_FOUND);
		 builder.header("Content-Type", "text/html; charset=utf-8");
		 builder.entity("<p>Запрос с таким номером уже существует</p>");
		 throw new WebApplicationException(builder.build());
		 */
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public void edit(@PathParam("id") Long id, Question entity) {
//		Question check = exists(entity);
//		if (check == null || Objects.equals(check.getId(), id)) {
			super.edit(entity);
//		} else {
//			ResponseBuilder builder = Response.status(Status.NOT_FOUND);
//			builder.header("Content-Type", "text/html; charset=utf-8");
//			builder.entity("<p>Запрос с таким номером уже существует</p>");
//			throw new WebApplicationException(builder.build());
//		}
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

	@GET
	@Path("allowedid/{litera}/{sufix}")
	@Produces({"application/json"})
	public Long getAllowedId(@PathParam("litera") Long litera,
			@PathParam("sufix") Long sufix) {
		Question entity = super.<Long>getMaximumValue(new Clause[]{
			new Clause<Long>("litera", litera),
			new Clause<Long>("sufixNum", sufix)
		}, "prefixNum");
		if (entity != null) {
			return entity.getPrefixNum() + 1;
		}
		return 1L;
	}

}
