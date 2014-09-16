package ru.insoft.archive.qq.service;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
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

	@POST
	@Produces({"application/json"})
	@Consumes({"application/json"})
	public Long createQ(Question entity) {
		return super.create(entity).getId();
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	@Produces({"application/json"})
	public Boolean edit(@PathParam("id") Long id, Question entity) {
		super.edit(entity);
		return true;
	}

	@DELETE
	@Path("{id}")
	@Produces({"application/json"})
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public Boolean remove(@PathParam("id") Long id) {
		Question q = super.find(id);
		if (q != null) {
			super.remove(q);
		}
		return true;
	}

	@GET
	@Path("{id}")
	@Produces({"application/json"})
	public Question findById(@PathParam("id") Long id) {
		return super.find(id);
	}

}
