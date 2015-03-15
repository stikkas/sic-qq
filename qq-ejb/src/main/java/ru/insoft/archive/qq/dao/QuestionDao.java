package ru.insoft.archive.qq.dao;

import java.util.Calendar;
import java.util.GregorianCalendar;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Question;

/**
 * бин для работы с Question сущностью
 *
 * @author Благодатских С.
 */
@Stateless
public class QuestionDao extends AbstractCRUDDao<Question> {

	public QuestionDao() {
		super(Question.class);
	}

	@Override
	public Question find(Long id) {
		Question entity = super.find(id);
		if (entity != null) {
			return setFiles(entity);
		}
		return entity;
	}

	@Override
	public Question update(Question entity) {
		return setFiles(super.update(entity));
	}

	@Override
	public Question create(Question entity) {
		// Устанавливаем обязательные параметры
		Integer year = new GregorianCalendar().get(Calendar.YEAR);
		entity.setSufix(year);
		Long maxNumber = em.createNamedQuery("Question.maxNumber", Long.class)
				.setParameter("litera", entity.getLitera())
				.setParameter("sufix", year)
				.getSingleResult();
		if (maxNumber == null) {
			maxNumber = 1l;
		} else {
			maxNumber += 1;
		}
		entity.setPrefix(maxNumber);
		// Устанавливаем статус по умолчанию
		if (entity.getStatus() == null) {
			entity.setStatus(store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONREG));
		}
		return super.create(entity);
	}

	/**
	 * Устанавливает список файлов, принадлежащих запросу
	 *
	 * @param entity сущность запроса
	 */
	private Question setFiles(Question entity) {
		entity.setFiles(em.createNamedQuery("AttachedFile.questionFilesWithType")
				.setParameter("question", entity.getId())
				.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS))
				.getResultList());
		return entity;
	}
}
