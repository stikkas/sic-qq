package ru.insoft.archive.qq.service;

import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import ru.insoft.archive.core_model.table.desc.DescriptorGroup;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("descriptorgroup")
public class DescriptorGroupFacadeREST extends AbstractFacade<DescriptorGroup> {

	public DescriptorGroupFacadeREST() {
		super(DescriptorGroup.class);
	}

	@GET
	@Path("{id}")
	@Produces({"application/json"})
	@Override
	public DescriptorGroup find(@PathParam("id") Long id) {
		return super.find(id);
	}

}
