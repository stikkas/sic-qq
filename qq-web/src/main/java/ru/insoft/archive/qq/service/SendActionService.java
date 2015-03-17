package ru.insoft.archive.qq.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import ru.insoft.archive.qq.dao.SendActionDao;
import ru.insoft.archive.qq.entity.SendAction;

/**
 * Класс для работы с таблицей "Способы отправки"
 *
 * @author Благодатских С.
 */
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Path("sendaction")
public class SendActionService {

	@Inject
	private SendActionDao sa;

	@GET
	@Path("{id}")
	public List<SendAction> getActions(@PathParam("id") Long questionId) {
		return sa.find(questionId);
	}

	@POST
	@Path("{id}")
	public List<SendAction> updateActions(@PathParam("id") Long questionId,
			@QueryParam("data") String data) {
		try {
			return sa.update(Arrays.asList(new ObjectMapper().readValue(data, SendAction[].class)), questionId);
		} catch (IOException ex) {
			Logger.getLogger(SendActionService.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Неправильный формат данных");
		}
	}
}
