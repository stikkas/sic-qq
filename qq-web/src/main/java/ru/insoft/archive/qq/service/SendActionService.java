package ru.insoft.archive.qq.service;

import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
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
	public List<SendAction> getActions(@QueryParam("id") Long questionId) {
		return sa.find(questionId);
	}

	@POST
	public List<SendAction> updateActions(List<SendAction> actions, Long questionId) {
		return sa.update(actions, questionId);
	}

	@DELETE
	public void removeActions(Long questionId) {
		sa.remove(questionId);
	}
}
