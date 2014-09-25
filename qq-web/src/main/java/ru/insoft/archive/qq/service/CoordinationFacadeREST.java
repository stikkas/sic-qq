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
import ru.insoft.archive.qq.entity.Coordination;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("coordination")
public class CoordinationFacadeREST extends AbstractFacade<Coordination> {

	public CoordinationFacadeREST() {
		super(Coordination.class);
	}

	@POST
	@Consumes({"application/json"})
	public void createEntity(Coordination entity) {
		super.create(entity);
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	public void edit(@PathParam("id") Long id, Coordination entity) {
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
	public Coordination find(@PathParam("id") Long id) {
		return super.find(id);
	}

	@GET
	@Produces({"application/json"})
	public List<Coordination> findByQuestion(@QueryParam("filter") QuestionFilter filter) {
		return super.findByQuestion(filter.getId());
	}
}
