package ru.insoft.archive.qq.dao;

import javax.ejb.Stateless;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import ru.insoft.archive.qq.dto.ArchiveJvkDto;
import ru.insoft.archive.qq.dto.Filter;
import ru.insoft.archive.qq.dto.PageDto;
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
	 * Одинаковая часть зароса для СИЦ
	 */
	// Внешние JOIN используется для полей, которые могуть быть пустыми
	private static final String generalSic = " FROM SicJvk j LEFT OUTER JOIN "
			+ "j.executor e LEFT OUTER JOIN j.notificationStatus n "
			+ "JOIN j.litera l LEFT OUTER JOIN j.execOrganization eo JOIN j.status s WHERE "
			+ "(j.literaId = :sic OR (j.literaId != :sic AND j.statusId != :onreg))";

	/**
	 * Одинаковая часть зароса для Архивов
	 */
	private static final String generalArchive = " FROM ArchiveJvk j LEFT OUTER JOIN "
			+ "j.executor e LEFT OUTER JOIN j.questionType qt JOIN j.litera l JOIN j.status s WHERE "
			+ "(j.literaId = :orgId OR "
			+ "(j.literaId = :sic AND j.statusId != :onreg AND j.execOrgId = :orgId))";

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
		String queryValues = "SELECT NEW ru.insoft.archive.qq.dto.SicJvkDto(j.id as id, "
				+ "l.shortValue as litera, CONCAT(CONCAT(j.numPrefix, '/'), j.numSufix), "
				+ "j.regDate, j.controlDate, j.planDate, COALESCE(j.organization, "
				+ "CONCAT(CONCAT(CONCAT(CONCAT(NULLIF(j.famaly,''), ' '),NULLIF(j.name,'')), ' '),"
				+ "NULLIF(j.otchestvo, ''))) as otKogo, s.fullValue as status, e.displayedName as executor, "
				+ "n.fullValue as notiStat, "
				+ "eo.shortValue as execOrg)" + generalSic;

		if (filter != null) {
			String condition = filter.getCondition();
			queryCount += condition;
			queryValues += condition;
		}

		TypedQuery<Long> countQ = em.createQuery(queryCount, Long.class)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId);

		Query valuesQ = em.createQuery(queryValues + sort)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
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
		String queryValues = "SELECT NEW ru.insoft.archive.qq.dto.ArchiveJvkDto(j.id as id, "
				+ "l.shortValue as litera, CONCAT(CONCAT(j.numPrefix, '/'), j.numSufix), "
				+ "j.regDate, j.controlDate, j.planDate, COALESCE(j.organization, "
				+ "CONCAT(CONCAT(CONCAT(CONCAT(NULLIF(j.famaly,''), ' '), NULLIF(j.name,'')), ' '), "
				+ "NULLIF(j.otchestvo, ''))) as otKogo, s.fullValue as status, e.displayedName as executor,"
				+ "qt.shortValue as questionType, j.execDate)" + generalArchive;

		if (filter != null) {
			String condition = filter.getCondition();
			queryCount += condition;
			queryValues += condition;
		}
		TypedQuery<Long> countQ = em.createQuery(queryCount, Long.class)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setParameter("orgId", archiveId);

		Query valuesQ = em.createQuery(queryValues + sort)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setParameter("orgId", archiveId)
				.setFirstResult(start).setMaxResults(limit);

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
}
