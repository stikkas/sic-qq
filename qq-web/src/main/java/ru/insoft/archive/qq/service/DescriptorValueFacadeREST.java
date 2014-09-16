package ru.insoft.archive.qq.service;

import javax.ejb.Stateless;
import javax.ws.rs.Path;
import ru.insoft.archive.core_model.table.desc.DescriptorValue;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("descriptorvalue")
public class DescriptorValueFacadeREST extends AbstractFacade<DescriptorValue> {

	public DescriptorValueFacadeREST() {
		super(DescriptorValue.class);
	}
}
