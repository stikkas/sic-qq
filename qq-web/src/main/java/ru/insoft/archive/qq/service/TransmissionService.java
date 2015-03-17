package ru.insoft.archive.qq.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import ru.insoft.archive.qq.dao.TransmissionDao;
import ru.insoft.archive.qq.entity.Assistant;
import ru.insoft.archive.qq.entity.Transmission;

/**
 * Сервис для обслуживания запросов по передачи на исполнение
 *
 * @author Благодатских С.
 */
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Path("transmission")
public class TransmissionService {

	@Inject
	TransmissionDao td;

	@GET
	@Path("{id}")
	public Transmission getTransmission(@PathParam("id") Long id) {
		return td.find(id);
	}

	/**
	 * Обновляет данные по передачи на исполнение. Ассоциации обрабатываю
	 * вручную, так работает и не сложно.
	 *
	 * @param entity сущность для обновления
	 * @param assistants список соисполнителей
	 * @return обновленная сущность
	 */
	@PUT
	@Path("{id}")
	public Transmission updateTransmission(Transmission entity,
			@QueryParam("assistants") String assistants) {
		try {
			entity.setAssistants(Arrays.asList(new ObjectMapper().readValue(assistants, Assistant[].class)));
			return td.update(entity);
		} catch (IOException ex) {
			Logger.getLogger(TransmissionService.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Ошибка данных");
		}
	}

	@DELETE
	@Path("{id}")
	public void removeTransmission(@PathParam("id") Long id) {
		td.remove(id);
	}
}
