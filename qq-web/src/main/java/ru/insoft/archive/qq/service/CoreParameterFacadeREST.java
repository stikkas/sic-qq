package ru.insoft.archive.qq.service;

import java.util.List;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.insoft.archive.core_model.table.core.CoreParameter;

/**
 * Получаем данные о настройках системы таких как путь для статических
 * (прикрепленных) файлов и т.д.
 *
 * @author С. Благодатских
 */
@Stateless
@Path("coreparameter")
public class CoreParameterFacadeREST extends AbstractFacade<CoreParameter> {

	public CoreParameterFacadeREST() {
		super(CoreParameter.class);
	}

	@GET
	@Produces({"application/json"})
	public List<CoreParameter> findRange(@QueryParam("code") String[] codes) {
		Clause[] clauses = new Clause[codes.length];
		for (int i = 0; i < codes.length; ++i) {
			clauses[i] = new Clause<>("code", codes[i]);
		}
		return super.coreParametersByCode(clauses);
	}

}
