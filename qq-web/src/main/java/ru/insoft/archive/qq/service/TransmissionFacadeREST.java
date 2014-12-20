package ru.insoft.archive.qq.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import ru.insoft.archive.qq.entity.Assistant;
import ru.insoft.archive.qq.entity.Transmission;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("transmission")
public class TransmissionFacadeREST extends AbstractFacade<Transmission> {

	public TransmissionFacadeREST() {
		super(Transmission.class);
	}
	/*
	 @POST
	 @Path("{id}")
	 @Consumes({"application/json"})
	 public void create(@PathParam("id") Long id, Transmission entity) {
	 super.create(entity);
	 }
	 */

	/**
	 * Сохраняет данные по "Передача на исполнение". Всегда выполняется только
	 * PUT, т.к. данные всегда должны быть привязаны к запросу и, следовательно,
	 * должны иметь id запроса.
	 *
	 * @param id идентификатор запроса
	 * @param entity данные по передачи (с соисполнителями)
	 */
	@PUT
	@Path("{id}")
	@Consumes({"application/json"})
	public void edit(@PathParam("id") Long id, Transmission entity) {
		Transmission t = super.find(id);
		if (t == null) {
			super.create(entity);
		} else {
			Set<Assistant> news = entity.getAssistants();
			List<Assistant> toUpdate = new ArrayList<>();
			for (Assistant old : (List<Assistant>) em.createNamedQuery("Assistant.findByTrans")
					.setParameter("trans", entity).getResultList()) {

				if (!news.contains(old)) {
					em.remove(old);
				} else {
					toUpdate.add(old);
				}
			}
			for (Assistant ass : news) {
				if (toUpdate.contains(ass)) {
					em.merge(ass);
				} else {
					em.persist(ass);
				}
			}
			super.edit(entity);
		}
	}

	/**
	 * Удаляет данные по "Передача на исполнение". Ассоциации (соисполнители)
	 * удаляются автоматически средствами базы (on delete cascade)
	 *
	 * @param id идентификатор запроса, к которому относится информация
	 */
	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		super.remove(id);
	}

	/**
	 * Возвращает данные для "Передача на исполнение"
	 *
	 * @param id идентификатор запроса
	 * @return данные о передачи на исполнение
	 */
	@GET
	@Path("{id}")
	@Produces({"application/json"})
	@Override
	public Transmission find(@PathParam("id") Long id) {
		return super.find(id);
	}

}
