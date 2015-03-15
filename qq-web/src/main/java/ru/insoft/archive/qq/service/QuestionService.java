package ru.insoft.archive.qq.service;

import java.io.File;
import ru.insoft.archive.qq.service.dto.SubmitAnswer;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
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
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.codehaus.jackson.map.ObjectMapper;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
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
	 * Создает новый запрос и обновляет существующий ExtJS (по ходу и вообще
	 * HTML) submit action может отправлять только POST или GET Поэтому
	 * приходится в одном методе разруливать разные ситуации
	 *
	 * @param req объект запроса
	 * @return
	 */
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public SubmitAnswer<Question> createQuestion(@Context HttpServletRequest req) {
		try {
			req.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException ex) {
			// В этом случае русские имена файлов будут в неправильной кодировке
			Logger.getLogger(QuestionService.class.getName()).log(Level.SEVERE, null, ex);
		}

		DiskFileItemFactory factory = new DiskFileItemFactory();

		// Максимальный буфера данных в байтах,
		// при его привышении данные начнут записываться на диск во временную директорию
		// устанавливаем четыре мегабайт
		factory.setSizeThreshold(4096 * 1024);
		// устанавливаем временную директорию
		factory.setRepository(new File(System.getProperty("jboss.server.temp.dir")));
		//Создаём сам загрузчик
		ServletFileUpload upload = new ServletFileUpload(factory);
		List<FileItem> items;
		try {
			items = (List<FileItem>) upload.parseRequest(req);
		} catch (FileUploadException ex) {
			Logger.getLogger(QuestionService.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Невозможно разобрать данные запроса");
		}

		List<FileItem> files = new ArrayList<>();
		for (FileItem item : items) {
			if (item.isFormField()) {
				if (item.getFieldName().equals("model")) {
					try {
						Question question = new ObjectMapper().readValue(item.getString(), Question.class);
					} catch (IOException ex) {
						Logger.getLogger(QuestionService.class.getName()).log(Level.SEVERE, null, ex);
					}
				}
			} else if (!item.getName().isEmpty()) {
				System.out.println(item.getName());
				files.add(item);
			}
		}
		return new SubmitAnswer<>(true, new Question());
	}

//	public SubmitAnswer<Question> createQuestion(MultipartFormDataInput input) {
//		Map<String, List<InputPart>> parts = input.getFormDataMap();
//
//		Question question = getEntity(parts.remove("model").get(0));
//		Long id = question.getId();
//		if (id != null) {
//			return updateQuestion(id, question, parts);
//		}
//
//		question = qd.create(question);
//		id = question.getId();
//		// при создании не может быть удаленных файлов
//		parts.remove("deletedFiles");
//		af.createFiles(parts, Paths.get(up.getQqPath(), up.getApplicantFilesPath(), id.toString()).toString(),
//				DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS, id);
//
//		return new SubmitAnswer<>(true, qd.find(id));
//	}
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
	 * @param input информация для обновления
	 * @return запрос
	 */
	private SubmitAnswer<Question> updateQuestion(Long id, Question question, Map<String, List<InputPart>> parts) {

		String dir = Paths.get(up.getQqPath(), up.getApplicantFilesPath(), id.toString()).toString();

		af.removeFiles(parts.remove("deletedFiles").get(0), dir, DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS, id);
		af.createFiles(parts, dir, DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS, id);

		return new SubmitAnswer<>(true, qd.update(question));
	}

	/**
	 * Извлекает сущность из формы, пришедшей от клиента
	 *
	 * @param part данные формы
	 * @return сущность запроса
	 */
	private Question getEntity(InputPart part) {
		try {
			return new ObjectMapper().readValue(part.getBodyAsString(), Question.class);
		} catch (IOException ex) {
			Logger.getLogger(QuestionService.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Неправильный формат сущности");
		}
	}

}
