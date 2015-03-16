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
public class NotificationDao extends AbstractCRUDDao<Notification> {

	public NotificationDao() {
		super(Notification.class);
	}

	@Override
	public Notification find(Long id) {
		Notification entity = super.find(id);
		if (entity != null) {
			return setFiles(entity);
		}
		return entity;
	}

	@Override
	public Notification update(Notification entity) {
		return setFiles(super.update(entity));
	}

	/**
	 * Обнуляет запись и удаляет записи о файлах, которыми владеет сущность.
	 * т.к. у нас несколько сущностей занимают одну таблицу то удаление скажется
	 * и на других сущностях.
	 *
	 * @param id идентификатор запроса
	 */
	@Override
	public void remove(Long id) {
		em.createNamedQuery("AttachedFile.removeFilesByOwner")
				.setParameter("owner", id)
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_INFO))
				.executeUpdate();
		em.merge(new Notification(id));
	}

	/**
	 * Никогда не должен использоваться. Служит для подстраховки, если кто-то
	 * вызовет его
	 *
	 * @param entity Сущность
	 * @return сущность
	 */
	@Override
	public Notification create(Notification entity) {
		return update(entity);
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
