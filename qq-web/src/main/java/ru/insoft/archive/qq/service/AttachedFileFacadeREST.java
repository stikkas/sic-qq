package ru.insoft.archive.qq.service;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import ru.insoft.archive.qq.entity.AttachedFile;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("attachedfile")
public class AttachedFileFacadeREST extends AbstractFacade<AttachedFile> {

	public AttachedFileFacadeREST() {
		super(AttachedFile.class);
	}

	@POST
	@Path("{id}")
	@Consumes({"application/json"})
	public void create(@PathParam("id") Long id, AttachedFile entity) {
		super.create(entity);
	}

	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	public void edit(@PathParam("id") Long id, AttachedFile entity) {
		super.edit(entity);
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		super.remove(super.find(id));
	}

}
