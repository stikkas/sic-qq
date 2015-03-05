package ru.insoft.archive.qq.dao;

import java.util.List;
import javax.ejb.Stateless;
import ru.insoft.archive.qq.dto.DictDto;
import ru.insoft.archive.qq.dto.DictSVDto;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.CoreParameter;

/**
 * Получение значений справочников
 *
 * @author stikkas<stikkas@yandex.ru>
 */
@Stateless
public class DictDao extends AbstractDao {

	/**
	 * Возвращает значения id, полных и сокращенных значений
	 *
	 * @param groupCode код группы справочника
	 * @return справочник с тремя полями
	 */
	public List<DictSVDto> getFullShortValues(String groupCode) {
		return em.createNamedQuery("DescriptorValue.fullShortValues")
				.setParameter("groupId", store.getIdByCode(groupCode)).getResultList();
	}

	/**
	 * Возвращает значения id, полных и сокращенных значений организаций для
	 * определенного архива
	 *
	 * @param archiveId идентификатор архива
	 * @return справочник с тремя полями
	 */
	public List<DictSVDto> getLiterasArchive(Long archiveId) {
		return em.createNamedQuery("DescriptorValue.literasArchive")
				.setParameter("sic", store.getIdByCode(DictCodes.Q_VALUE_MEMBER_SIC))
				.setParameter("archive", archiveId).getResultList();
	}

	/**
	 * Возвращает значения id и полных значений
	 *
	 * @param groupCode код группы справочника
	 * @return справочник с двумя полями
	 */
	public List<DictDto> getFullValues(String groupCode) {
		return em.createNamedQuery("DescriptorValue.fullValue")
				.setParameter("groupId", store.getIdByCode(groupCode)).getResultList();
	}

	/**
	 * Возвращает значения id и ФИО пользователя с определенными правами
	 *
	 * @param ruleCode код права доступа
	 * @return справочник с двумя полями
	 */
	public List<DictDto> getUsersWithRule(String ruleCode) {
		return em.createNamedQuery("AdmAccessRule.usersWithRule")
				.setParameter("code", ruleCode).getResultList();
	}

	/**
	 * Возвращает параметры настройки системы
	 *
	 * @param codes коды интересующих параметров
	 * @return список параметров
	 */
	public List<CoreParameter> getCoreParams(List<String> codes) {
		return em.createNamedQuery("CoreParameter.paramsByCodes")
				.setParameter("codes", codes).getResultList();
	}

	/**
	 * Возвращает справочник полных имен и кодов
	 *
	 * @param groupCode код группы справочника
	 * @return справочник с тремя полями
	 */
	public List<DictSVDto> getFullCodeValues(String groupCode) {
		return em.createNamedQuery("DescriptorValue.fullCodeValue")
				.setParameter("groupId", store.getIdByCode(groupCode)).getResultList();
	}

}
