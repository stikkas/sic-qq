package ru.insoft.archive.qq.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.ejb.Stateless;
import javax.inject.Inject;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Execution;
import ru.insoft.archive.qq.qualifier.Coordination;
import ru.insoft.archive.qq.qualifier.DeliveryAction;
import ru.insoft.archive.qq.qualifier.SendAction;
import ru.insoft.archive.qq.qualifier.UsedMaterial;

/**
 * Для доступа к Исполнения запроса
 *
 * @author Благодатских С.
 */
@Stateless
public class ExecutionDao extends AbstractDao {

	@Inject
	@SendAction
	private TableDao<ru.insoft.archive.qq.entity.SendAction> sa;

	@Inject
	@UsedMaterial
	private TableDao<ru.insoft.archive.qq.entity.UsedMaterial> um;

	@Inject
	@Coordination
	private TableDao<ru.insoft.archive.qq.entity.Coordination> cd;

	@Inject
	@DeliveryAction
	private TableDao<ru.insoft.archive.qq.entity.DeliveryAction> da;

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
	 * вкладкой "Исполнение зароса". Возвращаем плановую дату на место, если
	 * изменяли в случае продления. не забываем установить исполнителя.
	 *
	 * @param id идентификатор запроса
	 */
	public void remove(Long id) {
		em.createNamedQuery("AttachedFile.removeFilesByOwner")
				.setParameter("owner", id)
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_ANSWER))
				.executeUpdate();
		Execution entity = em.find(Execution.class, id);

		Date prolong = entity.getProlongDate();
		Calendar date = new GregorianCalendar();
		date.setTime(entity.getPlanDate());

		entity = new Execution(id, store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONEXEC), entity.getExecutor());

		if (prolong != null) {
			date.add(Calendar.DATE, -30);
		}
		entity.setPlanDate(date.getTime());

		em.merge(entity);
		sa.remove(id);
		um.remove(id);
		cd.remove(id);
		da.remove(id);
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
