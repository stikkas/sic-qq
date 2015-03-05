package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.dto.PageDto;
import ru.insoft.archive.qq.dto.SicJvkDto;
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
	private static final String generalSic = " from SicJvk j LEFT OUTER JOIN "
			+ "j.executor e LEFT OUTER JOIN j.notificationStatus n WHERE "
			+ "j.literaId = :sic OR (j.literaId != :sic AND j.statusId != :onreg) ";
	private static final String defaultOrder = " ORDER BY j.regDate DESC";
	/**
	 * Возвращает одну страницу ЖВК для СИЦ
	 *
	 * @param start начальная запись
	 * @param limit максимальное число отдаваемых записей
	 * @return массив записей для одной страницы
	 */
	public PageDto<SicJvkDto> getSicJvk(int start, int limit) {
		Long sicId = store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC);
		Long onregId = store.getIdByCode(DictCodes.Q_VALUE_QSTAT_ONREG);

		Long count = em.createQuery("SELECT COUNT(j.id)" + generalSic, Long.class)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId).getSingleResult();

		List<SicJvkDto> values = em.createQuery("SELECT NEW ru.insoft.archive.qqejb.dto.SicJvkDto(j.id, "
				+ "j.litera.shortValue, CONCAT(CONCAT(j.numPrefix, '/'), j.numSufix), "
				+ "j.regDate, j.controlDate, j.planDate, COALESCE(j.organization, "
				+ "CONCAT(CONCAT(CONCAT(CONCAT(NULLIF(j.famaly,''), ' '), NULLIF(j.name,'')), ' '), "
				+ "NULLIF(j.otchestvo, ''))), j.status.fullValue, e.displayedName, n.fullValue, "
				+ "j.execOrganization.shortValue)" + generalSic + defaultOrder)
				.setParameter("sic", sicId)
				.setParameter("onreg", onregId)
				.setFirstResult(start).setMaxResults(limit).getResultList();
		return new PageDto<>(count, values);
	}
}
