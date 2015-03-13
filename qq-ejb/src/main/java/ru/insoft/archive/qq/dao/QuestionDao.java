package ru.insoft.archive.qq.dao;

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
			entity.setFiles(em.createNamedQuery("AttachedFile.questionFilesWithType")
					.setParameter("question", id)
					.setParameter("type", store.getIdByCode(DictCodes.Q_VALUE_FILE_TYPE_APP_DOCS))
					.getResultList());
		}
		return entity;
	}

	
}
