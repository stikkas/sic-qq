package ru.insoft.archive.qq.dao;

import javax.ejb.Stateless;
import ru.insoft.archive.qq.ejb.DictCodes;
import ru.insoft.archive.qq.entity.Assistant;
import ru.insoft.archive.qq.entity.Transmission;

/**
 * Для доступа к данным по передачи на исполнение
 *
 * @author Благодатских С.
 */
@Stateless
public class TransmissionDao extends AbstractDao {

	public Transmission find(Long id) {
		Transmission entity = em.find(Transmission.class, id);
		if (entity != null) {
			return setAssistants(entity);
		}
		return entity;
	}

	public Transmission update(Transmission entity) {
		Long id = entity.getId();
		removeAssistants(id);
		for (Assistant assistant : entity.getAssistants()) {
			assistant.setId(id);
			em.persist(assistant);
		}
		return setAssistants(em.merge(entity));
	}

	/**
	 * Обнуляет запись и удаляет записи о соисполнителях, которыми владеет
	 * сущность. т.к. у нас несколько сущностей занимают одну таблицу то
	 * удаление скажется и на других сущностях. Не изменяем статус запроса.
	 * Удалить сущность можно только при неизмененном статусе запроса, т.е.
	 * статус запроса при удалении всегда должен быть "Зарегистрирован". Есть
	 * вероятность того что клиент выставит какой-то другой статус. Поэтому
	 * принудительно выставляем статус.
	 *
	 * @param id идентификатор сущности для удаления
	 */
	public void remove(Long id) {
		removeAssistants(id);
		em.merge(new Transmission(id, store.getIdByCode(DictCodes.Q_VALUE_QSTAT_REG)));
	}

	private void removeAssistants(Long id) {
		em.createNamedQuery("Assistant.removeTransmission")
				.setParameter("id", id)
				.executeUpdate();
	}

	/**
	 * Устанавливает список соисполнителей, принадлежащих запросу
	 *
	 * @param entity сущность запроса
	 */
	private Transmission setAssistants(Transmission entity) {
		entity.setAssistants(em.createNamedQuery("Assistant.assistTransmission")
				.setParameter("id", entity.getId())
				.getResultList());
		return entity;
	}
}
