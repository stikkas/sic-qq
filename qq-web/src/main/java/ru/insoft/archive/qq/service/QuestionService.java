package ru.insoft.archive.qq.service;

import ru.insoft.archive.qq.service.dto.SubmitAnswer;
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
import ru.insoft.archive.qq.dao.QuestionDao;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Question;
import ru.insoft.archive.qq.service.ejb.AttachedFileBean;

/**
 * Класс для работы с вкладкой "Регистрация запроса"
 *
 * @author Благодатских С.
 */
@Produces(MediaType.APPLICATION_JSON)
@Path("question")
public class QuestionService {

	@Inject
	private QuestionDao qd;

	@Inject
	private AttachedFileBean af;

	@Inject
	private UserProfile up;

	/**
	 * Возвращает запрос с интересующим id
	 *
	 * @param id идентификатор запроса
	 * @return найденный запрос или null
	 */
	@Path("{id}")
	@GET
	public Question getQuestion(@PathParam("id") Long id) {
		return qd.find(id);
	}

	/**
	 * Создает новый запрос и обновляет существующий. ExtJS (по ходу и вообще
	 * HTML) submit action может отправлять только POST или GET, поэтому
	 * приходится в одном методе разруливать разные ситуации
	 *
	 * @param req объект запроса
	 * @return в случае успеха объект с обновленной / созданной сущностью
	 * запроса, иначе выбрасывается RuntimeError и REST механизм должен его
	 * обработать
	 */
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public SubmitAnswer<Question> createQuestion(@Context HttpServletRequest req) {
		Map<String, String> params = new HashMap<>();
		List<FileItem> files = new ArrayList<>();
		af.parseRequest(req, params, files);

		Question q = af.getEntity(params.get("model"), Question.class);
		Long id = q.getId();

		if (id != null) {
			return updateQuestion(id, q, params.get("deletedFiles"), files);
		}
		q = qd.create(q);
		id = q.getId();
		if (!files.isEmpty()) {
			// Создаем файлы и заносим информацию в базу
			af.createFiles(files, Paths.get(up.getQqPath(), up.getApplicantFilesPath(), id.toString()).toString(),
					DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS, id);
		}

		// Возвращаем сущность запроса вместе с файлами
		return new SubmitAnswer<>(true, qd.find(id));

	}

	/**
	 * Удаляет запрос с указанным id
	 *
	 * @param id идентификатор запроса для удаления
	 */
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@DELETE
	public void removeQuestion(@PathParam("id") Long id) {
		qd.remove(id); // База автоматом удалит файлы из таблицы
		af.removeDir(Paths.get(up.getQqPath(), up.getApplicantFilesPath(), id.toString()));
	}

	/**
	 * Обновляет информацию у уже существующего запроса
	 *
	 * @param id идентификатор запроса
	 * @param question запрос
	 * @param deletedFiles json представление массива файлов для удаления
	 * @param files файлы, полученные в запросе клиента
	 * @return в случае успеха объект с обновленной сущностью запроса, иначе
	 * выбрасывается RuntimeError и REST механизм должен его обработать
	 */
	private SubmitAnswer<Question> updateQuestion(Long id, Question question,
			String deletedFiles, List<FileItem> files) {

		String dir = Paths.get(up.getQqPath(), up.getApplicantFilesPath(), id.toString()).toString();

		af.removeFiles(deletedFiles, dir);
		if (!files.isEmpty()) {
			af.createFiles(files, dir, DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS, id);
		}

		// Возвращаем сущность запроса вместе с файлами
		return new SubmitAnswer<>(true, qd.update(question));
	}

}
