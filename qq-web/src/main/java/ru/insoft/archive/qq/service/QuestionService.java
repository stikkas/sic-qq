package ru.insoft.archive.qq.service;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jackson.map.ObjectMapper;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;
import ru.insoft.archive.qq.dao.AttachedFileDao;
import ru.insoft.archive.qq.dao.QuestionDao;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Question;

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
	private AttachedFileDao afd;

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
	 * Создает новый запрос
	 *
	 * @param input
	 * @return
	 */
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	public SubmitAnswer<Question> createQuestion(MultipartFormDataInput input) {
		Map<String, List<InputPart>> parts = input.getFormDataMap();
		String saveDir = Paths.get(up.getRootPath(), up.getQqPath(), up.getApplicantFilesPath()).toString();

		Set<String> savedFiles = new HashSet<>();
		Question question = null;

		for (String name : parts.keySet()) {
			if (name.equals("question")) {
				question = getEntity(parts.get(name).get(0));
			} else if (!name.equals("deletedFiles")) { // при сооздании не может быть удаленных файлов
				for (InputPart part : parts.get(name)) {
					String header = part.getHeaders().get("Content-Disposition").get(0);
					for (String chunk : header.split(";")) {
						if (chunk.trim().startsWith("filename")) {
							String fileName = chunk.split("=", 2)[1];
							fileName = fileName.substring(1, fileName.length() - 1);
							if (saveFile(Paths.get(saveDir, fileName), part)) {
								savedFiles.add(fileName);
							}
							break;
						}
					}

				}
			}
		}
		question = qd.create(question);
		afd.create(savedFiles, DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS, question.getId());
		return new SubmitAnswer<>(true, qd.find(question.getId()));
	}

	private boolean saveFile(java.nio.file.Path fileName, InputPart part) {
		try (OutputStream out = new BufferedOutputStream(Files.newOutputStream(fileName));
				InputStream in = part.getBody(InputStream.class, null)) {
			byte[] buffer = new byte[4096];
			int readBytes;
			while ((readBytes = in.read(buffer)) > 0) {
				out.write(buffer, 0, readBytes);
			}
		} catch (IOException ex) {
			Logger.getLogger(QuestionService.class.getName()).log(Level.SEVERE, null, ex);
			return false;
		}
		return true;
	}

	private Question getEntity(InputPart part) {
		try {
			return new ObjectMapper().readValue(part.getBodyAsString(), Question.class);
		} catch (IOException ex) {
			Logger.getLogger(QuestionService.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Неправильный формат сущности");
		}
	}

	/**
	 * Удаляет запрос с указанным id
	 *
	 * @param entity запрос для удаления
	 */
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@DELETE
	public void removeQuestion(Question entity) {
		qd.remove(entity);
	}

	/**
	 * Обновляет информацию у уже существующего запроса
	 *
	 * @param entity информация для обновления
	 * @return запрос
	 */
	@PUT
	public Question updateQuestion(Question entity) {
		return qd.update(entity);
	}

}
