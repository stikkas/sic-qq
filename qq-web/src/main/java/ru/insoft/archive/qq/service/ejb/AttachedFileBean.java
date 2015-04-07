package ru.insoft.archive.qq.service.ejb;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.codehaus.jackson.map.ObjectMapper;
import ru.insoft.archive.qq.dao.AttachedFileDao;

/**
 * Создает и удаляет файлы
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Stateless
public class AttachedFileBean {

	private static Logger logger;

	@Inject
	private ObjectMapper om;

	@PostConstruct
	private void init() {
		if (logger == null) {
			logger = Logger.getLogger(getClass().getName());
		}
	}

	@Inject
	private AttachedFileDao afd;

	/**
	 * Разбирает запрос, пришедший от клиента.
	 *
	 * @param req http запрос
	 * @param params параметры запроса
	 * @param files файлы
	 */
	public void parseRequest(HttpServletRequest req, Map<String, String> params,
			List<FileItem> files) {
		try {
			req.setCharacterEncoding("UTF-8");
		} catch (UnsupportedEncodingException ex) {
			// В этом случае русские имена файлов будут в неправильной кодировке
			logger.log(Level.SEVERE, null, ex);
		}

		DiskFileItemFactory factory = new DiskFileItemFactory();

		// Максимальный буфера данных в байтах,
		// при его привышении данные начнут записываться на диск во временную директорию
		// устанавливаем четыре мегабайт
		factory.setSizeThreshold(4096 * 1024);
		// устанавливаем временную директорию
		factory.setRepository(new File(System.getProperty("jboss.server.temp.dir")));
		ServletFileUpload upload = new ServletFileUpload(factory);

		try {
			for (FileItem item : (List<FileItem>) upload.parseRequest(req)) {
				if (item.isFormField()) {
					params.put(item.getFieldName(), item.getString());
				} else if (item.getName().isEmpty()) {
					logger.log(Level.WARNING, "У загружаемого файла нет имени");
				} else {
					files.add(item);
				}
			}
		} catch (FileUploadException ex) {
			logger.log(Level.SEVERE, null, ex);
			throw new RuntimeException("Ошибка разбора запроса клента");
		}
	}

	/**
	 * Сохраняет файлы на файловой системе и заносит информацию в базу.
	 *
	 * @param files файлы, полученные из формы запроса
	 * @param dir папка для файлов, абсолютный путь
	 * @param type тип файлов
	 * @param id идентификатор владельца файлов
	 */
	public void createFiles(List<FileItem> files, String dir,
			String type, Long id) {

		try {
			Files.createDirectories(Paths.get(dir));
		} catch (IOException ex) {
			logger.log(Level.SEVERE, null, ex);
			throw new RuntimeException("Невозможно создать папку: " + dir);
		}

		Set<String> savedFiles = new HashSet<>();
		for (FileItem file : files) {
			String fileName = file.getName();
			if (saveFile(Paths.get(dir, fileName), file)) {
				savedFiles.add(fileName);
			}
		}

		if (!savedFiles.isEmpty()) {
			afd.create(savedFiles, type, id);
		}
	}

	/**
	 * Удаляет файлы из файловой системы и базы, deletedFiles представляет собой
	 * массив [[id, fileName],....]
	 *
	 * @param jsonArrayFiles строка с массивом файлов для удаления
	 * @param dir папка где находятся файлы
	 */
	public void removeFiles(String jsonArrayFiles, String dir) {
		try {
			String[][] files = om.readValue(jsonArrayFiles, String[][].class);
			if (files.length > 0) {
				Set<Long> ids = new HashSet<>(files.length);
				for (String[] file : files) {
					ids.add(Long.valueOf(file[0]));
					Files.deleteIfExists(Paths.get(dir, file[1]));
				}
				afd.remove(ids);
			}
		} catch (IOException ex) {
			logger.log(Level.SEVERE, null, ex);
			throw new RuntimeException("Невозможно получить список файлов для удаления");
		}
	}

	/**
	 * Извлекает сущность из строки
	 *
	 * @param <T> тип возвращаемой сущности
	 * @param input json строка
	 * @param type класс возвращаемой сущности
	 * @return сущность запроса
	 */
	public <T> T getEntity(String input, Class<T> type) {
		try {
			return om.readValue(input, type);
		} catch (IOException ex) {
			logger.log(Level.SEVERE, null, ex);
			throw new RuntimeException("Неправильный формат сущности");
		}
	}

	/**
	 * Удаляет папку с файлами удаляемого запроса
	 *
	 * @param dir папка для удаления
	 */
	public void removeDir(Path dir) {
		if (Files.isDirectory(dir)) {
			try {
				Files.walkFileTree(dir, new SimpleFileVisitor<Path>() {
					@Override
					public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
						Files.delete(file);
						return FileVisitResult.CONTINUE;
					}

					@Override
					public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
						Files.delete(dir);
						return FileVisitResult.CONTINUE;
					}
				});
			} catch (IOException ex) {
				logger.log(Level.SEVERE, null, ex);
			}
		}
	}

	/**
	 * Записывает файл на файловую систему
	 *
	 * @param fileName имя файла
	 * @param file данные формы
	 * @return в случае успешной записи - true, иначе - false
	 */
	private boolean saveFile(Path fileName, FileItem file) {
		try (InputStream is = new BufferedInputStream(file.getInputStream())) {
			Files.copy(is, fileName, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException ex) {
			logger.log(Level.SEVERE, null, ex);
			return false;
		}
		return true;
	}
}
