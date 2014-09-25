package ru.insoft.archive.qq.service;

import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.insoft.archive.qq.entity.SendAction;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("sendaction")
public class SendActionFacadeREST extends AbstractFacade<SendAction> {

	public SendActionFacadeREST() {
		super(SendAction.class);
	}

	@POST
	@Consumes({"application/json"})
	public void createEntity(SendAction entity) {
		super.create(entity);
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	public void edit(@PathParam("id") Long id, SendAction entity) {
		super.edit(entity);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		super.remove(super.find(id));
	}

	@GET
	@Path("{id}")
	@Produces({"application/json"})
	@Override
	public SendAction find(@PathParam("id") Long id) {
		return super.find(id);
	}

	@GET
	@Produces({"application/json"})
	public List<SendAction> findByQuestion(@QueryParam("filter") QuestionFilter filter) {
		return super.findByQuestion(filter.getId());
	}
}
