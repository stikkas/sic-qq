package ru.insoft.archive.qq.dao;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.annotation.PostConstruct;
import javax.ejb.Schedule;
import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import ru.insoft.archive.qq.dto.ArchiveJvkDto;
import ru.insoft.archive.qq.dto.Filter;
import ru.insoft.archive.qq.dto.PageDto;
import ru.insoft.archive.qq.dto.SearchDto;
import ru.insoft.archive.qq.dto.SicJvkDto;
import ru.insoft.archive.qq.dto.Sort;
import ru.insoft.archive.qq.ejb.DictCodes;

/**
 * Класс для поиска ЖВК
 *
 * @author Благодатских С.
 */
@Stateless
public class JvkDao extends AbstractDao {

	/**
	 * Крайняя нижняя дата для ЖВК
	 */
	private Date bottomRegDate;

	/**
	 * Одинаковая часть ограничения по дате регистрации
	 */
	private static final String edgeDateConstrain = " AND (j.regDate > :edgeDate OR j.regDate IS NULL))";
	/**
	 * Одинаковая часть зароса ЖВК для СИЦ
	 */
	// Внешние JOIN используется для полей, которые могуть быть пустыми
	private static final String generalSic = " FROM SicJvk j LEFT OUTER JOIN "
			+ "j.executor e LEFT OUTER JOIN j.notificationStatus n "
			+ "JOIN j.litera l LEFT OUTER JOIN j.execOrganization eo JOIN j.status s WHERE "
			+ "((j.literaId = :sic OR (j.literaId != :sic AND j.statusId != :onreg))"
			+ edgeDateConstrain;

	/**
	 * Одинаковая часть зароса ЖВК для Архивов
	 */
	private static final String generalArchive = " FROM ArchiveJvk j LEFT OUTER JOIN "
			+ "j.executor e LEFT OUTER JOIN j.questionType qt JOIN j.litera l JOIN j.status s WHERE "
			+ "((j.literaId = :orgId OR "
			+ "(j.literaId = :sic AND j.statusId != :onreg AND j.execOrgId = :orgId))"
			+ edgeDateConstrain;

	/**
	 * Одинаковая часть зароса для Поиска по архивам
	 */
	private static final String generalSearchArchive = " FROM Search j "
			+ "LEFT OUTER JOIN j.questionType qt JOIN j.litera l "
			+ "LEFT OUTER JOIN j.replyResult rt WHERE "
			+ "(j.literaId = :orgId OR "
			+ "(j.literaId = :sic AND j.statusId != :onreg AND j.execOrgId = :orgId))";
	/**
	 * Одинаковая часть зароса для Поиска по сиц
	 */
	private static final String generalSearchSic = " FROM Search j "
			+ "LEFT OUTER JOIN j.questionType qt JOIN j.litera l "
			+ "LEFT OUTER JOIN j.replyResult rt WHERE "
			+ "(j.literaId = :sic OR (j.literaId != :sic AND j.statusId != :onreg))";

