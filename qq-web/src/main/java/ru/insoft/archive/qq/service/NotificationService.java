package ru.insoft.archive.qq.service;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import org.apache.commons.fileupload.FileItem;
import ru.insoft.archive.qq.dao.NotificationDao;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Notification;
import ru.insoft.archive.qq.service.dto.SubmitAnswer;
import ru.insoft.archive.qq.service.ejb.AttachedFileBean;

/**
 * Класс для работы с вкладкой "Уведомление заявителю"
 *
 * @author Благодатских С.
 */
@Produces(MediaType.APPLICATION_JSON)
@Path("notification")
public class NotificationService {

	@Inject
	private NotificationDao nd;

	@Inject
	private AttachedFileBean af;

	@Inject
	private UserProfile up;

	/**
	 * Возвращает уведомление с интересующим id
	 *
	 * @param id идентификатор уведомления
	 * @return найденое уведомление или null
	 */
	@Path("{id}")
	@GET
	public Notification get(@PathParam("id") Long id) {
		return nd.find(id);
	}

	/**
	 * Обновляет уведомление.
	 *
	 * @param req объект запроса
	 * @return в случае успеха объект с обновленной сущностью запроса, иначе
	 * выбрасывается RuntimeError и REST механизм должен его обработать
	 */
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public SubmitAnswer<Notification> update(@Context HttpServletRequest req) {
		Map<String, String> params = new HashMap<>();
		List<FileItem> files = new ArrayList<>();
		af.parseRequest(req, params, files);

		Notification n = af.getEntity(params.get("model"), Notification.class);
		Long id = n.getId();

		String dir = Paths.get(up.getQqPath(), up.getNotiFilesPath(), id.toString()).toString();

		af.removeFiles(params.get("deletedFiles"), dir);
		if (!files.isEmpty()) {
			af.createFiles(files, dir, DictCodes.Q_VALUE_FILE_TYPE_INFO, id);
		}

		// Возвращаем сущность запроса вместе с файлами
		return new SubmitAnswer<>(true, nd.update(n));
	}

	/**
	 * Удаляет информацию о уведомлении с указанным id
	 *
	 * @param id идентификатор уведомления для удаления
	 */
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@DELETE
	public void remove(@PathParam("id") Long id) {
		nd.remove(id);
		af.removeDir(Paths.get(up.getQqPath(), up.getNotiFilesPath(), id.toString()));
	}
}
