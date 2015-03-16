package ru.insoft.archive.qq.service;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.activation.MimetypesFileTypeMap;
import javax.inject.Inject;
import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import ru.insoft.archive.qq.ejb.DictCodes;

/**
 * Отдает файл, принадлежащий запросу
 *
 * @author Благодатских С.
 */
@Path("files")
public class StaticFileService {

	@Inject
	private UserProfile up;

	/**
	 * Возвращает запрашиваемый файл. Используется для того чтобы обеспечить
	 * безопасность. Файлы отдаваемые Jboss: 1. Не защищены паролем 2. Не могут
	 * быть привязаны к разным виртуальным хостам
	 *
	 * @param typeOfFile тип файла (заявителя, уведомления, выполнения)
	 * @param questionId идентификатор запроса
	 * @param fileName имя файла
	 * @param response объект ответа
	 */
	@GET
	@Path("{type}/{id}/{filename}")
	public void getFile(@PathParam("type") String typeOfFile,
			@PathParam("id") Long questionId, @PathParam("filename") String fileName,
			@Context HttpServletResponse response) {

		switch (typeOfFile) {
			case DictCodes.Q_VALUE_FILE_TYPE_ANSWER:
				typeOfFile = up.getReplyFilesPath();
				break;
			case DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS:
				typeOfFile = up.getApplicantFilesPath();
				break;
			case DictCodes.Q_VALUE_FILE_TYPE_INFO:
				typeOfFile = up.getNotiFilesPath();
				break;
			default:
				throw new RuntimeException("Неизвестный тип файла: " + typeOfFile);
		}

		String encodedFileName = "xxxxxxx";
		try {
			encodedFileName = MimeUtility.encodeText(fileName);
		} catch (UnsupportedEncodingException ex) {
			Logger.getLogger(StaticFileService.class.getName()).log(Level.WARNING, null, ex);
		}
		response.setCharacterEncoding("utf-8");
		response.setHeader("Content-Disposition", "attachment; filename=\"" + encodedFileName + "\"");
		response.setContentType(new MimetypesFileTypeMap().getContentType(fileName)
				+ "; name=\"" + encodedFileName + "\"");
		try (OutputStream out = response.getOutputStream()) {
			Files.copy(Paths.get(up.getQqPath(), typeOfFile, questionId.toString(), fileName), out);
		} catch (IOException ex) {
			Logger.getLogger(StaticFileService.class.getName()).log(Level.SEVERE, null, ex);
		}
	}
}
