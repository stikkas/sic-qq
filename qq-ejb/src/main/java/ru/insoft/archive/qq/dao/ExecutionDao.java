package ru.insoft.archive.qq.dao;

import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Execution;

/**
 * Для доступа к Исполнения запроса
 *
 * @author Благодатских С.
 */
@Stateless
public class ExecutionDao extends AbstractDao {

	@Inject
	private SendActionDao sa;
	@Inject
	private UsedMaterialDao um;

	public Execution find(Long id) {
		Execution entity = em.find(Execution.class, id);
		if (entity != null) {
			return setFiles(entity);
		}
		return entity;
	}

	public Execution update(Execution entity) {
		return setFiles(em.merge(entity));
	}

	/**
	 * Обнуляет запись и удаляет записи о файлах, которыми владеет сущность.
	 * т.к. у нас несколько сущностей занимают одну таблицу то удаление скажется
	 * и на других сущностях. Удаляем все дополнительные сущности, связанные с
	 * вкладкой "Исполнение зароса"
	 *
	 * @param id идентификатор запроса
	 */
	public void remove(Long id) {
		em.createNamedQuery("AttachedFile.removeFilesByOwner")
				.setParameter("owner", id)
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_ANSWER))
				.executeUpdate();
		em.merge(new Execution(id, store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONEXEC)));
		sa.remove(id);
		um.remove(id);
	}

	/**
	 * Устанавливает список файлов, принадлежащих запросу
	 *
	 * @param entity сущность запроса
	 */
	private Execution setFiles(Execution entity) {
		entity.setFiles(em.createNamedQuery("AttachedFile.questionFilesWithType")
				.setParameter("question", entity.getId())
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_ANSWER))
				.getResultList());
		return entity;
	}
}
