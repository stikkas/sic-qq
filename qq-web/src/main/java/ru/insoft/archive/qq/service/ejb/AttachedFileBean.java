package ru.insoft.archive.qq.service.ejb;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.Stateless;
import javax.inject.Inject;
import org.codehaus.jackson.map.ObjectMapper;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import ru.insoft.archive.qq.dao.AttachedFileDao;

/**
 * Создает и удаляет файлы
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Stateless
public class AttachedFileBean {

	@Inject
	private AttachedFileDao afd;

	/**
	 * Сохраняет файлы на файловой системе и заносин информацию в базу.
	 *
	 * @param parts данные формы, полученный от клиента
	 * @param dir папка для файлов, абсолютный путь
	 * @param type тип файлов
	 * @param id идентификатор владельца файлов
	 */
	public void createFiles(Map<String, List<InputPart>> parts, String dir,
			String type, Long id) {

		Set<String> savedFiles = new HashSet<>();

		try {
			Files.createDirectories(Paths.get(dir));
		} catch (IOException ex) {
			Logger.getLogger(AttachedFileBean.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Невозможно создать папку: " + dir);
		}

		for (List<InputPart> ps : parts.values()) {
			for (InputPart part : ps) {

				String header = part.getHeaders().get("Content-Disposition").get(0);
				System.out.println("Before coding: " + header);

				try {
					System.out.println("After coding: "  + new String(header.getBytes(Charset.forName("US-ASCII")), "UTF-8"));
					System.out.println("After coding: "  + new String(header.getBytes(Charset.forName("ISO-8859-1")), "UTF-8"));
					System.out.println("After coding: "  + new String(header.getBytes(Charset.forName("UTF-8")),"US-ASCII"));
				} catch (UnsupportedEncodingException ex) {
					Logger.getLogger(AttachedFileBean.class.getName()).log(Level.SEVERE, null, ex);
				}

				for (String chunk : header.split(";")) {
					if (chunk.trim().startsWith("filename")) {
						String fileName = chunk.split("=", 2)[1];
						// Удаляем кавычки
						fileName = fileName.substring(1, fileName.length() - 1);

						if (saveFile(Paths.get(dir, fileName), part)) {
							savedFiles.add(fileName);
						}
						break;
					}

				}
			}
		}

		if (!savedFiles.isEmpty()) {
			afd.create(savedFiles, type, id);
		}
	}

	/**
	 * Удаляет файлы из файловой системы и базы,
	 * deletedFiles представляет собой массив [[id, fileName],....]
	 *
	 * @param part данные формы полученные от пользователя
	 * @param dir папка где находятся файлы
	 * @param type тип файлов
	 * @param id идентификатор владельца (запроса) файлов
	 */
	public void removeFiles(InputPart part, String dir, String type, Long id) {
		try {
			String[][] files = new ObjectMapper().readValue(part.getBodyAsString(), String[][].class);
			if (files.length > 0) {
				Set<Long> ids = new HashSet<>(files.length);
				for (String[] file : files) {
					ids.add(Long.valueOf(file[0]));
					Files.deleteIfExists(Paths.get(dir, file[1]));
				}
				afd.remove(ids);
			}
		} catch (IOException ex) {
			Logger.getLogger(AttachedFileBean.class.getName()).log(Level.SEVERE, null, ex);
			throw new RuntimeException("Невозможно получить список файлов для удаления");
		}
	}

	/**
	 * Записывает файлы на файловую систему
	 *
	 * @param fileName имя файла
	 * @param part данные формы
	 * @return в случае успешной записи - true, иначе - false
	 */
	private boolean saveFile(Path fileName, InputPart part) {
		try (OutputStream out = new BufferedOutputStream(Files.newOutputStream(fileName));
				InputStream in = part.getBody(InputStream.class, null)) {
			byte[] buffer = new byte[4096];
			int readBytes;
			while ((readBytes = in.read(buffer)) > 0) {
				out.write(buffer, 0, readBytes);
			}
		} catch (IOException ex) {
			Logger.getLogger(AttachedFileBean.class.getName()).log(Level.SEVERE, null, ex);
			return false;
		}
		return true;
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
				Logger.getLogger(AttachedFileBean.class.getName()).log(Level.SEVERE, null, ex);
			}
		}
	}
}
