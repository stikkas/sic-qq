package ru.insoft.archive.qq.ejb;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.HashMap;
import java.util.Map;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.apache.commons.fileupload.FileItem;
import ru.insoft.archive.extcommons.ejb.CommonDBHandler;
import ru.insoft.archive.extcommons.ejb.FileUploadBean;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.utils.StringUtils;
import ru.insoft.archive.qq.entity.AttachedFile;

/**
 * Бин для создания файлов на сервере.
 *
 * @author basa
 */
@Stateless
@TransactionManagement(TransactionManagementType.CONTAINER)
public class AttachedFileHandler extends FileUploadBean {

	@PersistenceContext(unitName = "SicEntityManager")
	EntityManager em;
	private Map<String, Long> fileTypeMap;

	@Inject
	CommonDBHandler dbHandler;

	@EJB
	JsonTools jsonTools;

	public Long getFileTypeId(String code) {
		if (fileTypeMap == null) {
			fileTypeMap = new HashMap<>();
		}
		Long fileTypeId = fileTypeMap.get(code);
		if (fileTypeId == null) {
			fileTypeId = dbHandler.getDescValueByCodes("Q_DICT_FILE_TYPE", code).getId();
			fileTypeMap.put(code, fileTypeId);
		}
		return fileTypeId;
	}

	@Override
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	protected void processUploadedFile(FileItem item, Map<String, String> params)
		throws Exception {
		Long question = Long.parseLong(params.get("question"));
//		String name = StringUtils.convertFileName(item.getName());
		String name = item.getName();
		Long type = getFileTypeId(params.get("type"));

		em.persist(createEntity(name, type, question));
		String path = params.get("path") + question;
		try {
			File dir = new File(path);
			if (!dir.isDirectory()) {
				dir.mkdirs();
			}

			Path p = FileSystems.getDefault().getPath(path, name);
			Files.write(p, item.get(), StandardOpenOption.CREATE);
		} catch (IOException e) {
			throw new RuntimeException("Ошибка при сохранении файла '"
				+ name + "' в " + path);
		}

	}

	/**
	 * Проверяет есть ли в базе файл с таким же именем, такого же типа, и
	 * принадлежащий этому же запросу.
	 *
	 * @param entity файл для сохранения или обновления
	 * @return сущность для вставки в таблицу
	 */
	private AttachedFile createEntity(String name, Long type, Long question) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<AttachedFile> cq = cb.createQuery(AttachedFile.class);

		Root<AttachedFile> root = cq.from(AttachedFile.class);
		cq.where(cb.and(cb.and(
			cb.equal(root.get("name"), name),
			cb.equal(root.get("type"), type)),
			cb.equal(root.get("question"), question)));
		try {
			em.createQuery(cq).getSingleResult();
			throw new RuntimeException("Файл с именем '" + name + "' уже существует");
		} catch (NoResultException e) {
			return new AttachedFile(name, type, question);
		}
	}

	@Override
	protected void beforeFilesUpload(Map<String, String> params) throws Exception {
		String path = params.get("path") + params.get("question");

		for (Long id : jsonTools.parseLongList(params.get("deletedFiles"))) {
			AttachedFile entity = em.find(AttachedFile.class, id);
			if (entity != null) {
				new File(path + "/" + entity.getName()).delete();
				em.remove(entity);
			}
		}
	}

}
