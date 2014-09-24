package ru.insoft.archive.qq.service;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import ru.insoft.archive.qq.entity.Execution;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("execution")
public class ExecutionFacadeREST extends AbstractFacade<Execution> {

	public ExecutionFacadeREST() {
		super(Execution.class);
	}

	@POST
	@Path("{id}")
	@Consumes({"application/json"})
	public void create(@PathParam("id") Long id, Execution entity) {
		super.create(entity);
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	public void edit(@PathParam("id") Long id, Execution entity) {
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
	public Execution findById(@PathParam("id") Long id) {
		return super.find(id);
	}

}