	/**
	 * Возвращает одну страницу ЖВК для СИЦ
	 *
	 * @param start начальная запись
	 * @param limit максимальное число отдаваемых записей
	 * @param sort параметр сортировки
	 * @param filter критерии поиска (может быть null)
	 * @return массив записей для одной страницы
	 */
	public PageDto<SicJvkDto> getSicJvk(int start, int limit, Sort sort, Filter filter) {
		Long sicId = store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);
		Long onregId = store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONREG);

		String queryCount = "SELECT COUNT(j.id)" + generalSic;
		String queryValues = "SELECT NEW ru.insoft.archive.qq.dto.SicJvkDto(n.fullValue as notiStat,"
				+ "eo.shortValue as execOrg,j.controlDate,j.planDate,s.fullValue as status,"
				+ "e.displayedName as executor,j.id as id,"
				+ "l.shortValue as litera, CONCAT(CONCAT(j.numPrefix, '/'), j.numSufix), "
				+ "j.regDate,  COALESCE(j.organization, "
				+ "CONCAT(CONCAT(CONCAT(CONCAT(NULLIF(j.famaly,''), ' '),NULLIF(j.name,'')), ' '),"
				+ "NULLIF(j.otchestvo, ''))) as otKogo)" + generalSic;

		if (filter != null) {
			String condition = filter.getCondition();
			queryCount += condition;
			queryValues += condition;
		}

		TypedQuery<Long> countQ = em.createQuery(queryCount, Long.class)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setParameter("edgeDate", bottomRegDate);

		Query valuesQ = em.createQuery(queryValues + sort)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setParameter("edgeDate", bottomRegDate)
				.setFirstResult(start).setMaxResults(limit);

		applyFilter(countQ, valuesQ, filter);
		return new PageDto<>(countQ.getSingleResult(), valuesQ.getResultList());
	}

	/**
	 * Возвращает одну страницу ЖВК для Архива
	 *
	 * @param start начальная запись
	 * @param limit максимальное число отдаваемых записей
	 * @param sort параметры сортировки
	 * @param archiveId идентификатор организации пользователя
	 * @param filter критерии поиска (может быть null)
	 * @return массив записей для одной страницы
	 */
	public PageDto<ArchiveJvkDto> getArchiveJvk(int start, int limit, Sort sort,
			Long archiveId, Filter filter) {
		Long sicId = store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);
		Long onregId = store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONREG);

		String queryCount = "SELECT COUNT(j.id)" + generalArchive;
		String queryValues = "SELECT NEW ru.insoft.archive.qq.dto.ArchiveJvkDto(qt.shortValue as questionType,"
				+ "j.execDate,j.controlDate,j.planDate,s.fullValue as status,e.displayedName as executor,"
				+ "j.id as id,l.shortValue as litera, CONCAT(CONCAT(j.numPrefix, '/'), j.numSufix), "
				+ "j.regDate,COALESCE(j.organization, "
				+ "CONCAT(CONCAT(CONCAT(CONCAT(NULLIF(j.famaly,''), ' '), NULLIF(j.name,'')), ' '), "
				+ "NULLIF(j.otchestvo, ''))) as otKogo)" + generalArchive;

		if (filter != null) {
			String condition = filter.getCondition();
			queryCount += condition;
			queryValues += condition;
		}
		TypedQuery<Long> countQ = em.createQuery(queryCount, Long.class)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setParameter("edgeDate", bottomRegDate)
				.setParameter("orgId", archiveId);

		Query valuesQ = em.createQuery(queryValues + sort)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setParameter("edgeDate", bottomRegDate)
				.setParameter("orgId", archiveId)
				.setFirstResult(start).setMaxResults(limit);

		applyFilter(countQ, valuesQ, filter);
		return new PageDto<>(countQ.getSingleResult(), valuesQ.getResultList());
	}

	/**
	 * Поиск записей по критерием. Он ничем не отличается от ЖВК, только
	 * результатом выборки, поэтому этот метод здесь. Переименовывать классы и
	 * методы не считаю необходимым.
	 *
	 * @param start начальная запись
	 * @param limit максимальное число отдаваемых записей
	 * @param sort параметры сортировки
	 * @param filter критерии поиска (может быть null)
	 * @param orgId идентификатор огранизации, запрашивающей поиск
	 * @return массив записей для одной страницы
	 */
	public PageDto<SearchDto> search(int start, int limit, Sort sort, Filter filter,
			Long orgId) {
		Long sicId = store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);
		Long onregId = store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONREG);

		String queryCount = "SELECT COUNT(j.id)";
		String queryValues = "SELECT NEW ru.insoft.archive.qq.dto.SearchDto("
				+ "j.content, qt.shortValue as questionType, rt.fullValue as replyResult,"
				+ "j.id as id,l.shortValue as litera, CONCAT(CONCAT(j.numPrefix, '/'), j.numSufix),"
				+ "j.regDate,COALESCE(j.organization, CONCAT(CONCAT(CONCAT(CONCAT(NULLIF(j.lName,''), ' '), "
				+ "NULLIF(j.fName,'')), ' '), NULLIF(j.mName, ''))) as otKogo)";

		boolean isSic = orgId.equals(sicId);
		if (isSic) {
			queryCount += generalSearchSic;
			queryValues += generalSearchSic;
		} else {
			queryCount += generalSearchArchive;
			queryValues += generalSearchArchive;
		}
		if (filter != null) {
			String condition = filter.getCondition();
			queryCount += condition;
			queryValues += condition;
		}
		TypedQuery<Long> countQ;
		Query valuesQ;

		if (isSic) {
			countQ = em.createQuery(queryCount, Long.class)
					.setParameter("sic", sicId)
					.setParameter("onreg", onregId);

			valuesQ = em.createQuery(queryValues + (sort == null ? "" : sort))
					.setParameter("sic", sicId)
					.setParameter("onreg", onregId)
					.setFirstResult(start).setMaxResults(limit);
		} else {
			countQ = em.createQuery(queryCount, Long.class)
					.setParameter("sic", sicId)
					.setParameter("onreg", onregId)
					.setParameter("orgId", orgId);

			valuesQ = em.createQuery(queryValues + (sort == null ? "" : sort))
					.setParameter("sic", sicId)
					.setParameter("onreg", onregId)
					.setParameter("orgId", orgId)
					.setFirstResult(start).setMaxResults(limit);
		}
		applyFilter(countQ, valuesQ, filter);
		return new PageDto<>(countQ.getSingleResult(), valuesQ.getResultList());
	}

	/**
	 * Применяет дополнительные параметры поиска, если они есть
	 */
	private void applyFilter(Query count, Query values, Filter filter) {
		if (filter != null) {
			for (Filter f : filter.getFilters()) {
				String prop = f.getProperty();
				Object val = f.getValue();
				count.setParameter(prop, val);
				values.setParameter(prop, val);
			}
		}
	}

	/**
	 * Устанавливает крайнюю нижнюю дату для ЖВК
	 */
	@Schedule(dayOfMonth = "1")
	@PostConstruct
	private void setEdgeDate() {
		Calendar now = new GregorianCalendar();
		if (now.get(Calendar.DAY_OF_MONTH) != 1) {
			// Ситуация при создании бина
			now.set(Calendar.DAY_OF_MONTH, 1);
		}
		now.add(Calendar.MONTH, -11);
		now.add(Calendar.DAY_OF_MONTH, -1); // Опускаемся еще на один день, т.к. ищем по > а не по >=
		bottomRegDate = now.getTime();
	}
}
