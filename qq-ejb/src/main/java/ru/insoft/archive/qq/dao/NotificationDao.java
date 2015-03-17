package ru.insoft.archive.qq.dao;

import javax.ejb.Stateless;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Notification;

/**
 * Для доступа к данным уведомления заявителю
 *
 * @author Благодатских С.
 */
@Stateless
public class NotificationDao extends AbstractDao {

	public Notification find(Long id) {
		Notification entity = em.find(Notification.class, id);
		if (entity != null) {
			return setFiles(entity);
		}
		return entity;
	}

	public Notification update(Notification entity) {
		return setFiles(em.merge(entity));
	}

	/**
	 * Обнуляет запись и удаляет записи о файлах, которыми владеет сущность.
	 * т.к. у нас несколько сущностей занимают одну таблицу то удаление скажется
	 * и на других сущностях.
	 *
	 * @param id идентификатор запроса
	 */
	public void remove(Long id) {
		em.createNamedQuery("AttachedFile.removeFilesByOwner")
				.setParameter("owner", id)
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_INFO))
				.executeUpdate();
		em.merge(new Notification(id));
	}


	/**
	 * Устанавливает список файлов, принадлежащих запросу
	 *
	 * @param entity сущность запроса
	 */
	private Notification setFiles(Notification entity) {
		entity.setFiles(em.createNamedQuery("AttachedFile.questionFilesWithType")
				.setParameter("question", entity.getId())
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_INFO))
				.getResultList());
		return entity;
	}

}
