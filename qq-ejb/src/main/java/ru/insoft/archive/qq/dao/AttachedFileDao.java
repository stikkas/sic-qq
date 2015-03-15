package ru.insoft.archive.qq.dao;

import java.util.Set;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.entity.AttachedFile;

/**
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Stateless
public class AttachedFileDao extends AbstractCRUDDao<AttachedFile> {

	public AttachedFileDao() {
		super(AttachedFile.class);
	}

	/**
	 * Создает записи по прикрепленным файлам в базе
	 *
	 * @param fileNames список имен файлов
	 * @param fileType тип файла
	 * @param ownerId идентификатор запроса
	 */
	public void create(Set<String> fileNames, String fileType, Long ownerId) {
		for (String fileName : fileNames) {
			create(new AttachedFile(fileName, store.getIdByCode(fileType), ownerId));
		}
	}

	/**
	 * Удаляет записи по прикрепленным файлам в базе
	 *
	 * @param ids список идентификаторов файлов для удаления
	 */
	public void remove(Set<Long> ids) {
		em.createQuery("DELETE FROM AttachedFile a WHERE a.id in :ids")
				.setParameter("ids", ids).executeUpdate();
	}
}
