package ru.insoft.archive.qq.service;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import javax.annotation.PostConstruct;
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
import javax.ws.rs.core.MediaType;
import ru.insoft.archive.qq.entity.Applicant;
import ru.insoft.archive.qq.entity.Execution;
import ru.insoft.archive.qq.entity.Question;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("question")
public class QuestionFacadeREST extends AbstractFacade<Question> {

	private static final String execStatusCode = "Q_VALUE_QSTAT_EXEC";
	private Long execStatusId;

	public QuestionFacadeREST() {
		super(Question.class);
	}

	@PostConstruct
	public void getExecStatusId() {
		List<Long> statuses = em.createQuery("SELECT d.id from DescriptorValue d where d.code = :code",
				Long.class)
				.setParameter("code", execStatusCode)
				.getResultList();
		execStatusId = statuses.isEmpty() ? null : statuses.get(0);
	}

	/**
	 * Создает новый запрос. Назначает ему номер.
	 *
	 * @param entity Объект запроса
	 * @return идентификатор нового запроса
	 */
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
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
		createExecutionForMotivitedRefusal(entity);
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
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public void edit(@PathParam("id") Long id, Question entity) {
//		Question check = exists(entity);
//		if (check == null || Objects.equals(check.getId(), id)) {
		super.edit(entity);
		createExecutionForMotivitedRefusal(entity);
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
	@Produces(MediaType.APPLICATION_JSON)
	public Question findById(@PathParam("id") Long id) {
		return super.find(id);
	}

	@GET
	@Path("allowedid/{litera}/{sufix}")
	@Produces(MediaType.APPLICATION_JSON)
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

	/**
	 * Создает сущность Execution для запросов с мотивиронванным отказом.
	 * Необходимо для проставления даты исполнения.
	 */
	private void createExecutionForMotivitedRefusal(Question entity) {
		if (entity.getMotivatedRefusal() && entity.getStatus().equals(execStatusId)) {
			Execution execution = new Execution(entity.getId());
			execution.setExecDate(entity.getRegDate());
			em.persist(execution);
		}
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

}
